import { translations } from './i18n.js';
import init, { ControlTower } from './pkg/qrate_wasm.js';
class QuizWizardApp {
    control_tower;
    container;
    currentTheme = 'theme-desktop';
    currentLang = 'ko';
    currentMenu = ''; // [추가] 선택된 문제은행 파일의 경로를 저장할 필드
    question_bank_file_name = '';
    student_list_file_name = '';
    // 편집 중인 문제 데이터를 저장하는 배열
    questionsData = [];
    // 편집 중인 학생 명단 데이터를 저장하는 배열
    studentsData = [];
    // 자기주도학습에서 현재 표시 중인 문제 인덱스 (0-based)
    currentQuestionIndex = 0;
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
        this.currentTheme = data.theme || 'theme-desktop';
        this.currentLang = data.lang || 'ko';
        document.body.className = this.currentTheme;
        this.updateUILanguage();
        this.bindEvents();
        this.initLanguageDialog(); // 대화상자 이벤트 초기화
        this.initThemeDialog(); // 테마 대화상자 이벤트 초기화
        this.initSubmitDialog(); // 제출 확인 대화상자 이벤트 초기화
        // 앱 시작 시 문제은행 편집 작업영역으로 시작
        this.initializeQuestionBankWorkspace();
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
        alert("답안지가 성공적으로 제출되었습니다!");
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
        });
        cancelBtn.addEventListener('click', () => {
            dialog.close();
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
        });
        cancelBtn.addEventListener('click', () => {
            dialog.close();
        });
    }
    /**
     * i18n 데이터를 기반으로 모든 HTML 요소의 텍스트 갱신
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
    /** 학생 명단 작업공간 초기화 */
    initializeStudentListWorkspace(forceReset = false) {
        if (!this.container)
            return;
        // 다른 메뉴에서 돌아오는 경우 현재 UI 데이터 저장
        if (this.currentMenu === 'student-list' && !forceReset) {
            this.saveCurrentStudentsToState();
        }
        else if (this.currentMenu === 'question-bank') {
            this.saveCurrentQuestionsToState();
        }
        this.currentMenu = 'student-list';
        // 초기화 또는 데이터가 없는 경우 10명의 빈 학생 생성
        if (forceReset || this.studentsData.length === 0) {
            this.studentsData = Array.from({ length: 10 }, () => ({
                firstName: '', patronymic: '', lastName: '', studentId: '', selected: false
            }));
            if (forceReset)
                this.student_list_file_name = '';
        }
        const langData = translations[this.currentLang] || translations['ko'];
        const title = langData.actions['sl-editing'] || 'Editing Student List';
        const addBtnText = this.currentLang === 'ko' ? "+ 학생 추가" : (this.currentLang === 'ru' ? "+ Добавить студента" : "+ Add Student");
        // 파일 이름 표시용 HTML 추가
        const fileInfoHtml = this.student_list_file_name
            ? `<span style="font-size: 12px; color: var(--active-text); margin-left: 15px; font-weight: normal;">[ ${this.student_list_file_name} ]</span>`
            : '';
        // 헤더 영역
        let html = `
            <div class="view-header">
                <h2>${title}${fileInfoHtml}</h2>
                <div class="view-actions">
                    <button id="add-student-btn">${addBtnText}</button>
                </div>
            </div>
            <div class="question-list-container" id="student-list-container">
        `;
        // 학생 리스트 생성
        this.studentsData.forEach((s) => {
            html += this.createStudentItemHtml(s);
        });
        html += `</div>`;
        this.container.innerHTML = html;
        // 학생 추가 버튼 이벤트
        document.getElementById('add-student-btn')?.addEventListener('click', () => {
            this.addNewStudent();
        });
        // 현재 선택된 메뉴 강조 업데이트
        document.querySelectorAll('.menu-item').forEach(btn => {
            if (btn.dataset.menu === 'student-list') {
                btn.classList.add('active');
            }
            else {
                btn.classList.remove('active');
            }
        });
    }
    /** 하나의 학생 항목 HTML 생성 */
    createStudentItemHtml(data) {
        const langData = translations[this.currentLang];
        return `
            <div class="student-item">
                <input type="checkbox" class="choice-check" ${data.selected ? 'checked' : ''}>
                <div class="sl-label">${langData.actions['sl-first-name']}</div>
                <input type="text" class="sl-input sl-fn" value="${data.firstName}">
                <div class="sl-label">${langData.actions['sl-patronymic']}</div>
                <input type="text" class="sl-input sl-pa" value="${data.patronymic}">
                <div class="sl-label">${langData.actions['sl-last-name']}</div>
                <input type="text" class="sl-input sl-ln" value="${data.lastName}">
                <div class="sl-label">${langData.actions['sl-id']}</div>
                <input type="text" class="sl-input sl-id" value="${data.studentId}">
            </div>
        `;
    }
    /** 새로운 학생 추가 */
    addNewStudent() {
        this.saveCurrentStudentsToState();
        const newStudent = { firstName: '', patronymic: '', lastName: '', studentId: '', selected: false };
        this.studentsData.push(newStudent);
        const container = document.getElementById('student-list-container');
        if (container) {
            const div = document.createElement('div');
            div.innerHTML = this.createStudentItemHtml(newStudent);
            const el = div.firstElementChild;
            container.appendChild(el);
            el.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }
    /** 현재 학생 명단 데이터 저장 */
    saveCurrentStudentsToState() {
        const container = document.getElementById('student-list-container');
        if (!container)
            return;
        const newData = [];
        container.querySelectorAll('.student-item').forEach(item => {
            const fnInput = item.querySelector('.sl-fn');
            const paInput = item.querySelector('.sl-pa');
            const lnInput = item.querySelector('.sl-ln');
            const idInput = item.querySelector('.sl-id');
            const check = item.querySelector('.choice-check');
            if (fnInput && paInput && lnInput && idInput && check) {
                newData.push({
                    selected: check.checked,
                    firstName: fnInput.value,
                    patronymic: paInput.value,
                    lastName: lnInput.value,
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
        const langData = translations[this.currentLang] || translations['ko'];
        const title = langData.actions['ss-viewing'] || 'Taking an Exam';
        const submitBtnText = langData.actions['ss-submit-paper'] || 'Submit';
        const prevBtnText = langData.actions['ss-prev-question'] || '<-';
        const nextBtnText = langData.actions['ss-next-question'] || '->';
        // 컨테이너 레이아웃 (메인 뷰 + 사이드바)
        this.container.innerHTML = `
            <div class="ss-container">
                <div class="ss-main-view">
                    <div class="view-header">
                        <h2>${title}</h2>
                        <div class="ss-nav-controls">
                            <button class="ss-nav-btn" id="ss-prev-btn">${prevBtnText}</button>
                            <button class="ss-nav-btn" id="ss-next-btn">${nextBtnText}</button>
                        </div>
                        <div class="view-actions">
                            <button id="ss-submit-btn">${submitBtnText}</button>
                        </div>
                    </div>
                    <div class="question-list-container" id="ss-card-container">
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
        // 메뉴 강조
        document.querySelectorAll('.menu-item').forEach(btn => {
            if (btn.dataset.menu === 'self-study') {
                btn.classList.add('active');
            }
            else {
                btn.classList.remove('active');
            }
        });
    }
    /** 현재 인덱스의 문제를 카드 영역에 렌더링 */
    renderCurrentQuestion() {
        const container = document.getElementById('ss-card-container');
        if (!container)
            return;
        const q = this.questionsData[this.currentQuestionIndex];
        // [수정] readOnly=true (에디터 비활성), hideGroup=true, checkDisabled=false (체크박스 활성)
        container.innerHTML = this.createQuestionItemHtml(this.currentQuestionIndex + 1, q, true, true, false);
    }
    /** 사이드바에 모든 문제 번호 버튼 렌더링 */
    renderSidebarButtons() {
        const sidebar = document.getElementById('ss-sidebar');
        if (!sidebar)
            return;
        let html = '';
        this.questionsData.forEach((_, i) => {
            const isActive = i === this.currentQuestionIndex ? 'active' : '';
            html += `<button class="ss-sidebar-btn ${isActive}" data-idx="${i}">${i + 1}</button>`;
        });
        sidebar.innerHTML = html;
        // 사이드바 버튼 클릭 이벤트
        sidebar.querySelectorAll('.ss-sidebar-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.target.dataset.idx || '0');
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
    /** 화면의 입력값을 현재 문제 상태에 저장 */
    saveStudyState() {
        const item = document.querySelector('.question-item');
        if (!item)
            return;
        const groupInput = item.querySelector('.q-group-input');
        const textArea = item.querySelector('.q-text-area');
        if (!groupInput || !textArea)
            return;
        const choices = [];
        item.querySelectorAll('.choice-row').forEach(row => {
            const check = row.querySelector('.choice-check');
            const input = row.querySelector('.choice-input');
            if (check && input) {
                choices.push({ text: input.value, correct: check.checked });
            }
        });
        if (this.questionsData[this.currentQuestionIndex]) {
            this.questionsData[this.currentQuestionIndex] = {
                group: groupInput.value,
                text: textArea.value,
                choices: choices
            };
        }
    }
    refreshStudyView() {
        this.renderCurrentQuestion();
        this.renderSidebarButtons();
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
        const submitMsg = document.getElementById('submit-dialog-msg');
        if (submitMsg) {
            const msgs = {
                ko: "정말로 답안지를 제출하시겠습니까? 제출 후에는 수정할 수 없습니다.",
                en: "Are you sure you want to submit your answers? You cannot edit them after submission.",
                ru: "Вы уверены, что хотите сдать ответы? После сдачи редактирование будет невозможно."
            };
            submitMsg.textContent = msgs[this.currentLang] || msgs.en;
        }
        // 라디오 버튼 라벨 갱신 (언어)
        const fixedLangLabels = ["한국어", "English", "Русский"];
        // 테마 목록은 현재 언어 설정을 따름
        const themeLabels = {
            ko: ["데스크탑 앱 스타일", "웹 스타일"],
            en: ["Desktop App Style", "Web Style"],
            ru: ["Стиль рабочего стола", "Веб-стиль"]
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
            ru: { ok: "OK", cancel: "Отмена" }
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
                menuButtons.forEach(b => b.classList.remove('active'));
                target.classList.add('active');
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
        switch (action) {
            /* --- Question Bank (문제은행) --- */
            case 'qb-new':
                this.newQuestionBank();
                break;
            case 'qb-open':
                this.openQuestionBank();
                break; // 추가됨
            case 'qb-edit':
                this.editQuestionBank();
                break; // 추가됨
            case 'qb-save':
                this.saveQuestionBank();
                break; // 추가됨
            case 'qb-save-as':
                this.saveAsQuestionBank();
                break; // 추가됨
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
            case 'ex-change-scope':
                this.setExamScope();
                this.initializeExamSettingWorkspace();
                break;
            case 'ex-save-paper':
                this.saveExamPaper();
                this.initializeExamSettingWorkspace();
                break;
            /* --- Student List (학생 명단) --- */
            case 'sl-open':
                this.openStudentList();
                break;
            case 'sl-edit':
                this.editStudentList();
                this.initializeStudentListWorkspace();
                break;
            case 'sl-save':
                this.saveStudentList();
                this.initializeStudentListWorkspace();
                break;
            case 'sl-save-as':
                this.saveAsStudentList();
                this.initializeStudentListWorkspace();
                break;
            /* --- Self-study (자기 주도 학습) --- */
            case 'ss-load-bank':
                this.openQuestionBank();
                break; // 추가됨 (공용 함수 사용)
            case 'ss-change-scope':
                this.setExamScope();
                break; // 추가됨
            case 'ss-change-grading':
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
            default:
                console.warn(`No handler defined for action: ${action}`);
        }
    }
    /** 문제은행 작업공간 초기화
     * @param forceReset true이면 모든 내용을 비우고 초기화합니다.
     * @param skipSave true이면 현재 화면 데이터를 배열에 저장하지 않고 렌더링만 합니다.
     */
    initializeQuestionBankWorkspace(forceReset = false, skipSave = false) {
        if (!this.container)
            return;
        // [수정] skipSave가 아닐 때만 현재 데이터를 저장합니다.
        // addNewQuestion 등에서 데이터를 수동으로 조작한 후에는 저장하지 않아야 합니다.
        if (this.currentMenu === 'question-bank' && !forceReset && !skipSave) {
            this.saveCurrentQuestionsToState();
        }
        this.currentMenu = 'question-bank';
        // forceReset이거나 데이터가 아예 없는 경우 10개의 빈 문제로 초기화
        if (forceReset || this.questionsData.length === 0) {
            this.questionsData = Array.from({ length: 10 }, (_, idx) => ({
                group: (idx + 1).toString(), // 그룹에는 문제 번호 자동 입력
                text: '', // 문제는 비워둠
                choices: Array.from({ length: 4 }, () => ({ text: '', correct: false }))
            }));
            if (forceReset)
                this.question_bank_file_name = ''; // 새 파일이므로 이름 초기화
        }
        const langData = translations[this.currentLang] || translations['ko'];
        const title = langData.actions['qb-editing'] || 'Editing';
        const addBtnText = this.currentLang === 'ko' ? "+ 문제 추가" : (this.currentLang === 'ru' ? "+ Добавить вопрос" : "+ Add Question");
        const fileInfoHtml = this.question_bank_file_name
            ? `<span style="font-size: 12px; color: var(--active-text); margin-left: 15px; font-weight: normal;">[ ${this.question_bank_file_name} ]</span>`
            : '';
        let html = `
            <div class="view-header">
                <h2>${title}${fileInfoHtml}</h2>
                <div class="view-actions">
                    <button id="add-question-btn">${addBtnText}</button>
                </div>
            </div>
            <div class="question-list-container" id="question-list">
        `;
        this.questionsData.forEach((q, i) => {
            html += this.createQuestionItemHtml(i + 1, q);
        });
        html += `</div>`;
        this.container.innerHTML = html;
        // 문제 추가 버튼 이벤트 바인딩 (기존 리스너 제거 효과를 위해 새로 생성)
        const addBtn = document.getElementById('add-question-btn');
        if (addBtn) {
            addBtn.addEventListener('click', () => this.addNewQuestion());
        }
        // 현재 선택된 메뉴 강조 업데이트
        document.querySelectorAll('.menu-item').forEach(btn => {
            const m = btn.dataset.menu;
            if (m === 'question-bank') {
                btn.classList.add('active');
            }
            else {
                btn.classList.remove('active');
            }
        });
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
        // 4. 리스트 컨테이너에 새 항목만 추가 (전체 리렌더링 방지)
        const list = document.getElementById('question-list');
        if (list) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = this.createQuestionItemHtml(nextIndex, newQuestion);
            const newElement = tempDiv.firstElementChild;
            list.appendChild(newElement);
            // 5. 새 문제로 부드럽게 스크롤
            newElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
            // 새 문제의 텍스트 영역에 자동 포커스 (편의 기능)
            setTimeout(() => {
                newElement.querySelector('.q-text-area')?.focus();
            }, 300);
        }
    }
    /** 현재 화면의 입력값들을 questionsData 배열에 저장합니다. */
    saveCurrentQuestionsToState() {
        const list = document.getElementById('question-list');
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
    createQuestionItemHtml(index, data, readOnly = false, hideGroup = false, checkDisabled = true) {
        const group = data?.group || '';
        const text = data?.text || '';
        const disabled = readOnly ? 'disabled' : '';
        const chkDisabled = checkDisabled ? 'disabled' : '';
        const readonlyAttr = readOnly ? 'readonly' : '';
        const groupHtml = hideGroup ? '' : `<input type="text" class="q-group-input" maxlength="3" placeholder="Grp" value="${group}" ${readonlyAttr} ${disabled}>`;
        return `
            <div class="question-item ${readOnly ? 'readonly-mode' : ''}" data-index="${index}">
                <div class="q-main-row">
                    <div class="q-number">${index}.</div>
                    ${groupHtml}
                    <textarea class="q-text-area" placeholder="문제를 입력하세요..." ${readonlyAttr} ${disabled}>${text}</textarea>
                </div>
                ${[0, 1, 2, 3].map(i => {
            const c = data?.choices[i] || { text: '', correct: false };
            return `
                        <div class="choice-row">
                            <input type="checkbox" class="choice-check" title="정답 선택" ${c.correct ? 'checked' : ''} ${chkDisabled}>
                            <input type="text" class="choice-input" placeholder="선택지 ${i + 1} 입력..." value="${c.text}" ${readonlyAttr} ${disabled}>
                        </div>
                    `;
        }).join('')}
            </div>
        `;
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
        const langData = translations[this.currentLang] || translations['ko'];
        const title = langData.actions['ex-editing'] || 'Setting up Exam Paper';
        // 밴드(헤더) 영역
        let html = `
            <div class="view-header">
                <h2>${title}</h2>
            </div>
            <div class="question-list-container" id="question-list">
        `;
        // 편집 중인 문제 리스트를 읽기 전용으로 표시
        this.questionsData.forEach((q, i) => {
            html += this.createQuestionItemHtml(i + 1, q, true); // readOnly = true
        });
        html += `</div>`;
        this.container.innerHTML = html;
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
            label = this.currentLang === 'ko' ? "선택된 문제은행 파일 경로" : (this.currentLang === 'ru' ? "Путь к выбранному файлу банка вопросов" : "Selected Question Bank File Path");
            path = this.question_bank_file_name;
        }
        else if (this.currentMenu === 'student-list') {
            title = langData.menus["student-list"];
            label = this.currentLang === 'ko' ? "선택된 학생 명단 파일 경로" : (this.currentLang === 'ru' ? "Путь к выбранному файлу списка студентов" : "Selected Student List File Path");
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
                <p>${this.currentLang === 'ko' ? "파일이 성공적으로 선택되었습니다." : (this.currentLang === 'ru' ? "Файл успешно выбран." : "File successfully selected.")}</p>
            </div>
        `;
    }
    /* 문제은행 관련 함수군 */
    newQuestionBank() {
        // qb-new 선택 시에만 싹 비우고 초기화
        this.initializeQuestionBankWorkspace(true);
    }
    async openQuestionBank() {
        try {
            const descriptions = {
                ko: 'SQLite 문제은행 데이터베이스',
                en: 'SQLite Question Bank Database',
                ru: 'База данных банка вопросов SQLite'
            };
            const [handle] = await window.showOpenFilePicker({
                types: [{
                        description: descriptions[this.currentLang] || descriptions.en,
                        accept: { 'application/x-sqlite3': ['.qbdb'] }
                    }],
                excludeAcceptAllOption: true,
                multiple: false
            });
            this.question_bank_file_name = handle.name;
            const file = await handle.getFile();
            const buffer = await file.arrayBuffer();
            // WASM 엔진에 데이터 전달
            this.control_tower.set_qbank_from_bytes(new Uint8Array(buffer));
            // [수정] 현재 메뉴에 맞는 작업공간 유지 (파일 이름이 헤더에 나타남)
            if (this.currentMenu === 'exam-setting') {
                this.initializeExamSettingWorkspace();
            }
            else if (this.currentMenu === 'self-study') {
                this.initializeSelfStudyWorkspace();
            }
            else {
                this.initializeQuestionBankWorkspace(false);
            }
        }
        catch (err) {
            if (err.name !== 'AbortError')
                console.error("파일 접근 오류:", err);
        }
    }
    editQuestionBank() { console.log("editQuestionBank() 호출됨"); }
    saveQuestionBank() { console.log("saveQuestionBank() 호출됨"); }
    saveAsQuestionBank() { console.log("saveAsQuestionBank() 호출됨"); }
    optimizeQuestionBank() { console.log("optimizeQuestionBank() 호출됨"); }
    /* 학생 명단 관련 함수군 */
    async openStudentList() {
        try {
            const descriptions = {
                ko: 'SQLite 학생 명단 데이터베이스',
                en: 'SQLite Student List Database',
                ru: 'База данных списка студентов SQLite'
            };
            // 1. 파일 선택창 호출 (.sbdb 확장자)
            const [handle] = await window.showOpenFilePicker({
                types: [{
                        description: descriptions[this.currentLang] || descriptions.en,
                        accept: { 'application/x-sqlite3': ['.sbdb'] }
                    }],
                excludeAcceptAllOption: true,
                multiple: false
            });
            // 2. 파일 핸들 및 이름 저장
            this.student_list_file_name = handle.name;
            // 3. 파일 객체 얻기 및 WASM 전달
            const file = await handle.getFile();
            const buffer = await file.arrayBuffer();
            this.control_tower.set_sbank_from_bytes(new Uint8Array(buffer));
            // [수정] 현재 메뉴에 맞는 작업공간 유지 (파일 이름이 헤더에 나타남)
            if (this.currentMenu === 'exam-setting') {
                this.initializeExamSettingWorkspace();
            }
            else {
                this.initializeStudentListWorkspace(false);
            }
        }
        catch (err) {
            if (err.name !== 'AbortError') {
                console.error("파일 접근 오류:", err);
            }
        }
    }
    editStudentList() { console.log("editStudentList() 호출됨"); }
    saveStudentList() { console.log("saveStudentList() 호출됨"); }
    saveAsStudentList() { console.log("saveAsStudentList() 호출됨"); }
    /* 시험 및 학습 관련 함수군 */
    setExamScope() { console.log("setExamScope() 호출됨"); }
    saveExamPaper() { console.log("saveExamPaper() 호출됨"); }
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
        if (!dialog)
            return;
        // 현재 언어 라디오 버튼 선택 상태로 만들기
        const currentRadio = dialog.querySelector(`input[value="${this.currentLang}"]`);
        if (currentRadio) {
            currentRadio.checked = true;
        }
        dialog.showModal();
    }
    /* 정보 관련 함수군 */
    help() { console.log("help() 호출됨"); }
    showSoftwareInfo() { console.log("showSoftwareInfo() 호출됨"); }
    showCopyright() { console.log("showCopyright() 호출됨"); }
    /**
     * 화면 전환 시 제목 및 기본 구조 렌더링
     */
    renderView(menu) {
        if (!this.container)
            return;
        // 만약 question-bank 메뉴를 선택했다면 편집 작업영역 표시
        if (menu === 'question-bank') {
            this.initializeQuestionBankWorkspace(false);
            return;
        }
        // 만약 exam-setting 메뉴를 선택했다면 시험문제 제출 작업영역 표시
        if (menu === 'exam-setting') {
            this.initializeExamSettingWorkspace();
            return;
        }
        // 만약 student-list 메뉴를 선택했다면 학생 명단 작업영역 표시
        if (menu === 'student-list') {
            this.initializeStudentListWorkspace();
            return;
        }
        // 만약 self-study 메뉴를 선택했다면 자기주도학습 작업공간 표시
        if (menu === 'self-study') {
            this.initializeSelfStudyWorkspace();
            return;
        }
        // 다른 메뉴로 이동하기 전, 현재 편집 중인 내용을 상태에 저장 (데이터 유지)
        if (this.currentMenu === 'question-bank') {
            this.saveCurrentQuestionsToState();
        }
        else if (this.currentMenu === 'student-list') {
            this.saveCurrentStudentsToState();
        }
        else if (this.currentMenu === 'self-study') {
            this.saveStudyState();
        }
        this.currentMenu = menu;
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
