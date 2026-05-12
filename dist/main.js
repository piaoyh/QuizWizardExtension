// Copyright 2026. PARK Youngho. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
// https://www.apache.org/licenses/LICENSE-2.0> or the MIT license
// <LICENSE-MIT or https://opensource.org/licenses/MIT>, at your option.
// This file may not be copied, modified, or distributed
// except according to those terms.
///////////////////////////////////////////////////////////////////////////////
import { translations } from './i18n.js';
import init, { ControlTower, NameId, ChoiceMark } from './pkg/qrate_wasm.js';
class QuizWizardApp {
    random_seeds = new BigUint64Array(16);
    envLang = navigator.language;
    control_tower;
    container;
    currentTheme = 'theme-web';
    currentLang = 'ko';
    currentMenu = ''; // [추가] 선택된 문제은행 파일의 경로를 저장할 필드
    question_bank_file_name = '';
    question_bank_file_handle = null; // [추가] 문제은행 파일 핸들 저장
    student_list_file_name = '';
    student_list_handle = null; // [추가] 학생 명단 파일 핸들 저장
    // 편집 중인 문제 데이터를 저장하는 배열
    questionsData = [];
    // 편집 중인 학생 명단 데이터를 저장하는 배열
    studentsData = [];
    // 자기주도학습에서 현재 표시 중인 문제 인덱스 (0-based)
    currentQuestionIndex = 0;
    // 자기주도학습에서 사용자가 선택한 답안 (0-based question index -> 0-based choice index)
    userAnswers = [];
    // 현재 포커스된 문제의 인덱스 (0-based, 문제은행/학생명단 편집용)
    focusedQuestionIndex = null;
    // 현재 포커스된 선택지의 인덱스 (0-based)
    focusedChoiceIndex = null;
    // 시험 출제 범위 설정
    scopeSettings = { start: 1, end: 0, count: 0 };
    // 문제은행 편집 모드 ('question' 또는 'choice')
    editorMode = 'question';
    isDirtyQB = false;
    isDirtySL = false;
    // [추가] 직전 작업공간을 기억하여 설정 후 복원하는 용도
    lastWorkspace = 'question-bank';
    // [추가] 시험지 저장 관련 필드
    handle = null;
    doctype = '';
    // 대화상자에서 '예'/'아니오'를 눌렀을 때 실행할 보류 중인 작업
    qbPendingAction = null;
    slPendingAction = null;
    constructor() {
        this.container = document.getElementById('view-container');
        this.initApp();
    }
    /**
     * 앱 초기 설정 로드 및 UI 초기화
     */
    async initApp() {
        // 2. Wasm 초기화를 최우선으로 수행합니다.
        try {
            await init(); // pkg/qrate_wasm.js에서 가져온 init 함수
            this.control_tower = new ControlTower(); // 이제 안전하게 생성 가능합니다.
            console.log("Wasm ControlTower ready.");
        }
        catch (e) {
            console.error("Wasm 로드 실패:", e);
        }
        // 3. 기존 로직들
        const data = await chrome.storage.local.get(['theme', 'lang']);
        this.currentTheme = data.theme || 'theme-web';
        this.currentLang = data.lang || 'ko';
        document.body.className = this.currentTheme;
        this.updateUILanguage();
        this.bindEvents();
        this.initLanguageDialog(); // 대화상자 이벤트 초기화
        this.initThemeDialog(); // 테마 대화상자 이벤트 초기화
        this.initSubmitDialog(); // 제출 확인 대화상자 이벤트 초기화
        this.initScopeDialog(); // 범위 설정 대화상자 이벤트 초기화
        this.initNewQBDialog(); // 새 문제은행 확인 대화상자 이벤트 초기화
        this.initNewSLDialog(); // 새 학생명단 확인 대화상자 이벤트 초기화
        this.initCopyrightDialog(); // 저작권 대화상자 이벤트 초기화
        this.initLicenseDialog(); // 라이센스 대화상자 이벤트 초기화
        // 앱 시작 시 문제은행 편집 작업영역으로 시작 (기본 10개 카드 생성)
        this.initializeQuestionBankWorkspace(true);
        this.updateMenuActivation();
    }
    /** 메뉴 활성화 상태 업데이트 */
    updateMenuActivation() {
        const scopeMenu = document.querySelector('[data-action="ex-set-scope"]');
        if (scopeMenu) {
            if (this.question_bank_file_handle) {
                scopeMenu.classList.remove('disabled');
            }
            else {
                scopeMenu.classList.add('disabled');
            }
        }
    }
    /** 주메뉴의 활성 상태(하이라이트)를 업데이트합니다. */
    updateActiveMenu(menu) {
        const menuToButtonMap = {
            'header-edit': 'question-bank'
        };
        const buttonMenu = menuToButtonMap[menu] || menu;
        document.querySelectorAll('.menu-item').forEach(btn => {
            if (btn.dataset.menu === buttonMenu) {
                btn.classList.add('active');
            }
            else {
                btn.classList.remove('active');
            }
        });
    }
    /**
     * 답안지 제출 확인 대화상자 초기화
     */
    initSubmitDialog() {
        const dialog = document.getElementById('submit-confirm-dialog');
        const confirmBtn = document.getElementById('submit-confirm-btn');
        const cancelBtn = document.getElementById('submit-cancel-btn');
        if (!dialog || !confirmBtn || !cancelBtn)
            return;
        confirmBtn.addEventListener('click', () => {
            console.log("주인님, 답안지 제출이 승인되었습니다.");
            this.saveStudyState(); // 현재 문제까지 저장
            // 실제 제출 처리 (예: 채점 로직 등)
            this.handleFinalSubmission();
            dialog.close();
        });
        cancelBtn.addEventListener('click', () => {
            console.log("주인님, 제출이 취소되었습니다.");
            dialog.close();
        });
    }
    handleFinalSubmission() {
        // 여기에 제출 후 처리 로직을 작성합니다.
        const msg = translations[this.currentLang].actions['msg-submit-success'];
        alert(msg);
    }
    /**
     * 테마 설정 대화상자의 버튼 이벤트를 초기화합니다.
     */
    initThemeDialog() {
        const dialog = document.getElementById('theme-dialog');
        const confirmBtn = document.getElementById('theme-confirm-btn');
        const cancelBtn = document.getElementById('theme-cancel-btn');
        if (!dialog || !confirmBtn || !cancelBtn)
            return;
        confirmBtn.addEventListener('click', () => {
            const selected = dialog.querySelector('input[name="theme"]:checked')?.value;
            if (selected && selected !== this.currentTheme) {
                this.currentTheme = selected;
                document.body.className = selected;
                chrome.storage.local.set({ theme: selected });
            }
            dialog.close();
            this.renderView(this.lastWorkspace);
        });
        cancelBtn.addEventListener('click', () => {
            dialog.close();
            this.renderView(this.lastWorkspace);
        });
    }
    /**
     * 언어 설정 대화상자의 버튼 이벤트를 초기화합니다.
     */
    initLanguageDialog() {
        const dialog = document.getElementById('lang-dialog');
        const confirmBtn = document.getElementById('lang-confirm-btn');
        const cancelBtn = document.getElementById('lang-cancel-btn');
        if (!dialog || !confirmBtn || !cancelBtn)
            return;
        confirmBtn.addEventListener('click', () => {
            const selected = dialog.querySelector('input[name="lang"]:checked')?.value;
            if (selected && selected !== this.currentLang) {
                this.currentLang = selected;
                chrome.storage.local.set({ lang: this.currentLang });
                this.updateUILanguage();
            }
            dialog.close();
            this.renderView(this.lastWorkspace);
        });
        cancelBtn.addEventListener('click', () => {
            dialog.close();
            this.renderView(this.lastWorkspace);
        });
    }
    initScopeDialog() {
        const dialog = document.getElementById('scope-dialog');
        const confirmBtn = document.getElementById('scope-confirm-btn');
        const cancelBtn = document.getElementById('scope-cancel-btn');
        const startInput = document.getElementById('scope-start');
        const endInput = document.getElementById('scope-end');
        const countInput = document.getElementById('scope-count');
        if (!dialog || !confirmBtn || !cancelBtn || !startInput || !endInput || !countInput)
            return;
        /** 고유 그룹 수 계산 헬퍼 */
        const getUniqueGroupCount = (start, end) => {
            const range = this.questionsData.slice(start - 1, end);
            const groups = new Set(range.map(q => q.group).filter(g => g.trim() !== ''));
            return groups.size;
        };
        /** 문항 수(count) 유효성 검사 및 자동 조정
         * @param forceSync true이면 현재 입력값과 상관없이 최댓값으로 강제 설정합니다.
         */
        const validateCount = (forceSync = false) => {
            const start = parseInt(startInput.value) || 1;
            const end = parseInt(endInput.value) || this.questionsData.length;
            const maxGroups = getUniqueGroupCount(start, end);
            const currentCount = parseInt(countInput.value) || 0;
            if (forceSync || currentCount > maxGroups) {
                countInput.value = maxGroups.toString();
            }
        };
        // 1, 2. scope-start 입력 시 유효성 검사 (포커스를 잃을 때)
        startInput.addEventListener('change', () => {
            let val = parseInt(startInput.value);
            const endVal = parseInt(endInput.value) || this.questionsData.length;
            if (isNaN(val))
                return;
            if (val < 1) {
                val = 1;
                startInput.value = "1";
            }
            if (val > endVal) {
                val = endVal;
                startInput.value = endVal.toString();
            }
            validateCount(true); // 범위 변경 시 자동 지정
        });
        // 3, 4. scope-end 입력 시 유효성 검사 (포커스를 잃을 때)
        endInput.addEventListener('change', () => {
            let val = parseInt(endInput.value);
            const startVal = parseInt(startInput.value) || 1;
            const maxLen = this.questionsData.length;
            if (isNaN(val))
                return;
            if (val > maxLen) {
                val = maxLen;
                endInput.value = maxLen.toString();
            }
            if (val < startVal) {
                val = startVal;
                endInput.value = startVal.toString();
            }
            validateCount(true); // 범위 변경 시 자동 지정
        });
        // 5. scope-count 입력 시 유효성 검사 (포커스를 잃을 때)
        countInput.addEventListener('change', () => {
            validateCount();
        });
        // 6. 확인 버튼 클릭 시 데이터 저장 및 닫기
        confirmBtn.addEventListener('click', () => {
            this.scopeSettings = {
                start: parseInt(startInput.value) || 1,
                end: parseInt(endInput.value) || this.questionsData.length,
                count: parseInt(countInput.value) || 0
            };
            dialog.close();
            this.initializeExamSettingWorkspace();
        });
        cancelBtn.addEventListener('click', () => {
            dialog.close();
        });
    }
    /** 범위 설정 대화상자를 엽니다. */
    setExamScope() {
        const dialog = document.getElementById('scope-dialog');
        if (!dialog)
            return;
        const startInput = document.getElementById('scope-start');
        const endInput = document.getElementById('scope-end');
        const countInput = document.getElementById('scope-count');
        if (!startInput || !endInput || !countInput)
            return;
        // 초기값 설정 (현재 설정값 또는 기본값)
        startInput.value = this.scopeSettings.start.toString();
        endInput.value = (this.scopeSettings.end || this.questionsData.length).toString();
        // 중복 없는 그룹 번호 개수 계산하여 초기 문항 수 설정
        const start = parseInt(startInput.value);
        const end = parseInt(endInput.value);
        const range = this.questionsData.slice(start - 1, end);
        const groups = new Set(range.map(q => q.group).filter(g => g.trim() !== ''));
        // 만약 기존 설정된 count가 0이거나 최대 그룹수를 넘는다면 재계산
        if (this.scopeSettings.count === 0 || this.scopeSettings.count > groups.size) {
            countInput.value = groups.size.toString();
        }
        else {
            countInput.value = this.scopeSettings.count.toString();
        }
        dialog.showModal();
    }
    /** i18n 데이터를 기반으로 모든 HTML 요소의 텍스트 갱신
     */
    updateUILanguage() {
        const langData = translations[this.currentLang];
        if (!langData)
            return;
        // 주메뉴 텍스트 적용
        document.querySelectorAll('.menu-item').forEach(el => {
            const key = el.dataset.menu;
            if (key && langData.menus[key]) {
                el.textContent = langData.menus[key];
            }
        });
        // 하위 메뉴 텍스트 적용
        document.querySelectorAll('.submenu-item').forEach(el => {
            const key = el.dataset.action;
            if (key && langData.actions[key]) {
                el.textContent = langData.actions[key];
            }
        });
        // 현재 렌더링된 뷰가 있다면 제목 등도 다시 갱신
        if (this.currentMenu) {
            if (this.currentMenu === 'question-bank') {
                this.initializeQuestionBankWorkspace();
            }
            else if (this.currentMenu === 'student-list') {
                this.initializeStudentListWorkspace();
            }
            else if (this.currentMenu === 'self-study') {
                this.initializeSelfStudyWorkspace();
            }
            else {
                this.refreshCurrentViewTitle();
            }
        }
        // 대화상자 텍스트 갱신
        this.updateDialogLanguage();
    }
    /** 학생 명단 작업공간 초기화
     * @param forceReset true이면 모든 내용을 비우고 초기화합니다.
     * @param skipSave true이면 현재 화면 데이터를 배열에 저장하지 않고 렌더링만 합니다.
     */
    initializeStudentListWorkspace(forceReset = false, skipSave = false) {
        if (!this.container)
            return;
        // [수정] skipSave가 아닐 때만 현재 데이터를 저장합니다.
        if (this.currentMenu === 'student-list' && !forceReset && !skipSave) {
            this.saveCurrentStudentsToState();
        }
        else if (this.currentMenu === 'question-bank') {
            this.saveCurrentQuestionsToState();
        }
        this.currentMenu = 'student-list';
        // 초기화 또는 데이터가 없는 경우 10명의 빈 학생 생성
        if (forceReset || this.studentsData.length === 0) {
            this.studentsData = Array.from({ length: 10 }, () => ({
                fullName: '', studentId: '', selected: false
            }));
            if (forceReset)
                this.student_list_file_name = '';
        }
        const langData = translations[this.currentLang] || translations['ko'];
        const title = langData.actions['sl-editing'] || 'Editing Student List';
        const addBtnText = this.currentLang === 'ko' ? "+ 학생 추가" : (this.currentLang === 'ru' ? "+ Добавить студента" : (this.currentLang === 'ky' ? "+ Студент кошуу" : "+ Add Student"));
        const selectAllText = langData.actions['sl-select-all'] || 'Select All';
        const invertText = langData.actions['sl-invert-selection'] || 'Invert';
        const removeText = langData.actions['sl-remove-selected'] || '- Remove';
        // 파일 이름 표시용 HTML 추가
        const fileInfoHtml = this.student_list_file_name
            ? `<span class="file-info-label">[ ${this.student_list_file_name} ]</span>`
            : '';
        // 헤더 영역
        let html = `
            <div class="view-header">
                <h2>${title}${fileInfoHtml}</h2>
                <div class="view-actions">
                    <button id="sl-select-all-btn">${selectAllText}</button>
                    <button id="sl-invert-btn" style="margin-left: 5px;">${invertText}</button>
                    <button id="add-student-btn" style="margin-left: 15px;">${addBtnText}</button>
                    <button id="sl-remove-btn" style="margin-left: 5px;">${removeText}</button>
                </div>
            </div>
            <div class="student-list-container" id="student-list-container">
        `;
        // 학생 리스트 생성
        this.studentsData.forEach((s) => {
            html += this.createStudentItemHtml(s);
        });
        html += `</div>`;
        this.container.innerHTML = html;
        // 이벤트 바인딩
        document.getElementById('sl-select-all-btn')?.addEventListener('click', () => this.selectAllStudents(true));
        document.getElementById('sl-invert-btn')?.addEventListener('click', () => this.invertStudentSelection());
        document.getElementById('add-student-btn')?.addEventListener('click', () => this.addNewStudent());
        document.getElementById('sl-remove-btn')?.addEventListener('click', () => this.removeSelectedStudents());
        // 현재 선택된 메뉴 강조 업데이트
        this.updateActiveMenu('student-list');
        const listContainer = document.getElementById('student-list-container');
        listContainer?.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => this.isDirtySL = true);
            input.addEventListener('change', () => this.isDirtySL = true);
        });
    }
    /** 모든 학생 선택/해제 */
    selectAllStudents(selected) {
        this.saveCurrentStudentsToState();
        this.isDirtySL = true;
        this.studentsData.forEach(s => s.selected = selected);
        this.initializeStudentListWorkspace(false, true);
    }
    /** 학생 선택 반전 */
    invertStudentSelection() {
        this.saveCurrentStudentsToState();
        this.isDirtySL = true;
        this.studentsData.forEach(s => s.selected = !s.selected);
        this.initializeStudentListWorkspace(false, true);
    }
    /** 선택된 학생 삭제 */
    removeSelectedStudents() {
        this.saveCurrentStudentsToState();
        const beforeCount = this.studentsData.length;
        this.studentsData = this.studentsData.filter(s => !s.selected);
        if (this.studentsData.length === beforeCount) {
            const msg = translations[this.currentLang].actions['msg-select-students-to-remove'];
            alert(msg);
            return;
        }
        this.isDirtySL = true;
        this.initializeStudentListWorkspace(false, true);
    }
    /** 하나의 학생 항목 HTML 생성 */
    createStudentItemHtml(data) {
        const langData = translations[this.currentLang];
        const phName = langData.actions['ph-sl-name'] || '성명을 입력하세요.';
        const phId = langData.actions['ph-sl-id'] || '학번을 입력하세요.';
        return `
            <div class="student-item">
                <input type="checkbox" class="choice-check" ${data.selected ? 'checked' : ''}>
                <div class="sl-label">${langData.actions['sl-full-name']}</div>
                <input type="text" class="sl-fullname sl-full-name-input" value="${data.fullName}" placeholder="${phName}">
                <div class="sl-label">${langData.actions['sl-id']}</div>
                <input type="text" class="sl-input sl-id" value="${data.studentId}" placeholder="${phId}">
            </div>
        `;
    }
    /** 새로운 학생 추가 */
    addNewStudent() {
        this.saveCurrentStudentsToState();
        this.isDirtySL = true;
        const newStudent = { fullName: '', studentId: '', selected: false };
        this.studentsData.push(newStudent);
        const container = document.getElementById('student-list-container');
        if (container) {
            const div = document.createElement('div');
            div.innerHTML = this.createStudentItemHtml(newStudent);
            const el = div.firstElementChild;
            container.appendChild(el);
            el.scrollIntoView({ behavior: 'smooth', block: 'end' });
            // 새 입력 필드에 변경 감지 추가
            el.querySelectorAll('input').forEach(input => {
                input.addEventListener('input', () => this.isDirtySL = true);
                input.addEventListener('change', () => this.isDirtySL = true);
            });
        }
    }
    /** 현재 학생 명단 데이터 저장 */
    saveCurrentStudentsToState() {
        const container = document.getElementById('student-list-container');
        if (!container)
            return;
        const newData = [];
        container.querySelectorAll('.student-item').forEach(item => {
            const fullNameInput = item.querySelector('.sl-fullname');
            const idInput = item.querySelector('.sl-id');
            const check = item.querySelector('.choice-check');
            if (fullNameInput && idInput && check) {
                newData.push({
                    selected: check.checked,
                    fullName: fullNameInput.value,
                    studentId: idInput.value
                });
            }
        });
        if (newData.length > 0)
            this.studentsData = newData;
    }
    /** 자기주도학습 작업공간 초기화 */
    initializeSelfStudyWorkspace() {
        if (!this.container)
            return;
        // 다른 메뉴에서 돌아오는 경우 데이터 저장
        if (this.currentMenu === 'question-bank') {
            this.saveCurrentQuestionsToState();
        }
        else if (this.currentMenu === 'student-list') {
            this.saveCurrentStudentsToState();
        }
        else if (this.currentMenu === 'self-study') {
            this.saveStudyState();
        }
        this.currentMenu = 'self-study';
        // 현재 선택된 메뉴 강조 업데이트
        this.updateActiveMenu('self-study');
        // [추가] 자기주도학습 진입 시 사용자의 이전 답안 초기화
        this.userAnswers = Array.from({ length: this.questionsData.length }, () => [false, false, false, false]);
        this.currentQuestionIndex = 0;
        const langData = translations[this.currentLang] || translations['ko'];
        const title = langData.actions['ss-viewing'] || 'Taking an Exam';
        const fileInfoHtml = this.question_bank_file_name
            ? `<span class="file-info-label">[ ${this.question_bank_file_name} ]</span>`
            : '';
        const submitBtnText = langData.actions['ss-submit-paper'] || 'Submit';
        const prevBtnText = langData.actions['ss-prev-question'] || '<-';
        const nextBtnText = langData.actions['ss-next-question'] || '->';
        // 컨테이너 레이아웃 (메인 뷰 + 사이드바)
        this.container.innerHTML = `
            <div class="ss-container">
                <div class="ss-main-view">
                    <div class="view-header">
                        <h2>${title}${fileInfoHtml}</h2>
                        <div class="ss-nav-controls">
                            <button class="ss-nav-btn" id="ss-prev-btn">${prevBtnText}</button>
                            <button class="ss-nav-btn" id="ss-next-btn">${nextBtnText}</button>
                        </div>
                        <div class="view-actions">
                            <button id="ss-submit-btn">${submitBtnText}</button>
                        </div>
                    </div>
                    <div class="student-list-container" id="ss-card-container">
                        <!-- 현재 한 문제만 표시됨 -->
                    </div>
                </div>
                <div class="ss-sidebar" id="ss-sidebar">
                    <!-- 문제 번호 버튼들 -->
                </div>
            </div>
        `;
        // 이벤트 바인딩
        document.getElementById('ss-prev-btn')?.addEventListener('click', () => this.prevQuestion());
        document.getElementById('ss-next-btn')?.addEventListener('click', () => this.nextQuestion());
        document.getElementById('ss-submit-btn')?.addEventListener('click', () => {
            const dialog = document.getElementById('submit-confirm-dialog');
            dialog?.showModal();
        });
        // 문제 리스트가 비어있지 않은지 확인 (최소 10개는 기본 생성되므로)
        if (this.questionsData.length === 0) {
            this.questionsData = Array.from({ length: 10 }, (_, idx) => ({
                group: (idx + 1).toString(),
                text: '',
                choices: Array.from({ length: 4 }, () => ({ text: '', correct: false }))
            }));
        }
        this.renderCurrentQuestion();
        this.renderSidebarButtons();
        this.updateNavButtonsVisibility();
        // [추가] 높이 자동 조절 적용
        this.adjustAllTextAreasHeight();
    }
    /** 현재 인덱스의 문제를 카드 영역에 렌더링 */
    renderCurrentQuestion() {
        const container = document.getElementById('ss-card-container');
        if (!container)
            return;
        const q = this.questionsData[this.currentQuestionIndex];
        // [수정] useUserAnswers=true로 전달하여 정답 대신 사용자의 선택값을 보여줌
        container.innerHTML = this.createQuestionItemHtml(this.currentQuestionIndex + 1, q, true, true, false, true);
        // [추가] 높이 자동 조절 적용
        this.adjustAllTextAreasHeight();
        // [추가] 체크박스 클릭 시 실시간으로 사이드바와 상태 동기화
        container.querySelectorAll('.choice-check').forEach(chk => {
            chk.addEventListener('change', () => {
                this.saveStudyState();
                this.renderSidebarButtons();
            });
        });
    }
    /** 사이드바에 모든 문제 번호 버튼 렌더링 */
    renderSidebarButtons() {
        const sidebar = document.getElementById('ss-sidebar');
        if (!sidebar)
            return;
        let html = '';
        this.questionsData.forEach((q, i) => {
            const isActive = i === this.currentQuestionIndex ? 'active' : '';
            // [수정] 실제 정답 대신 사용자가 선택한 답안(userAnswers) 번호 찾기 (1-based index)
            const userSelections = this.userAnswers[i] || [];
            const selectedIndices = userSelections
                .map((checked, idx) => checked ? (idx + 1) : null)
                .filter(idx => idx !== null);
            let label = (i + 1).toString();
            if (selectedIndices.length > 0) {
                label += ` -> ${selectedIndices.join(', ')}`;
            }
            html += `<button class="ss-sidebar-btn ${isActive}" data-idx="${i}">${label}</button>`;
        });
        sidebar.innerHTML = html;
        // 사이드바 버튼 클릭 이벤트
        sidebar.querySelectorAll('.ss-sidebar-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.currentTarget.dataset.idx || '0');
                this.jumpToQuestion(idx);
            });
        });
    }
    prevQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.saveStudyState();
            this.currentQuestionIndex--;
            this.refreshStudyView();
        }
    }
    nextQuestion() {
        if (this.currentQuestionIndex < this.questionsData.length - 1) {
            this.saveStudyState();
            this.currentQuestionIndex++;
            this.refreshStudyView();
        }
    }
    jumpToQuestion(index) {
        this.saveStudyState();
        this.currentQuestionIndex = index;
        this.refreshStudyView();
    }
    /** 화면의 입력값을 현재 문제 상태에 저장 (자기주도학습 전용) */
    saveStudyState() {
        const item = document.querySelector('.question-item');
        if (!item)
            return;
        const checks = [];
        item.querySelectorAll('.choice-row').forEach(row => {
            const check = row.querySelector('.choice-check');
            if (check) {
                checks.push(check.checked);
            }
        });
        // 원본 데이터를 덮어쓰지 않고 사용자의 선택값만 따로 저장
        this.userAnswers[this.currentQuestionIndex] = checks;
    }
    refreshStudyView() {
        this.renderCurrentQuestion();
        this.renderSidebarButtons();
        this.updateNavButtonsVisibility();
    }
    /** 현재 문제 위치에 따라 이전/다음 버튼 표시 여부 결정 */
    updateNavButtonsVisibility() {
        const prevBtn = document.getElementById('ss-prev-btn');
        const nextBtn = document.getElementById('ss-next-btn');
        if (prevBtn) {
            prevBtn.style.visibility = this.currentQuestionIndex === 0 ? 'hidden' : 'visible';
        }
        if (nextBtn) {
            nextBtn.style.visibility = this.currentQuestionIndex === this.questionsData.length - 1 ? 'hidden' : 'visible';
        }
    }
    /**
     * 대화상자의 고정 텍스트를 언어에 맞춰 갱신
     */
    updateDialogLanguage() {
        const langData = translations[this.currentLang];
        // 대화상자 제목 갱신
        const langTitle = document.getElementById('lang-dialog-title');
        if (langTitle)
            langTitle.textContent = langData.actions['st-lang'];
        const themeTitle = document.getElementById('theme-dialog-title');
        if (themeTitle)
            themeTitle.textContent = langData.actions['st-theme'];
        const submitTitle = document.getElementById('submit-dialog-title');
        if (submitTitle)
            submitTitle.textContent = langData.actions['ss-submit-paper'];
        const scopeTitle = document.getElementById('scope-dialog-title');
        if (scopeTitle)
            scopeTitle.textContent = langData.actions['st-scope-title'];
        const scopeGuide = document.getElementById('scope-guide');
        if (scopeGuide)
            scopeGuide.textContent = langData.actions['st-scope-guide'];
        const scopeCountLabel = document.getElementById('scope-count-label');
        if (scopeCountLabel)
            scopeCountLabel.textContent = langData.actions['st-scope-count-label'];
        const submitMsg = document.getElementById('submit-dialog-msg');
        if (submitMsg) {
            const msgs = {
                ko: "정말로 답안지를 제출하시겠습니까? 제출 후에는 수정할 수 없습니다.",
                en: "Are you sure you want to submit your answers? You cannot edit them after submission.",
                ru: "Вы уверены, что хотите сдать ответы? После сдачи редактирование будет невозможно.",
                ky: "Чын эле жоопторду тапшырууну каалайсызбы? Тапшыргандан кийин аларды түзөтүү мүмкүн эмес."
            };
            submitMsg.textContent = msgs[this.currentLang] || msgs.en;
        }
        // 라디오 버튼 라벨 갱신 (언어)
        const fixedLangLabels = ["한국어", "English", "Русский", "Кыргызча"];
        // 테마 목록은 현재 언어 설정을 따름
        const themeLabels = {
            ko: ["데스크탑 앱 스타일", "웹 스타일"],
            en: ["Desktop App Style", "Web Style"],
            ru: ["Стиль рабочего стола", "Веб-стиль"],
            ky: ["Иш тактасынын стили", "Веб стили"]
        };
        const currentThemeLabels = themeLabels[this.currentLang] || themeLabels.en;
        const langDialog = document.getElementById('lang-dialog');
        if (langDialog) {
            langDialog.querySelectorAll('.radio-group label').forEach((el, idx) => {
                const radio = el.querySelector('input');
                if (radio && fixedLangLabels[idx]) {
                    el.innerHTML = ""; // 기존 텍스트 제거
                    el.appendChild(radio);
                    el.appendChild(document.createTextNode(` ${fixedLangLabels[idx]}`));
                }
            });
        }
        const themeDialog = document.getElementById('theme-dialog');
        if (themeDialog) {
            themeDialog.querySelectorAll('.radio-group label').forEach((el, idx) => {
                const radio = el.querySelector('input');
                if (radio && currentThemeLabels[idx]) {
                    el.innerHTML = "";
                    el.appendChild(radio);
                    el.appendChild(document.createTextNode(` ${currentThemeLabels[idx]}`));
                }
            });
        }
        // 공통 버튼 텍스트 (확인/취소)
        const btnLabels = {
            ko: { ok: "확인", cancel: "취소" },
            en: { ok: "OK", cancel: "Cancel" },
            ru: { ok: "OK", cancel: "Отмена" },
            ky: { ok: "OK", cancel: "Жокко чыгаруу" }
        };
        const btnText = btnLabels[this.currentLang] || btnLabels.en;
        document.querySelectorAll('.modal-actions button').forEach(btn => {
            if (btn.id.includes('confirm'))
                btn.textContent = btnText.ok;
            if (btn.id.includes('cancel'))
                btn.textContent = btnText.cancel;
        });
    }
    bindEvents() {
        // 주메뉴 클릭 핸들러
        const menuButtons = document.querySelectorAll('.menu-item');
        menuButtons.forEach(btn => {
            btn.addEventListener('mousedown', (e) => {
                const target = e.currentTarget;
                const menu = target.dataset.menu;
                if (!menu || this.currentMenu === menu)
                    return;
                this.updateActiveMenu(menu);
                this.renderView(menu);
            });
        });
        // 하위 메뉴(고유 액션) 클릭 핸들러
        document.querySelectorAll('.submenu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const target = e.currentTarget;
                const action = target.dataset.action;
                if (action) {
                    this.handleAction(action);
                }
            });
        });
    }
    /**
     * 고유 액션 ID를 기반으로 각기 다른 기능 수행
     */
    handleAction(action) {
        console.log(`Action executing: ${action}`);
        // [추가] 액션 접두사에 따라 해당하는 주메뉴 작업공간으로 자동 전환
        const prefixMap = {
            'qb-edit-header': 'header-edit',
            'qb-': 'question-bank',
            'ex-': 'exam-setting',
            'sl-': 'student-list',
            'ss-': 'self-study',
            'st-': 'settings',
            'in-': 'information'
        };
        for (const [prefix, menu] of Object.entries(prefixMap)) {
            if (action.startsWith(prefix)) {
                // [수정] 대화상자만 띄우는 액션들은 뷰 전환을 건너뜁니다.
                if (action === 'in-info-copy' || action === 'in-info-license' ||
                    action === 'st-theme' || action === 'st-lang') {
                    break;
                }
                if (this.currentMenu !== menu) {
                    // 주메뉴 버튼 활성화 상태 업데이트
                    this.updateActiveMenu(menu);
                    this.renderView(menu);
                }
                break;
            }
        }
        switch (action) {
            /* --- Question Bank (문제은행) --- */
            case 'qb-new':
                this.newQuestionBank();
                break;
            case 'qb-open':
                this.openQuestionBank();
                break; // 추가됨
            case 'qb-stat':
                this.statQuestionBank();
                break; // 추가됨
            case 'qb-save':
                this.saveQuestionBank();
                break; // 추가됨
            case 'qb-save-as':
                this.saveAsQuestionBank();
                break; // 추가됨
            case 'qb-edit-question-bank':
                this.renderView('question-bank');
                break; // [추가]
            case 'qb-edit-header': /* renderView에서 처리됨 */ break;
            case 'qb-optimize':
                this.optimizeQuestionBank();
                break; // 추가됨
            /* --- Exam Setting (시험 설정) --- */
            case 'ex-load-bank':
                this.openQuestionBank();
                break;
            case 'ex-load-students':
                this.openStudentList();
                break;
            case 'ex-set-scope':
                this.setExamScope();
                break;
            case 'ex-save-paper':
                this.saveExamPaper();
                break;
            /* --- Student List (학생 명단) --- */
            case 'sl-new':
                this.newStudentList();
                break;
            case 'sl-open':
                this.openStudentList();
                break;
            case 'sl-optimize':
                this.optimizeStudentList();
                break;
            case 'sl-save':
                this.saveStudentList();
                break;
            case 'sl-save-as':
                this.saveAsStudentList();
                break;
            case 'sl-edit-student-list':
                this.renderView('student-list');
                break; // [추가]
            /* --- Self-study (자기 주도 학습) --- */
            case 'ss-load-bank':
                this.openQuestionBank();
                break; // 추가됨 (공용 함수 사용)
            case 'ss-set-scope':
                this.setExamScope();
                break; // 추가됨
            case 'ss-set-grading-method':
                this.setGradingMethod();
                break; // 추가됨
            case 'ss-start':
                this.startSelfstudy();
                break; // 추가됨
            /* --- Settings (설정) --- */
            case 'st-path-bank':
                this.setQuestionBankDefaultPath();
                break; // 추가됨
            case 'st-path-student':
                this.setStudentListDefaultPath();
                break; // 추가됨
            case 'st-theme':
                this.setTheme();
                break; // 추가 및 변경됨
            case 'st-font':
                this.setFonts();
                break; // 추가됨
            case 'st-lang':
                this.setLanguage();
                break; // 추가 및 변경됨
            /* --- Information (정보) --- */
            case 'in-help':
                this.help();
                break; // 추가됨
            case 'in-info-soft':
                this.showSoftwareInfo();
                break; // 추가됨
            case 'in-info-copy':
                this.showCopyright();
                break; // 추가됨
            case 'in-info-license':
                this.showLicense();
                break; // 추가됨
            default:
                console.warn(`No handler defined for action: ${action}`);
        }
    }
    /** 문제은행 작업공간 초기화
     * @param forceReset true이면 모든 내용을 비우고 초기화합니다.
     * @param skipSave true이면 현재 화면 데이터를 배열에 저장하지 않고 렌더링만 합니다.
     */
    initializeQuestionBankWorkspace(forceReset = false, skipSave = false) {
        if (!this.container) {
            return;
        }
        // [수정] skipSave가 아닐 때만 현재 데이터를 저장합니다.
        // addNewQuestion 등에서 데이터를 수동으로 조작한 후에는 저장하지 않아야 합니다.
        if (this.currentMenu === 'question-bank' && !forceReset && !skipSave) {
            this.saveCurrentQuestionsToState();
        }
        else if (this.currentMenu === 'header-edit' && !skipSave) {
            this.saveCurrentHeaderToState();
        }
        this.currentMenu = 'question-bank';
        // [수정] forceReset이면 10개, 데이터가 아예 없는 경우(열기/최적화 결과)는 1개의 빈 문제로 초기화
        if (forceReset) {
            this.questionsData = Array.from({ length: 10 }, (_, idx) => ({
                group: (idx + 1).toString(), // 그룹에는 문제 번호 자동 입력
                text: '', // 문제는 비워둠
                choices: Array.from({ length: 4 }, () => ({ text: '', correct: false }))
            }));
            this.question_bank_file_name = ''; // 새 파일이므로 이름 초기화
        }
        else if (this.questionsData.length === 0) {
            this.questionsData = [{
                    group: '1',
                    text: '',
                    choices: Array.from({ length: 4 }, () => ({ text: '', correct: false }))
                }];
        }
        const langData = translations[this.currentLang] || translations['ko'];
        const title = langData.actions['qb-editing'] || 'Editing';
        const fileInfoHtml = this.question_bank_file_name
            ? `<span class="file-info-label">[ ${this.question_bank_file_name} ]</span>`
            : '';
        // 버튼 텍스트 및 모드별 버튼 구성
        const toggleBtnText = langData.actions['qb-toggle'] || '토글';
        let actionButtonsHtml = "";
        if (this.editorMode === 'question') {
            const addBtnText = langData.actions['qb-add-question'] || "+ 문제 추가";
            const duplicateBtnText = langData.actions['qb-duplicate-question'] || "= 문제 복제";
            const removeBtnText = langData.actions['qb-remove-question'] || "- 문제 삭제";
            const insertBtnText = langData.actions['qb-insert'] || '->V<- 문제 삽입';
            actionButtonsHtml = `
                <input type="number" id="insert-pos-left" style="width: 40px; text-align: center;" min="1">
                <span style="margin: 0 5px;">:</span>
                <input type="number" id="insert-pos-right" style="width: 40px; text-align: center;" min="2">
                <button id="insert-question-btn" style="margin-right: 10px; margin-left: 5px;">${insertBtnText}</button>
                <button id="duplicate-question-btn" style="margin-right: 5px;">${duplicateBtnText}</button>
                <button id="add-question-btn" style="margin-right: 5px;">${addBtnText}</button>
                <button id="remove-question-btn" style="margin-right: 5px;">${removeBtnText}</button>
            `;
        }
        else {
            const addBtnText = langData.actions['qb-add-choice'] || "+ 선택지 추가";
            const duplicateBtnText = langData.actions['qb-duplicate-choice'] || "= 선택지 복제";
            const removeBtnText = langData.actions['qb-remove-choice'] || "- 선택지 삭제";
            const insertBtnText = langData.actions['qb-insert-choice'] || '->V<- 선택지 삽입';
            actionButtonsHtml = `
                <input type="number" id="insert-choice-pos-left" style="width: 40px; text-align: center;" min="1">
                <span style="margin: 0 5px;">:</span>
                <input type="number" id="insert-choice-pos-right" style="width: 40px; text-align: center;" min="2">
                <button id="insert-choice-btn" style="margin-right: 10px; margin-left: 5px;">${insertBtnText}</button>
                <button id="duplicate-choice-btn" style="margin-right: 5px;">${duplicateBtnText}</button>
                <button id="add-choice-btn" style="margin-right: 5px;">${addBtnText}</button>
                <button id="remove-choice-btn" style="margin-right: 5px;">${removeBtnText}</button>
            `;
        }
        let html = `
            <div class="view-header">
                <div class="view-header-left">
                    <h2>${title}</h2>
                    ${fileInfoHtml}
                </div>
                <div class="view-actions">
                    ${actionButtonsHtml}
                    <button id="toggle-editor-mode-btn" style="margin-left: 5px;">${toggleBtnText}</button>
                </div>
            </div>
            <div class="student-list-container" id="student-list">
        `;
        this.questionsData.forEach((q, i) => {
            // [수정] 문제은행에서는 체크박스가 활성화되어야 함 (checkDisabled=false)
            html += this.createQuestionItemHtml(i + 1, q, false, false, false);
        });
        html += `</div>`;
        this.container.innerHTML = html;
        // 토글 버튼 이벤트 바인딩
        document.getElementById('toggle-editor-mode-btn')?.addEventListener('click', () => this.toggleEditorMode());
        // 문제 카드 포커스 이벤트 설정
        const listContainer = document.getElementById('student-list');
        if (listContainer) {
            const items = listContainer.querySelectorAll('.question-item');
            items.forEach((item, idx) => {
                const setFocus = () => {
                    items.forEach(el => el.classList.remove('focused'));
                    item.classList.add('focused');
                    this.focusedQuestionIndex = idx;
                };
                // 카드 내의 클릭/포커스 이벤트를 통합 관리
                const handleFocus = (e) => {
                    const target = e.target;
                    // 선택지 입력창이 아닌 곳에 포커스가 가거나 클릭되면 선택지 포커스 인덱스 초기화
                    if (!target.classList.contains('choice-input')) {
                        this.focusedChoiceIndex = null;
                    }
                    setFocus();
                };
                item.addEventListener('click', handleFocus);
                item.addEventListener('focusin', handleFocus);
                // 선택지 입력창들에 대한 개별 포커스 이벤트 (인덱스 저장)
                item.querySelectorAll('.choice-input').forEach((input, cIdx) => {
                    input.addEventListener('focus', () => {
                        this.focusedChoiceIndex = cIdx;
                    });
                });
                // 만약 이전에 포커스된 인덱스였다면 클래스 복구
                if (this.focusedQuestionIndex === idx) {
                    item.classList.add('focused');
                }
            });
        }
        // 위로/아래로 버튼 이벤트 바인딩
        this.container.querySelectorAll('.q-nav-up-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.target.dataset.index || '1');
                this.moveQuestionUp(idx);
            });
        });
        this.container.querySelectorAll('.q-nav-down-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.target.dataset.index || '1');
                this.moveQuestionDown(idx);
            });
        });
        // 입력창 동기화 로직 및 버튼 이벤트 바인딩 (모드에 따라 다름)
        if (this.editorMode === 'question') {
            const leftInput = document.getElementById('insert-pos-left');
            const rightInput = document.getElementById('insert-pos-right');
            if (leftInput && rightInput) {
                leftInput.addEventListener('input', () => {
                    const val = parseInt(leftInput.value);
                    if (!isNaN(val))
                        rightInput.value = (val + 1).toString();
                });
                rightInput.addEventListener('input', () => {
                    const val = parseInt(rightInput.value);
                    if (!isNaN(val))
                        leftInput.value = (val - 1).toString();
                });
            }
            document.getElementById('insert-question-btn')?.addEventListener('click', () => {
                const pos = parseInt(rightInput.value);
                if (!isNaN(pos))
                    this.insertQuestion(pos);
                else {
                    const msg = translations[this.currentLang].actions['msg-input-insert-pos'];
                    alert(msg);
                }
            });
            document.getElementById('duplicate-question-btn')?.addEventListener('click', () => this.duplicateFocusedQuestion());
            document.getElementById('add-question-btn')?.addEventListener('click', () => this.addNewQuestion());
            document.getElementById('remove-question-btn')?.addEventListener('click', () => this.removeFocusedQuestion());
        }
        else {
            const leftInput = document.getElementById('insert-choice-pos-left');
            const rightInput = document.getElementById('insert-choice-pos-right');
            if (leftInput && rightInput) {
                leftInput.addEventListener('input', () => {
                    const val = parseInt(leftInput.value);
                    if (!isNaN(val))
                        rightInput.value = (val + 1).toString();
                });
                rightInput.addEventListener('input', () => {
                    const val = parseInt(rightInput.value);
                    if (!isNaN(val))
                        leftInput.value = (val - 1).toString();
                });
            }
            document.getElementById('insert-choice-btn')?.addEventListener('click', () => {
                const pos = parseInt(rightInput.value);
                if (!isNaN(pos))
                    this.insertChoice(pos);
                else
                    alert("삽입할 위치(번호)를 입력해 주세요.");
            });
            document.getElementById('duplicate-choice-btn')?.addEventListener('click', () => this.duplicateFocusedChoice());
            document.getElementById('add-choice-btn')?.addEventListener('click', () => this.addNewChoice());
            document.getElementById('remove-choice-btn')?.addEventListener('click', () => this.removeFocusedChoice());
        }
        // 현재 선택된 메뉴 강조 업데이트
        this.updateActiveMenu('question-bank');
        // [추가] 높이 자동 조절 적용 및 실시간 입력 감지
        this.adjustAllTextAreasHeight();
        listContainer?.querySelectorAll('.q-text-area, .choice-input').forEach(ta => {
            ta.addEventListener('input', (e) => {
                this.isDirtyQB = true;
                const el = e.target;
                el.style.height = '0px';
                el.style.height = el.scrollHeight + 'px';
            });
        });
        // 체크박스 변경 감지
        listContainer?.querySelectorAll('.choice-check').forEach(chk => {
            chk.addEventListener('change', () => {
                this.isDirtyQB = true;
            });
        });
    }
    /** 헤더 편집 작업공간 초기화 */
    initializeHeaderEditWorkspace() {
        if (!this.container)
            return;
        // 다른 메뉴에서 돌아오는 경우 데이터 저장
        if (this.currentMenu === 'question-bank') {
            this.saveCurrentQuestionsToState();
        }
        else if (this.currentMenu === 'student-list') {
            this.saveCurrentStudentsToState();
        }
        else if (this.currentMenu === 'self-study') {
            this.saveStudyState();
        }
        this.currentMenu = 'header-edit';
        // 현재 선택된 메뉴 강조 업데이트
        this.updateActiveMenu('header-edit');
        const langData = translations[this.currentLang] || translations['ko'];
        const title = langData.actions['qb-edit-header'] || 'Edit Header';
        // WASM에서 헤더 데이터 가져오기
        const headerTitle = this.control_tower.get_title();
        const headerName = this.control_tower.get_name();
        const headerId = this.control_tower.get_id();
        const headerNotice = this.control_tower.get_notice();
        const headerCats = [];
        for (let i = 1; i <= 4; i++) {
            headerCats.push(this.control_tower.get_header_category(i));
        }
        const labelTitle = langData.actions['qb-header-title'] || '제목:';
        const labelName = langData.actions['qb-header-name'] || '이름:';
        const labelId = langData.actions['qb-header-id'] || 'ID:';
        const labelNotice = langData.actions['qb-header-notice'] || '주의:';
        const phTitle = langData.actions['ph-header-title'] || '시험제목을 입력하세요.';
        const defaultName = langData.actions['ph-header-name'] || '이름';
        const defaultId = langData.actions['ph-header-id'] || '학번';
        const defaultNotice = langData.actions['ph-header-notice-text'] || '';
        const defaultBtnText = langData.actions['qb-default-header-content'] || 'Default Header Content';
        // [수정] 제목이 없거나 기본 플레이스홀더와 같으면 value를 비우고 placeholder로 표시
        const displayTitle = (headerTitle === phTitle || !headerTitle) ? '' : headerTitle;
        let html = `
            <div class="view-header">
                <h2>${title}</h2>
                <div class="view-actions">
                    <button id="qb-default-header-btn">${defaultBtnText}</button>
                    <select id="qb-default-header-lang" style="margin-left: 5px; height: 22px; font-size: 11px;">
                        <option value="ko" ${this.currentLang === 'ko' ? 'selected' : ''}>한국어</option>
                        <option value="en" ${this.currentLang === 'en' ? 'selected' : ''}>English</option>
                        <option value="ru" ${this.currentLang === 'ru' ? 'selected' : ''}>Русский</option>
                        <option value="ky" ${this.currentLang === 'ky' ? 'selected' : ''}>Кыргызча</option>
                    </select>
                </div>
            </div>
            <div class="header-edit-container">
                <div class="header-card">
                    <div class="header-row">
                        <div class="header-label">${labelTitle}</div>
                        <input type="text" id="header-title" class="header-input header-input-title" value="${displayTitle}" placeholder="${phTitle}">
                    </div>
                    <div class="header-row">
                        <div class="header-label">${labelName}</div>
                        <input type="text" id="header-name" class="header-input header-input-name" value="${headerName || defaultName}">
                        <div class="header-label" style="margin-left: 20px;">${labelId}</div>
                        <input type="text" id="header-id" class="header-input header-input-id" value="${headerId || defaultId}">
                    </div>
                    <div class="header-row">
        `;
        for (let i = 1; i <= 4; i++) {
            const labelCat = (langData.actions['qb-header-category'] || '카테고리 {n}:').replace('{n}', i.toString());
            const defaultCat = langData.actions[`ph-header-cat-${i}`] || `Type ${String.fromCharCode(64 + i)}`;
            html += `
                <div class="header-label">${labelCat}</div>
                <input type="text" id="header-cat-${i}" class="header-input header-input-category" value="${headerCats[i - 1] || defaultCat}">
            `;
        }
        html += `
                    </div>
                    <div class="header-row" style="align-items: flex-start;">
                        <div class="header-label">${labelNotice}</div>
                        <textarea id="header-notice" class="header-input header-textarea-notice">${headerNotice || defaultNotice}</textarea>
                    </div>
                </div>
            </div>
        `;
        this.container.innerHTML = html;
        // 변경 감지
        this.container.querySelectorAll('input, textarea').forEach(el => {
            el.addEventListener('input', () => this.isDirtyQB = true);
        });
        // 기본 헤더 내용 버튼 이벤트 바인딩
        document.getElementById('qb-default-header-btn')?.addEventListener('click', () => {
            const langSelect = document.getElementById('qb-default-header-lang');
            if (langSelect) {
                this.applyDefaultHeaderContent(langSelect.value);
            }
        });
    }
    /** 선택된 언어의 기본 헤더 내용을 에디터에 적용합니다. */
    applyDefaultHeaderContent(lang) {
        const langData = translations[lang] || translations['ko'];
        const titleInput = document.getElementById('header-title');
        const nameInput = document.getElementById('header-name');
        const idInput = document.getElementById('header-id');
        const noticeInput = document.getElementById('header-notice');
        if (titleInput) {
            titleInput.placeholder = langData.actions['ph-header-title'] || '';
            titleInput.value = ''; // 안내 메시지는 placeholder로 보여주기 위해 value는 비움
        }
        if (nameInput)
            nameInput.value = langData.actions['ph-header-name'] || '';
        if (idInput)
            idInput.value = langData.actions['ph-header-id'] || '';
        if (noticeInput) {
            noticeInput.value = langData.actions['ph-header-notice-text'] || '';
            // 내용 업데이트 후 높이 조절
            noticeInput.style.height = '0px';
            noticeInput.style.height = noticeInput.scrollHeight + 'px';
        }
        for (let i = 1; i <= 4; i++) {
            const catInput = document.getElementById(`header-cat-${i}`);
            if (catInput) {
                catInput.value = langData.actions[`ph-header-cat-${i}`] || '';
            }
        }
        this.isDirtyQB = true;
    }
    /** 현재 화면의 헤더 데이터를 WASM 엔진에 저장 */
    saveCurrentHeaderToState() {
        const titleInput = document.getElementById('header-title');
        const nameInput = document.getElementById('header-name');
        const idInput = document.getElementById('header-id');
        const noticeInput = document.getElementById('header-notice');
        if (titleInput)
            this.control_tower.set_title(titleInput.value);
        if (nameInput)
            this.control_tower.set_name(nameInput.value);
        if (idInput)
            this.control_tower.set_id(idInput.value);
        if (noticeInput)
            this.control_tower.set_notice(noticeInput.value);
        for (let i = 1; i <= 4; i++) {
            const catInput = document.getElementById(`header-cat-${i}`);
            if (catInput) {
                this.control_tower.set_header_category(i, catInput.value);
            }
        }
    }
    /** 에디터 모드를 전환합니다 (문제 편집 <=> 선택지 편집) */
    toggleEditorMode() {
        this.saveCurrentQuestionsToState();
        this.editorMode = this.editorMode === 'question' ? 'choice' : 'question';
        this.initializeQuestionBankWorkspace(false, true);
    }
    /** 현재 포커스된 문제에 새로운 선택지를 추가합니다. */
    addNewChoice() {
        const idx = this.focusedQuestionIndex;
        if (idx === null || !this.questionsData[idx]) {
            alert(this.currentLang === 'ko' ? "선택지를 추가할 문제를 선택해 주세요." : (this.currentLang === 'ky' ? "Вариант кошуу үчүн суроону тандаңыз." : "Please select a question to add a choice."));
            return;
        }
        this.saveCurrentQuestionsToState();
        const newChoice = { text: '', correct: false };
        this.questionsData[idx].choices.push(newChoice);
        this.isDirtyQB = true;
        // 새 선택지로 포커스 이동 준비
        this.focusedChoiceIndex = this.questionsData[idx].choices.length - 1;
        this.initializeQuestionBankWorkspace(false, true);
        // 추가된 선택지로 포커스 및 스크롤
        setTimeout(() => {
            const list = document.getElementById('student-list');
            const targetQuestion = list?.children[idx];
            if (targetQuestion) {
                const choices = targetQuestion.querySelectorAll('.choice-input');
                const lastChoice = choices[choices.length - 1];
                lastChoice?.focus();
                lastChoice?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, 50);
    }
    /** 현재 포커스된 문제의 선택지를 삭제합니다. (포커스가 있는 선택지 대상) */
    removeFocusedChoice() {
        const qIdx = this.focusedQuestionIndex;
        const cIdx = this.focusedChoiceIndex;
        if (qIdx === null || !this.questionsData[qIdx]) {
            const msg = translations[this.currentLang].actions['msg-select-question-to-delete-choice'];
            alert(msg);
            return;
        }
        if (cIdx === null || !this.questionsData[qIdx].choices[cIdx]) {
            const msg = translations[this.currentLang].actions['msg-specify-choice-to-delete'];
            alert(msg);
            return;
        }
        this.saveCurrentQuestionsToState();
        const choices = this.questionsData[qIdx].choices;
        const targetChoice = choices[cIdx];
        if (!targetChoice)
            return; // TS18048 방지
        // 내용이 있는지 확인
        const hasContent = targetChoice.text.trim().length > 0;
        let shouldDelete = false;
        if (hasContent) {
            const confirmMsg = translations[this.currentLang].actions['msg-confirm-delete-content-choice'];
            if (confirm(confirmMsg)) {
                shouldDelete = true;
            }
        }
        else {
            shouldDelete = true;
        }
        if (shouldDelete) {
            choices.splice(cIdx, 1);
            this.isDirtyQB = true;
            // 삭제 후 포커스 인덱스 조정
            if (choices.length === 0) {
                this.focusedChoiceIndex = null;
            }
            else if (cIdx >= choices.length) {
                this.focusedChoiceIndex = choices.length - 1;
            }
            // (중간 삭제 시에는 cIdx 유지하여 다음 선택지가 포커스됨)
            this.initializeQuestionBankWorkspace(false, true);
            // 삭제 후 남은 선택지에 포커스 자동 이동
            if (this.focusedChoiceIndex !== null) {
                setTimeout(() => {
                    const list = document.getElementById('student-list');
                    const targetQuestion = list?.children[qIdx];
                    const choiceInputs = targetQuestion?.querySelectorAll('.choice-input');
                    if (choiceInputs && choiceInputs[this.focusedChoiceIndex]) {
                        choiceInputs[this.focusedChoiceIndex].focus();
                    }
                }, 50);
            }
        }
    }
    /** 현재 포커스된 문제의 지정된 위치에 선택지를 삽입합니다. */
    insertChoice(targetPos) {
        const qIdx = this.focusedQuestionIndex;
        if (qIdx === null || !this.questionsData[qIdx]) {
            const msg = translations[this.currentLang].actions['msg-select-question-to-insert-choice'];
            alert(msg);
            return;
        }
        this.saveCurrentQuestionsToState();
        const choices = this.questionsData[qIdx].choices;
        const newChoice = { text: '', correct: false };
        if (targetPos > choices.length) {
            choices.push(newChoice);
            this.focusedChoiceIndex = choices.length - 1;
        }
        else {
            choices.splice(targetPos - 1, 0, newChoice);
            this.focusedChoiceIndex = targetPos - 1;
        }
        this.isDirtyQB = true;
        this.initializeQuestionBankWorkspace(false, true);
        // 삽입된 위치로 포커스 및 스크롤
        setTimeout(() => {
            const list = document.getElementById('student-list');
            const targetQuestion = list?.children[qIdx];
            if (targetQuestion) {
                const choiceInputs = targetQuestion.querySelectorAll('.choice-input');
                const targetInput = choiceInputs[this.focusedChoiceIndex];
                targetInput?.focus();
                targetInput?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, 50);
    }
    /** 포커스된 문제 삭제 */
    removeFocusedQuestion() {
        if (this.focusedQuestionIndex === null) {
            const msg = translations[this.currentLang].actions['msg-select-question-to-remove'];
            alert(msg);
            return;
        }
        // 현재 화면의 데이터를 상태로 저장
        this.saveCurrentQuestionsToState();
        const q = this.questionsData[this.focusedQuestionIndex];
        if (!q)
            return;
        // 그룹창을 제외한 필드(본문, 선택지)에 내용이 있는지 확인
        const hasContent = q.text.trim().length > 0 || q.choices.some(c => c.text.trim().length > 0);
        let shouldDelete = false;
        if (hasContent) {
            const confirmMsg = translations[this.currentLang].actions['msg-confirm-delete-content-question'];
            if (confirm(confirmMsg)) {
                shouldDelete = true;
            }
        }
        else {
            // 내용이 없으면 즉시 삭제
            shouldDelete = true;
        }
        if (shouldDelete) {
            this.questionsData.splice(this.focusedQuestionIndex, 1);
            this.isDirtyQB = true;
            // 삭제 후 포커스 인덱스 조정:
            // 1. 데이터가 아예 없으면 null
            if (this.questionsData.length === 0) {
                this.focusedQuestionIndex = null;
            }
            // 2. 마지막 카드를 삭제했다면, 인덱스를 하나 줄여서 새로운 마지막 카드를 가리킴
            else if (this.focusedQuestionIndex >= this.questionsData.length) {
                this.focusedQuestionIndex = this.questionsData.length - 1;
            }
            // 3. 중간 카드를 삭제했다면, 현재 인덱스를 유지 (배열이 밀려오므로 다음 카드가 됨)
            // (else { this.focusedQuestionIndex = this.focusedQuestionIndex; })
            this.initializeQuestionBankWorkspace(false, true);
            // 삭제 후 포커스된 위치로 자동 스크롤
            if (this.focusedQuestionIndex !== null) {
                setTimeout(() => {
                    const list = document.getElementById('student-list');
                    const target = list?.children[this.focusedQuestionIndex];
                    target?.scrollIntoView({ behavior: 'auto', block: 'center' });
                }, 50);
            }
        }
    }
    /** 현재 포커스된 문제를 복제하여 바로 뒤에 삽입합니다. */
    duplicateFocusedQuestion() {
        if (this.focusedQuestionIndex === null) {
            const msg = translations[this.currentLang].actions['msg-select-question-to-remove']; // 재사용 (문제를 선택해 주세요)
            alert(msg);
            return;
        }
        // 1. 현재 데이터 저장
        this.saveCurrentQuestionsToState();
        // 2. 현재 포커스된 문제 복제 (Deep Copy)
        const sourceQ = this.questionsData[this.focusedQuestionIndex];
        if (!sourceQ)
            return;
        const duplicatedQ = {
            group: sourceQ.group,
            text: sourceQ.text,
            choices: sourceQ.choices.map(c => ({ ...c }))
        };
        // 3. 바로 다음 위치에 삽입
        const targetPos = this.focusedQuestionIndex + 1;
        this.questionsData.splice(targetPos, 0, duplicatedQ);
        this.isDirtyQB = true;
        // 4. 복제된 문제로 포커스 이동
        this.focusedQuestionIndex = targetPos;
        // 5. UI 전체 갱신
        this.initializeQuestionBankWorkspace(false, true);
        // 6. 복제된 위치로 즉시 이동
        setTimeout(() => {
            const list = document.getElementById('student-list');
            if (list) {
                const targetElement = list.children[targetPos];
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'auto', block: 'center' });
                    targetElement.querySelector('.q-text-area')?.focus();
                }
            }
        }, 50);
    }
    /** 현재 포커스된 문제의 포커스된 선택지를 복제하여 바로 뒤에 삽입합니다. */
    duplicateFocusedChoice() {
        const qIdx = this.focusedQuestionIndex;
        const cIdx = this.focusedChoiceIndex;
        if (qIdx === null || !this.questionsData[qIdx]) {
            const msg = translations[this.currentLang].actions['msg-select-question-to-insert-choice'];
            alert(msg);
            return;
        }
        if (cIdx === null || !this.questionsData[qIdx].choices[cIdx]) {
            const msg = translations[this.currentLang].actions['msg-specify-choice-to-delete']; // 재사용 (선택지를 지정해 주세요)
            alert(msg);
            return;
        }
        // 1. 현재 데이터 저장
        this.saveCurrentQuestionsToState();
        // 2. 현재 포커스된 선택지 복제
        const sourceC = this.questionsData[qIdx].choices[cIdx];
        const duplicatedC = { ...sourceC };
        // 3. 바로 다음 위치에 삽입
        const targetPos = cIdx + 1;
        this.questionsData[qIdx].choices.splice(targetPos, 0, duplicatedC);
        this.isDirtyQB = true;
        // 4. 복제된 선택지로 포커스 이동
        this.focusedChoiceIndex = targetPos;
        // 5. UI 전체 갱신
        this.initializeQuestionBankWorkspace(false, true);
        // 6. 복제된 위치로 포커스 이동
        setTimeout(() => {
            const list = document.getElementById('student-list');
            const targetQuestion = list?.children[qIdx];
            if (targetQuestion) {
                const choiceInputs = targetQuestion.querySelectorAll('.choice-input');
                const targetInput = choiceInputs[targetPos];
                targetInput?.focus();
                targetInput?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, 50);
    }
    /** 새로운 문제를 배열에 추가하고 UI를 갱신합니다. */
    addNewQuestion() {
        // 1. 현재 화면의 모든 입력 내용을 먼저 배열에 저장 (데이터 무결성 유지)
        this.saveCurrentQuestionsToState();
        // 2. 새 데이터 생성 (번호를 그룹 초기값으로 설정)
        const nextIndex = this.questionsData.length + 1;
        const newQuestion = {
            group: nextIndex.toString(),
            text: '', // 문제 내용은 비워둠
            choices: Array.from({ length: 4 }, () => ({ text: '', correct: false }))
        };
        // 3. 배열에 추가
        this.questionsData.push(newQuestion);
        this.isDirtyQB = true;
        // 새 문제로 포커스 이동
        this.focusedQuestionIndex = this.questionsData.length - 1;
        // 4. UI 전체 갱신 (마지막 문제의 위로/아래로 버튼 상태 갱신을 위해 전체 리렌더링)
        this.initializeQuestionBankWorkspace(false, true);
        // 5. 새 문제로 즉시 이동
        const list = document.getElementById('student-list');
        if (list) {
            const newElement = list.lastElementChild;
            if (newElement) {
                newElement.scrollIntoView({ behavior: 'auto', block: 'end' });
                // 새 문제의 텍스트 영역에 자동 포커스 (편의 기능)
                setTimeout(() => {
                    newElement.querySelector('.q-text-area')?.focus();
                }, 100);
            }
        }
    }
    /** 지정된 위치에 문제를 삽입하고 이후 내용을 뒤로 밀어냅니다. */
    insertQuestion(targetPos) {
        // 1. 현재 화면 데이터 저장
        this.saveCurrentQuestionsToState();
        // 2. 마지막 문제 이후에 삽입하려는 경우 (또는 그 이상)
        if (targetPos > this.questionsData.length) {
            this.addNewQuestion();
            return;
        }
        // 3. 삽입 로직: targetPos 위치(인덱스는 targetPos-1)에 빈 데이터 삽입
        // splice를 사용하면 이후 요소들이 자동으로 뒤로 밀립니다.
        const newQuestion = {
            group: targetPos.toString(),
            text: '',
            choices: Array.from({ length: 4 }, () => ({ text: '', correct: false }))
        };
        this.questionsData.splice(targetPos - 1, 0, newQuestion);
        this.isDirtyQB = true;
        // 삽입된 문제로 포커스 이동
        this.focusedQuestionIndex = targetPos - 1;
        // 5. 전체 UI 갱신 (중간 삽입이므로 전체 리렌더링이 안전함)
        this.initializeQuestionBankWorkspace(false, true);
        // 6. 삽입된 위치로 즉시 이동
        const list = document.getElementById('student-list');
        if (list) {
            const targetElement = list.children[targetPos - 1];
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'auto', block: 'center' });
                setTimeout(() => {
                    targetElement.querySelector('.q-text-area')?.focus();
                }, 100);
            }
        }
    }
    /** 지정된 위치의 문제를 한 칸 위로 올립니다. */
    moveQuestionUp(index) {
        if (index <= 1)
            return;
        // 현재 화면의 변경사항을 먼저 반영
        this.saveCurrentQuestionsToState();
        const i = index - 1; // 0-based current index
        const j = i - 1; // 0-based above index
        const qCurrent = this.questionsData[i];
        const qAbove = this.questionsData[j];
        if (qCurrent && qAbove) {
            // [추가] 현재 스크롤 위치 저장
            const listContainer = document.getElementById('student-list');
            const savedScrollTop = listContainer ? listContainer.scrollTop : 0;
            // 배열의 두 원소를 직접 맞바꿉니다. (내용과 그룹 번호가 통째로 바뀜)
            this.questionsData[i] = qAbove;
            this.questionsData[j] = qCurrent;
            this.isDirtyQB = true;
            // UI 갱신
            this.initializeQuestionBankWorkspace(false, true);
            // [수정] 스크롤 위치 복구 후 부드럽게 이동
            const newList = document.getElementById('student-list');
            if (newList) {
                newList.scrollTop = savedScrollTop;
                newList.children[j]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    }
    /** 지정된 위치의 문제를 한 칸 아래로 내립니다. */
    moveQuestionDown(index) {
        if (index >= this.questionsData.length)
            return;
        // 현재 화면의 변경사항을 먼저 반영
        this.saveCurrentQuestionsToState();
        const i = index - 1; // 0-based current index
        const j = i + 1; // 0-based below index
        const qCurrent = this.questionsData[i];
        const qBelow = this.questionsData[j];
        if (qCurrent && qBelow) {
            // [추가] 현재 스크롤 위치 저장
            const listContainer = document.getElementById('student-list');
            const savedScrollTop = listContainer ? listContainer.scrollTop : 0;
            // 배열의 두 원소를 직접 맞바꿉니다.
            this.questionsData[i] = qBelow;
            this.questionsData[j] = qCurrent;
            this.isDirtyQB = true;
            // UI 갱신
            this.initializeQuestionBankWorkspace(false, true);
            // [수정] 스크롤 위치 복구 후 부드럽게 이동
            const newList = document.getElementById('student-list');
            if (newList) {
                newList.scrollTop = savedScrollTop;
                newList.children[j]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    }
    /** 현재 화면의 입력값들을 questionsData 배열에 저장합니다. */
    saveCurrentQuestionsToState() {
        const list = document.getElementById('student-list');
        if (!list)
            return;
        const items = list.querySelectorAll('.question-item');
        const newData = [];
        items.forEach(item => {
            const groupInput = item.querySelector('.q-group-input');
            const textArea = item.querySelector('.q-text-area');
            if (!groupInput || !textArea)
                return;
            const group = groupInput.value;
            const text = textArea.value;
            const choices = [];
            item.querySelectorAll('.choice-row').forEach(row => {
                const check = row.querySelector('.choice-check');
                const input = row.querySelector('.choice-input');
                if (check && input) {
                    choices.push({ text: input.value, correct: check.checked });
                }
            });
            newData.push({ group, text, choices });
        });
        if (newData.length > 0) {
            this.questionsData = newData;
        }
    }
    /** 하나의 문제 항목 HTML 생성 */
    createQuestionItemHtml(index, data, readOnly = false, hideGroup = false, checkDisabled = true, useUserAnswers = false) {
        const langData = translations[this.currentLang] || translations['ko'];
        const group = data?.group || '';
        const text = data?.text || '';
        const disabled = readOnly ? 'disabled' : '';
        const chkDisabled = checkDisabled ? 'disabled' : '';
        const readonlyAttr = readOnly ? 'readonly' : '';
        const phQuestion = langData.actions['ph-question'] || '문제를 입력하세요...';
        const phChoiceBase = langData.actions['ph-choice'] || '선택지 {n} 입력...';
        const upText = langData.actions['qb-up'] || '위로';
        const downText = langData.actions['qb-down'] || '아래로';
        // 위로/아래로 버튼 (첫 번째/마지막 문제 조건 처리)
        const isFirst = index === 1;
        const isLast = index === this.questionsData.length;
        const navButtonsHtml = readOnly ? '' : `
            <div class="q-nav-btns">
                ${!isFirst ? `<button class="q-nav-up-btn" data-index="${index}">${upText}</button>` : ''}
                ${!isLast ? `<button class="q-nav-down-btn" data-index="${index}">${downText}</button>` : ''}
            </div>
        `;
        const groupHtml = hideGroup ? '' : `
            <div class="q-group-container">
                <input type="text" class="q-group-input" maxlength="3" placeholder="Grp" value="${group}" ${readonlyAttr} ${disabled}>
                ${navButtonsHtml}
            </div>
        `;
        // 해당 문제의 사용자 답안 가져오기
        const qUserAnswers = this.userAnswers[index - 1] || [];
        return `
            <div class="question-item ${readOnly ? 'readonly-mode' : ''}" data-index="${index}">
                <div class="q-main-row">
                    <div class="q-number">${index}.</div>
                    ${groupHtml}
                    <textarea class="q-text-area" placeholder="${phQuestion}" ${readonlyAttr} ${disabled}>${text}</textarea>
                </div>
                ${(data?.choices || []).map((c, i) => {
            const phChoice = phChoiceBase.replace('{n}', (i + 1).toString());
            // 정답 표시 여부 결정
            const isChecked = useUserAnswers ? (qUserAnswers[i] || false) : c.correct;
            return `
                        <div class="choice-row">
                            <input type="checkbox" class="choice-check" title="정답 선택" ${isChecked ? 'checked' : ''} ${chkDisabled}>
                            <textarea class="choice-input" placeholder="${phChoice}" ${readonlyAttr} ${disabled}>${c.text}</textarea>
                        </div>
                    `;
        }).join('')}
            </div>
        `;
    }
    /** 텍스트 내용에 맞춰 textarea의 높이를 동적으로 조절하는 헬퍼 */
    adjustAllTextAreasHeight() {
        // 약간의 지연 시간을 주어 DOM 렌더링이 완료된 후 계산하도록 함
        setTimeout(() => {
            const textareas = document.querySelectorAll('.q-text-area, .choice-input');
            textareas.forEach(ta => {
                const el = ta;
                el.style.height = '0px'; // 높이를 0으로 설정하여 scrollHeight를 정확히 측정
                const scrollHeight = el.scrollHeight;
                el.style.height = scrollHeight + 'px';
            });
        }, 10);
    }
    /** 시험문제 제출 작업공간 초기화 */
    initializeExamSettingWorkspace() {
        if (!this.container)
            return;
        // 다른 메뉴로 이동 전 데이터 저장
        if (this.currentMenu === 'question-bank') {
            this.saveCurrentQuestionsToState();
        }
        this.currentMenu = 'exam-setting';
        // 현재 선택된 메뉴 강조 업데이트
        this.updateActiveMenu('exam-setting');
        const langData = translations[this.currentLang] || translations['ko'];
        const title = langData.actions['ex-editing'] || 'Setting up Exam Paper';
        const qbFileInfoHtml = this.question_bank_file_name
            ? `<span class="file-info-label">[ ${this.question_bank_file_name} ]</span>`
            : '';
        const sbFileInfoHtml = this.student_list_file_name
            ? `<span class="file-info-label">[ ${this.student_list_file_name} ]</span>`
            : '';
        // 밴드(헤더) 영역
        let html = `
            <div class="view-header">
                <h2>${title}${qbFileInfoHtml}${sbFileInfoHtml}</h2>
            </div>
            <div class="student-list-container" id="student-list">
        `;
        // 범위 설정에 따른 데이터 필터링 (인덱스 기준)
        const startIdx = this.scopeSettings.start > 0 ? this.scopeSettings.start - 1 : 0;
        const endIdx = this.scopeSettings.end > 0 ? this.scopeSettings.end : this.questionsData.length;
        const filteredQuestions = this.questionsData.slice(startIdx, endIdx);
        // 편집 중인 문제 리스트를 읽기 전용으로 표시
        filteredQuestions.forEach((q, i) => {
            html += this.createQuestionItemHtml(startIdx + i + 1, q, true); // readOnly = true
        });
        html += `</div>`;
        this.container.innerHTML = html;
        // [추가] 높이 자동 조절 적용
        this.adjustAllTextAreasHeight();
    }
    /**
     * 작업공간에 선택된 파일 경로를 표시합니다.
     */
    displayFilePathInWorkspace() {
        if (!this.container)
            return;
        const langData = translations[this.currentLang];
        let title = "";
        let label = "";
        let path = "";
        if (this.currentMenu === 'question-bank' || this.currentMenu === 'exam-setting' || this.currentMenu === 'self-study') {
            title = langData.menus["question-bank"];
            label = this.currentLang === 'ko' ? "선택된 문제은행 파일 경로" : (this.currentLang === 'ru' ? "Путь к выбранному файлу банка вопросов" : (this.currentLang === 'ky' ? "Тандалган суроолор банкынын файлынын жолу" : "Selected Question Bank File Path"));
            path = this.question_bank_file_name;
        }
        else if (this.currentMenu === 'student-list') {
            title = langData.menus["student-list"];
            label = this.currentLang === 'ko' ? "선택된 학생 명단 파일 경로" : (this.currentLang === 'ru' ? "Путь к выбранному файлу списка студентов" : (this.currentLang === 'ky' ? "Тандалган студенттер тизмесинин файлынын жолу" : "Selected Student List File Path"));
            path = this.student_list_file_name;
        }
        this.container.innerHTML = `
            <div class="view-header">
                <h2>${title}</h2>
            </div>
            <div class="view-content">
                <div class="file-info-box" style="padding: 10px; background: #f0f0f0; border-radius: 4px; margin-bottom: 15px;">
                    <strong>${label}:</strong> 
                    <code style="color: #d63384;">${path}</code>
                </div>
                <p>${this.currentLang === 'ko' ? "파일이 성공적으로 선택되었습니다." : (this.currentLang === 'ru' ? "Файл успешно выбран." : (this.currentLang === 'ky' ? "Файл ийгиликтүү тандалды." : "File successfully selected."))}</p>
            </div>
        `;
    }
    /* 문제은행 관련 함수군 */
    newQuestionBank() {
        // 편집 중인 내용(변경 사항)이 있는지 확인합니다.
        if (!this.isDirtyQB) {
            this.doNewQuestionBank();
            return;
        }
        const langData = translations[this.currentLang] || translations['ko'];
        const titleEl = document.getElementById('qb-new-confirm-title');
        const msgEl = document.getElementById('qb-new-confirm-msg');
        const yesBtn = document.getElementById('qb-new-yes-btn');
        const noBtn = document.getElementById('qb-new-no-btn');
        if (titleEl)
            titleEl.textContent = langData.actions['qb-new-confirm-title'] || "Create New?";
        if (msgEl)
            msgEl.textContent = langData.actions['qb-new-confirm-msg'] || "Save before creating new?";
        if (yesBtn)
            yesBtn.textContent = langData.actions['qb-new-yes'] || "Yes";
        if (noBtn)
            noBtn.textContent = langData.actions['qb-new-no'] || "No";
        this.qbPendingAction = () => this.doNewQuestionBank();
        const dialog = document.getElementById('confirm-new-qb-dialog');
        dialog?.showModal();
    }
    initNewQBDialog() {
        const dialog = document.getElementById('confirm-new-qb-dialog');
        const yesBtn = document.getElementById('qb-new-yes-btn');
        const noBtn = document.getElementById('qb-new-no-btn');
        yesBtn?.addEventListener('click', async () => {
            await this.saveAsQuestionBank();
            if (this.qbPendingAction)
                await this.qbPendingAction();
            this.qbPendingAction = null;
            dialog.close();
        });
        noBtn?.addEventListener('click', async () => {
            if (this.qbPendingAction)
                await this.qbPendingAction();
            this.qbPendingAction = null;
            dialog.close();
        });
    }
    initNewSLDialog() {
        const dialog = document.getElementById('confirm-new-sl-dialog');
        const yesBtn = document.getElementById('sl-confirm-new-yes-btn');
        const noBtn = document.getElementById('sl-confirm-new-no-btn');
        yesBtn?.addEventListener('click', async () => {
            await this.saveAsStudentList();
            if (this.slPendingAction)
                await this.slPendingAction();
            this.slPendingAction = null;
            dialog.close();
        });
        noBtn?.addEventListener('click', async () => {
            if (this.slPendingAction)
                await this.slPendingAction();
            this.slPendingAction = null;
            dialog.close();
        });
    }
    doNewQuestionBank() {
        this.question_bank_file_handle = null;
        this.question_bank_file_name = '';
        this.scopeSettings = { start: 1, end: 0, count: 0 };
        this.isDirtyQB = false;
        this.initializeQuestionBankWorkspace(true);
        this.updateMenuActivation();
    }
    async openQuestionBank() {
        if (!this.isDirtyQB) {
            await this.performOpenQuestionBank();
            return;
        }
        const langData = translations[this.currentLang] || translations['ko'];
        const dialog = document.getElementById('confirm-new-qb-dialog');
        const yesBtn = document.getElementById('qb-new-yes-btn');
        const noBtn = document.getElementById('qb-new-no-btn');
        const titleEl = document.getElementById('qb-new-confirm-title');
        const msgEl = document.getElementById('qb-new-confirm-msg');
        if (titleEl)
            titleEl.textContent = langData.actions['qb-new-confirm-title'] || "Create New?";
        if (msgEl)
            msgEl.textContent = langData.actions['qb-new-confirm-msg'] || "Save before creating new?";
        if (yesBtn)
            yesBtn.textContent = langData.actions['qb-new-yes'] || "Yes";
        if (noBtn)
            noBtn.textContent = langData.actions['qb-new-no'] || "No";
        this.qbPendingAction = () => this.performOpenQuestionBank();
        dialog.showModal();
    }
    async performOpenQuestionBank() {
        try {
            const descriptions = {
                ko: 'SQLite 문제은행 데이터베이스',
                en: 'SQLite Question Bank Database',
                ru: 'База данных банка вопросов SQLite',
                ky: 'SQLite суроолор банкынын маалымат базасы'
            };
            const [handle] = await window.showOpenFilePicker({
                types: [{
                        description: descriptions[this.currentLang] || descriptions.en,
                        accept: { 'application/x-sqlite3': ['.qbdb'] }
                    }],
                excludeAcceptAllOption: true,
                multiple: false
            });
            this.question_bank_file_handle = handle;
            this.question_bank_file_name = handle.name;
            const file = await handle.getFile();
            const buffer = await file.arrayBuffer();
            // WASM 엔진에 데이터 전달 (SQLite 형식)
            this.control_tower.set_qbank_from_bytes_in_sqlite(new Uint8Array(buffer));
            this.putQuestionBankToWorkspace();
            this.updateMenuActivation();
        }
        catch (err) {
            if (err.name !== 'AbortError') {
                console.error("문제은행 파일 열기 중 오류 발생:", err);
                const msg = translations[this.currentLang].actions['msg-file-open-error'].replace('{error}', err.message || err);
                alert(msg);
            }
        }
    }
    putQuestionBankToWorkspace() {
        // 1. WASM 엔진으로부터 모든 문제 데이터 추출
        const newData = this.convertQBank2QuestionData();
        // 2. 문제 카드가 데이터 개수에 맞게 자동 조정되도록 questionsData 교체
        // (데이터가 0개면 기본 10개를 유지하거나 비울 수 있으나, 여기서는 로드된 데이터를 우선함)
        if (newData.length > 0) {
            this.questionsData = newData;
        }
        else {
            this.questionsData = [];
        }
        // [수정] 현재 메뉴에 맞는 작업공간 유지 및 리렌더링 (UI가 데이터 길이에 맞게 자동 갱신됨)
        this.isDirtyQB = false;
        if (this.currentMenu === 'exam-setting') {
            this.initializeExamSettingWorkspace();
        }
        else if (this.currentMenu === 'self-study') {
            this.initializeSelfStudyWorkspace();
        }
        else {
            // 문제은행 작업공간인 경우, skipSave=true로 호출하여 방금 로드한 데이터를 보호하며 UI 갱신
            this.initializeQuestionBankWorkspace(false, true);
        }
    }
    convertQBank2QuestionData() {
        const qLen = this.control_tower.get_question_length();
        const newData = [];
        for (let i = 0; i < qLen; i++) {
            const choicesLen = this.control_tower.get_choices_length(i + 1);
            const choices = [];
            for (let j = 0; j < choicesLen; j++) {
                const choiceObj = this.control_tower.get_choice(i + 1, j + 1);
                choices.push({
                    text: choiceObj.get_text(),
                    correct: choiceObj.is_correct()
                });
            }
            newData.push({
                group: this.control_tower.get_group(i + 1).toString(),
                text: this.control_tower.get_question(i + 1),
                choices: choices
            });
        }
        console.log("convertQBank2QuestionData() 호출됨");
        return newData;
    }
    statQuestionBank() { console.log("statQuestionBank() 호출됨"); }
    async saveQuestionBank() {
        if (!this.question_bank_file_handle) {
            await this.saveAsQuestionBank();
            return;
        }
        await this.performQuestionBankSave(this.question_bank_file_handle);
    }
    async saveAsQuestionBank() {
        try {
            const descriptions = {
                ko: 'SQLite 문제은행 데이터베이스',
                en: 'SQLite Question Bank Database',
                ru: 'База данных банка вопросов SQLite',
                ky: 'SQLite суроолор банкынын маалымат базасы'
            };
            const handle = await window.showSaveFilePicker({
                suggestedName: this.question_bank_file_name || 'untitled.qbdb',
                types: [{
                        description: descriptions[this.currentLang] || descriptions.en,
                        accept: { 'application/x-sqlite3': ['.qbdb'] }
                    }]
            });
            this.question_bank_file_handle = handle;
            this.question_bank_file_name = handle.name;
            await this.performQuestionBankSave(handle);
            this.initializeQuestionBankWorkspace(false, true); // 제목 갱신 (파일 이름 표시용)
        }
        catch (err) {
            if (err.name !== 'AbortError') {
                console.error("다른 이름으로 저장 중 오류:", err);
                const msg = translations[this.currentLang].actions['msg-file-save-error'].replace('{error}', err.message || err);
                alert(msg);
            }
        }
    }
    async performQuestionBankSave(handle) {
        try {
            // 1. WASM ControlTower 데이터 갱신 - 현재 화면의 입력값들을 questionsData 배열에 저장하고, 이를 WASM 엔진에 반영
            this.extractQuestionDataFromWorkspace();
            // 2. WASM 엔진으로부터 SQLite 포맷의 바이트 열 추출
            const bytes = this.control_tower.write_qbank_to_bytes_in_sqlite();
            // 3. 파일 시스템 writable을 사용하여 데이터 저장
            const writable = await handle.createWritable();
            await writable.write(bytes);
            await writable.close();
            this.isDirtyQB = false;
            console.log("문제은행 저장 완료:", this.question_bank_file_name);
            // const successMsg = this.currentLang === 'ko' ? "성공적으로 저장되었습니다." : (this.currentLang === 'ky' ? "Ийгиликтүү сакталды." : "Saved successfully.");
            // alert(successMsg);
        }
        catch (err) {
            console.error("저장 처리 중 오류 발생:", err);
            throw err;
        }
    }
    /** 현재 questionsData 배열의 내용을 WASM 엔진(ControlTower)에 동기화합니다. */
    syncQuestionsToWasm() {
        // WASM ControlTower 데이터 갱신
        let oldQLen = this.control_tower.get_question_length();
        if (oldQLen === 0) {
            this.control_tower.push_an_empty_question();
            oldQLen = 1;
        }
        const newQLen = this.questionsData.length;
        // 문제 데이터 업데이트 및 추가
        for (let i = 0; i < newQLen; i++) {
            const q = this.questionsData[i];
            if (!q)
                continue; // TS18048 방지
            const qIdx = i + 1; // 1-based index
            if (i < oldQLen) {
                // 기존 문제 업데이트
                this.control_tower.set_question(qIdx, q.text);
                this.control_tower.set_group(qIdx, parseInt(q.group) || 0);
            }
            else {
                // 새 문제 추가
                this.control_tower.push_an_empty_question();
                this.control_tower.set_question(qIdx, q.text);
                this.control_tower.set_group(qIdx, parseInt(q.group) || 0);
            }
            // 선택지 처리
            const oldCLen = this.control_tower.get_choices_length(qIdx);
            const newCLen = q.choices.length;
            for (let j = 0; j < newCLen; j++) {
                const c = q.choices[j];
                if (!c)
                    continue; // TS18048 방지
                const cIdx = j + 1;
                const choiceMark = new ChoiceMark(c.text, c.correct);
                if (j < oldCLen) {
                    this.control_tower.set_choice(qIdx, cIdx, choiceMark);
                }
                else {
                    this.control_tower.push_choice(qIdx, c.text, c.correct);
                }
            }
        }
        // 남는 문제 삭제 (뒤에서부터 삭제)
        if (oldQLen > newQLen) {
            for (let i = oldQLen; i > newQLen; i--) {
                this.control_tower.remove_question(i);
            }
        }
        // 모든 문제에 대해 카테고리 재결정
        for (let i = 0; i < newQLen; i++) {
            this.control_tower.determine_category(i + 1);
        }
    }
    extractQuestionDataFromWorkspace() {
        // 현재 화면의 데이터를 상태로 추출
        if (this.currentMenu === 'header-edit') {
            this.saveCurrentHeaderToState();
        }
        else if (this.currentMenu === 'question-bank') {
            this.saveCurrentQuestionsToState();
        }
        this.syncQuestionsToWasm();
    }
    optimizeQuestionBank() {
        // 1. 현재 화면 데이터 저장
        if (this.currentMenu === 'question-bank') {
            this.saveCurrentQuestionsToState();
        }
        else if (this.currentMenu === 'header-edit') {
            this.saveCurrentHeaderToState();
        }
        // 2. 비어 있는 문제 필터링 (본문과 모든 선택지가 비어 있는 경우 제거)
        this.questionsData = this.questionsData.filter(q => q.text.trim().length > 0 || q.choices.some(c => c.text.trim().length > 0));
        // 3. 만약 모든 데이터가 비어 있다면 빈 카드 하나만 남김
        if (this.questionsData.length === 0) {
            this.questionsData = [{
                    group: '1',
                    text: '',
                    choices: Array.from({ length: 4 }, () => ({ text: '', correct: false }))
                }];
        }
        // 4. WASM 엔진 데이터 갱신
        this.syncQuestionsToWasm();
        // 5. WASM 엔진 최적화
        this.control_tower.optimize_qbank();
        // 6. 결과 반영 (WASM에서 다시 읽어와서 UI 갱신)
        this.putQuestionBankToWorkspace();
    }
    /* 학생 명단 관련 함수군 */
    newStudentList() {
        if (!this.isDirtySL) {
            this.doNewStudentList();
            return;
        }
        const langData = translations[this.currentLang] || translations['ko'];
        const dialog = document.getElementById('confirm-new-sl-dialog');
        const yesBtn = document.getElementById('sl-confirm-new-yes-btn');
        const noBtn = document.getElementById('sl-confirm-new-no-btn');
        const titleEl = document.getElementById('sl-confirm-new-title');
        const msgEl = document.getElementById('sl-confirm-new-msg');
        if (titleEl)
            titleEl.textContent = langData.actions['sl-confirm-new-title'];
        if (msgEl)
            msgEl.textContent = langData.actions['sl-confirm-new-msg'];
        if (yesBtn)
            yesBtn.textContent = langData.actions['sl-confirm-new-yes'];
        if (noBtn)
            noBtn.textContent = langData.actions['sl-confirm-new-no'];
        this.slPendingAction = () => this.doNewStudentList();
        dialog.showModal();
    }
    doNewStudentList() {
        this.student_list_file_name = '';
        this.student_list_handle = null;
        this.isDirtySL = false;
        this.initializeStudentListWorkspace(true);
    }
    async openStudentList() {
        if (!this.isDirtySL) {
            await this.performOpenStudentList();
            return;
        }
        const langData = translations[this.currentLang] || translations['ko'];
        const dialog = document.getElementById('confirm-new-sl-dialog');
        const yesBtn = document.getElementById('sl-confirm-new-yes-btn');
        const noBtn = document.getElementById('sl-confirm-new-no-btn');
        const titleEl = document.getElementById('sl-confirm-new-title');
        const msgEl = document.getElementById('sl-confirm-new-msg');
        if (titleEl)
            titleEl.textContent = langData.actions['sl-confirm-new-title'];
        if (msgEl)
            msgEl.textContent = langData.actions['sl-confirm-new-msg'];
        if (yesBtn)
            yesBtn.textContent = langData.actions['sl-confirm-new-yes'];
        if (noBtn)
            noBtn.textContent = langData.actions['sl-confirm-new-no'];
        this.slPendingAction = () => this.performOpenStudentList();
        dialog.showModal();
    }
    async performOpenStudentList() {
        try {
            const descriptions = {
                ko: 'SQLite 학생 명단 데이터베이스',
                en: 'SQLite Student List Database',
                ru: 'База данных списка студентов SQLite',
                ky: 'SQLite студенттер тизмесинин маалымат базасы'
            };
            const [handle] = await window.showOpenFilePicker({
                types: [{
                        description: descriptions[this.currentLang] || descriptions.en,
                        accept: { 'application/x-sqlite3': ['.sbdb'] }
                    }],
                excludeAcceptAllOption: true,
                multiple: false
            });
            this.student_list_handle = handle;
            this.student_list_file_name = handle.name;
            const file = await handle.getFile();
            const buffer = await file.arrayBuffer();
            this.control_tower.set_sbank_from_bytes_in_sqlite(new Uint8Array(buffer));
            const sLen = this.control_tower.get_student_length();
            const newData = [];
            for (let i = 0; i < sLen; i++) {
                const nameIdObj = this.control_tower.get_student(i + 1);
                newData.push({
                    fullName: nameIdObj.get_name(),
                    studentId: nameIdObj.get_id(),
                    selected: false
                });
            }
            this.studentsData = newData;
            this.isDirtySL = false;
            if (this.currentMenu === 'exam-setting') {
                this.initializeExamSettingWorkspace();
            }
            else {
                this.initializeStudentListWorkspace(false, true);
            }
        }
        catch (err) {
            if (err.name !== 'AbortError') {
                console.error("파일 접근 오류:", err);
            }
        }
    }
    optimizeStudentList() {
        // 1. 현재 화면의 모든 입력 내용을 먼저 배열에 저장
        this.saveCurrentStudentsToState();
        // 2. 비어 있는 학생 필터링 (성명과 학번이 모두 비어 있는 경우 제거)
        this.studentsData = this.studentsData.filter(s => s.fullName.trim().length > 0 || s.studentId.trim().length > 0);
        // 3. 만약 모든 데이터가 비어 있다면 빈 카드 하나만 남김
        if (this.studentsData.length === 0) {
            this.studentsData = [{ fullName: '', studentId: '', selected: false }];
        }
        // 4. WASM 엔진 데이터 갱신
        this.syncStudentsToWasm();
        // 5. UI 갱신 및 상태 변경
        this.isDirtySL = true;
        this.initializeStudentListWorkspace(false, true);
    }
    /** 현재 studentsData 배열의 내용을 WASM 엔진(ControlTower)에 동기화합니다. */
    syncStudentsToWasm() {
        let oldLen = this.control_tower.get_student_length();
        if (oldLen === 0) {
            this.control_tower.push_an_empty_student();
            oldLen = 1;
        }
        const newLen = this.studentsData.length;
        for (let i = 0; i < newLen; i++) {
            const s = this.studentsData[i];
            if (!s) {
                continue;
            }
            const nameId = new NameId(s.fullName, s.studentId);
            if (i < oldLen) {
                this.control_tower.set_student(i + 1, nameId);
            }
            else {
                this.control_tower.push_student(nameId);
            }
        }
        if (oldLen > newLen) {
            for (let i = oldLen; i > newLen; i--) {
                this.control_tower.remove_student(i);
            }
        }
    }
    async saveStudentList() {
        // 1. 현재 화면의 모든 입력 내용을 먼저 배열에 저장
        this.saveCurrentStudentsToState();
        // 2. WASM ControlTower 데이터 갱신
        this.syncStudentsToWasm();
        // 3. 파일로 저장
        try {
            const bytes = this.control_tower.write_sbank_to_bytes_in_sqlite();
            if (this.student_list_handle) {
                const writable = await this.student_list_handle.createWritable();
                await writable.write(bytes);
                await writable.close();
                this.isDirtySL = false;
                // alert(this.currentLang === 'ko' ? "파일이 성공적으로 저장되었습니다." : (this.currentLang === 'ky' ? "Файл ийгиликтүү сакталды." : "File saved successfully."));
            }
            else {
                // 핸들이 없으면 다른 이름으로 저장 호출
                await this.saveAsStudentList();
            }
        }
        catch (err) {
            console.error("학생 명단 저장 중 오류 발생:", err);
            const msg = translations[this.currentLang].actions['msg-file-save-error'].replace('{error}', err.message || err);
            alert(msg);
        }
        console.log("학생 명단 데이터가 WASM 엔진 및 파일에 성공적으로 저장되었습니다.");
        // this.initializeStudentListWorkspace(); 
    }
    async saveAsStudentList() {
        try {
            const descriptions = {
                ko: 'SQLite 학생 명단 데이터베이스',
                en: 'SQLite Student List Database',
                ru: 'База данных списка студентов SQLite',
                ky: 'SQLite студенттер тизмесинин маалымат базасы'
            };
            const handle = await window.showSaveFilePicker({
                suggestedName: this.student_list_file_name || 'untitled.sbdb',
                types: [{
                        description: descriptions[this.currentLang] || descriptions.en,
                        accept: { 'application/x-sqlite3': ['.sbdb'] }
                    }]
            });
            this.student_list_handle = handle;
            this.student_list_file_name = handle.name;
            // 데이터 수집 후 저장 실행
            await this.saveStudentList();
        }
        catch (err) {
            if (err.name !== 'AbortError') {
                console.error("다른 이름으로 저장 중 오류 발생:", err);
            }
        }
        this.initializeStudentListWorkspace();
    }
    /* 시험 및 학습 관련 함수군 */
    /** 시스템 저장 대화상자를 호출하여 시험지를 저장합니다. */
    async saveExamPaper() {
        try {
            this.generate_seeds();
            this.handle = await window.showSaveFilePicker({
                id: 'save-exam-paper', // 브라우저가 이 ID를 기반으로 대화상자 위치/설정 기억
                suggestedName: 'exam_paper',
                types: [
                    { description: 'MS Word Document', accept: { 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] } },
                    { description: 'Text File', accept: { 'text/plain': ['.txt'] } },
                    { description: 'PDF Document', accept: { 'application/pdf': ['.pdf'] } }
                ]
            });
            // 파일명에서 확장자 추출 (예: 'file.docx' -> 'docx')
            this.doctype = this.handle.name.split('.').pop()?.toLowerCase() || '';
            /////////////////////////////
            // switch (this.handle.getFile().type)
            // {
            // case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': this.doctype = '.docx';   break;
            // case 'text/plain':          this.doctype = '.txt';   break;
            // case 'application/pdf':     this.doctype = '.pdf';   break;
            // }
            // alert(this.handle.getFile().type);
            console.log("시험지 저장 설정 완료 - 핸들:", this.handle, "형식:", this.doctype);
            switch (this.doctype) {
                case 'docx':
                    await this.saveExamPaperAsDocx();
                    break;
                case 'txt':
                    await this.saveExamPaperAsTxt();
                    break;
                case 'pdf':
                    await this.saveExamPaperAsPdf();
                    break;
                default: {
                    const msg = translations[this.currentLang].actions['msg-unsupported-file-format'];
                    alert(msg);
                }
            }
        }
        catch (err) {
            if (err.name !== 'AbortError') {
                console.error("시험지 저장 중 오류:", err);
                const msg = translations[this.currentLang].actions['msg-file-save-error'].replace('{error}', err.message || err);
                alert(msg);
            }
        }
    }
    async saveExamPaperAsDocx() {
        const bytes = this.control_tower.generate_exam_in_docx(this.scopeSettings.start, this.scopeSettings.end, this.scopeSettings.count, this.random_seeds);
        this.saveFile(bytes);
    }
    async saveExamPaperAsTxt() {
        const bytes = this.control_tower.generate_exam_in_txt(this.scopeSettings.start, this.scopeSettings.end, this.scopeSettings.count, this.random_seeds);
        this.saveFile(bytes);
    }
    async saveExamPaperAsPdf() {
    }
    async saveFile(bytes) {
        const writable = await this.handle.createWritable();
        await writable.write(bytes);
        await writable.close();
    }
    async generate_seeds() {
        // 암호학적으로 안전한 난수로 채우기
        // crypto.getRandomValues는 배열을 직접 수정하고 반환함
        crypto.getRandomValues(this.random_seeds);
        console.log("TS에서 생성된 난수:", this.random_seeds);
    }
    setGradingMethod() { console.log("setGradingMethod() 호출됨"); }
    startSelfstudy() { console.log("startSelfstudy() 호출됨"); }
    /* 설정 관련 함수군 */
    setQuestionBankDefaultPath() { console.log("setQuestionBankDefaultPath() 호출됨"); }
    setStudentListDefaultPath() { console.log("setStudentListDefaultPath() 호출됨"); }
    /** 테마 설정 대화상자를 엽니다. */
    setTheme() {
        const dialog = document.getElementById('theme-dialog');
        if (!dialog)
            return;
        // 현재 테마 라디오 버튼 선택 상태로 만들기
        const currentRadio = dialog.querySelector(`input[value="${this.currentTheme}"]`);
        if (currentRadio) {
            currentRadio.checked = true;
        }
        dialog.showModal();
    }
    setFonts() { console.log("setFonts() 호출됨"); }
    /** 언어 설정 대화상자를 엽니다. */
    setLanguage() {
        const dialog = document.getElementById('lang-dialog');
        const group = dialog.querySelector('.radio-group');
        if (!dialog || !group)
            return;
        // 언어 목록 정의
        const langs = [
            { value: 'ko', label: '한국어 (Korean)' },
            { value: 'en', label: 'English' },
            { value: 'ru', label: 'Русский (Russian)' },
            { value: 'ky', label: 'Кыргызча (Kyrgyz)' }
        ];
        // 브라우저 언어(envLang)를 기준으로 우선순위 언어 결정
        let priorityLang = 'en';
        if (this.envLang.startsWith('ko'))
            priorityLang = 'ko';
        else if (this.envLang.startsWith('ru'))
            priorityLang = 'ru';
        else if (this.envLang.startsWith('ky'))
            priorityLang = 'ky';
        // 우선순위 언어를 맨 앞으로 정렬
        langs.sort((a, b) => {
            if (a.value === priorityLang)
                return -1;
            if (b.value === priorityLang)
                return 1;
            return 0;
        });
        // 라디오 그룹 동적 생성
        group.innerHTML = '';
        langs.forEach(lang => {
            const label = document.createElement('label');
            label.innerHTML = `<input type="radio" name="lang" value="${lang.value}" ${this.currentLang === lang.value ? 'checked' : ''}> ${lang.label}`;
            group.appendChild(label);
        });
        dialog.showModal();
    }
    /* 정보 관련 함수군 */
    help() { console.log("help() 호출됨"); }
    showSoftwareInfo() { console.log("showSoftwareInfo() 호출됨"); }
    /** 저작권 정보 대화상자 초기화 */
    initCopyrightDialog() {
        const dialog = document.getElementById('in-info-copy-dialog');
        const confirmBtn = document.getElementById('in-info-copy-confirm-btn');
        confirmBtn?.addEventListener('click', () => {
            dialog.close();
        });
    }
    /** 저작권 정보를 보여줍니다. */
    showCopyright() {
        const dialog = document.getElementById('in-info-copy-dialog');
        const titleEl = document.getElementById('in-info-copy-title');
        const msgEl = document.getElementById('in-info-copy-msg');
        if (!dialog || !titleEl || !msgEl) {
            return;
        }
        const langData = translations[this.currentLang] || translations['ko'];
        titleEl.textContent = langData.actions['in-info-copy'];
        // 이미지와 텍스트를 함께 표시하도록 HTML 구조 변경
        msgEl.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px; justify-content: center;">
                <img src="author.jpg" alt="Author" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;">
                <p style="margin: 0;">${langData.actions['in-info-copy-text']}</p>
            </div>
        `;
        msgEl.style.whiteSpace = 'pre-line';
        dialog.showModal();
    }
    /** 라이센스 정보 대화상자 초기화 */
    initLicenseDialog() {
        const dialog = document.getElementById('in-info-license-dialog');
        const confirmBtn = document.getElementById('in-info-license-confirm-btn');
        confirmBtn?.addEventListener('click', () => {
            dialog.close();
        });
    }
    /** 라이센스 정보를 보여줍니다. */
    showLicense() {
        const dialog = document.getElementById('in-info-license-dialog');
        const titleEl = document.getElementById('in-info-license-title');
        const msgEl = document.getElementById('in-info-license-msg');
        if (!dialog || !titleEl || !msgEl) {
            return;
        }
        const langData = translations[this.currentLang] || translations['ko'];
        titleEl.textContent = langData.actions['in-info-license'];
        msgEl.innerText = langData.actions['in-info-license-text'];
        msgEl.style.whiteSpace = 'pre-line';
        dialog.showModal();
    }
    /**
     * 화면 전환 시 제목 및 기본 구조 렌더링
     */
    renderView(menu) {
        if (!this.container)
            return;
        // 현재 선택된 메뉴 강조 업데이트
        this.updateActiveMenu(menu);
        // 1. 현재 메뉴에서 다른 메뉴로 넘어가기 전, 현재 편집 중인 내용을 상태에 저장 (데이터 보존)
        if (this.currentMenu === 'question-bank') {
            this.saveCurrentQuestionsToState();
        }
        else if (this.currentMenu === 'header-edit') {
            this.saveCurrentHeaderToState();
        }
        else if (this.currentMenu === 'student-list') {
            this.saveCurrentStudentsToState();
        }
        else if (this.currentMenu === 'self-study') {
            this.saveStudyState();
        }
        // 2. 새 메뉴로 전환
        this.currentMenu = menu;
        // [추가] 설정/정보가 아닌 '작업공간' 메뉴인 경우 lastWorkspace 업데이트
        if (menu !== 'settings' && menu !== 'information') {
            this.lastWorkspace = menu;
        }
        if (menu === 'header-edit') {
            this.initializeHeaderEditWorkspace();
            return;
        }
        if (menu === 'question-bank') {
            this.initializeQuestionBankWorkspace(false, true);
            return;
        }
        if (menu === 'exam-setting') {
            this.initializeExamSettingWorkspace();
            return;
        }
        if (menu === 'student-list') {
            this.initializeStudentListWorkspace(false, true);
            return;
        }
        if (menu === 'self-study') {
            this.initializeSelfStudyWorkspace();
            return;
        }
        const langData = translations[this.currentLang];
        const title = langData.menus[menu] || menu;
        this.container.innerHTML = `
            <div class="view-header">
                <h2>${title}</h2>
            </div>
            <div class="view-content">
                <p>${title} 섹션입니다. 하위 메뉴를 통해 기능을 선택하세요.</p>
            </div>
        `;
    }
    refreshCurrentViewTitle() {
        const titleEl = this.container?.querySelector('h2');
        if (titleEl && this.currentMenu) {
            titleEl.textContent = translations[this.currentLang].menus[this.currentMenu];
        }
    }
}
window.addEventListener('DOMContentLoaded', () => new QuizWizardApp());
