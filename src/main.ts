import { translations } from './i18n.js';
import type { SupportedLang } from './i18n.js'; // type 키워드 추가

type AppTheme = 'theme-web' | 'theme-desktop';

class QuizWizardApp {
    private container: HTMLElement | null;
    private currentTheme: AppTheme = 'theme-desktop';
    private currentLang: SupportedLang = 'ko';
    private currentMenu: string = '';// [추가] 선택된 문제은행 파일의 경로를 저장할 필드
    private question_bank_file_name: string = '';

    constructor() {
        this.container = document.getElementById('view-container');
        this.initApp();
    }

    /**
     * 앱 초기 설정 로드 및 UI 초기화
     */
    private async initApp() {
        // 1. 저장된 설정 로드
        const data = await chrome.storage.local.get(['theme', 'lang']);
        this.currentTheme = (data.theme as AppTheme) || 'theme-desktop';
        this.currentLang = (data.lang as SupportedLang) || 'ko';
        
        // 2. 초기 스타일 및 언어 적용
        document.body.className = this.currentTheme;
        this.updateUILanguage();
        
        // 3. 이벤트 리스너 등록
        this.bindEvents();
        
        // 4. 초기 화면 렌더링 (Question Bank)
        this.renderView('question-bank');
    }

    /**
     * i18n 데이터를 기반으로 모든 HTML 요소의 텍스트 갱신
     */
    private updateUILanguage() {
        const langData = translations[this.currentLang];
        if (!langData) return;

        // 주메뉴 텍스트 적용
        document.querySelectorAll('.menu-item').forEach(el => {
            const key = (el as HTMLElement).dataset.menu;
            if (key && langData.menus[key]) {
                el.textContent = langData.menus[key];
            }
        });

        // 하위 메뉴 텍스트 적용
        document.querySelectorAll('.submenu-item').forEach(el => {
            const key = (el as HTMLElement).dataset.action;
            if (key && langData.actions[key]) {
                el.textContent = langData.actions[key];
            }
        });

        // 현재 렌더링된 뷰가 있다면 제목 등도 다시 갱신
        if (this.currentMenu) {
            this.refreshCurrentViewTitle();
        }
    }

    private bindEvents() {
        // 주메뉴 클릭 핸들러
        const menuButtons = document.querySelectorAll('.menu-item');
        menuButtons.forEach(btn => {
            btn.addEventListener('mousedown', (e) => {
                const target = e.currentTarget as HTMLElement;
                const menu = target.dataset.menu;
                if (!menu || this.currentMenu === menu) return;
                
                menuButtons.forEach(b => b.classList.remove('active'));
                target.classList.add('active');
                this.renderView(menu);
            });
        });

        // 하위 메뉴(고유 액션) 클릭 핸들러
        document.querySelectorAll('.submenu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const target = e.currentTarget as HTMLElement;
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
    private handleAction(action: string) {
        console.log(`Action executing: ${action}`);

        switch (action) {
            /* --- Question Bank (문제은행) --- */
            case 'qb-new':          this.newQuestionBank(); break;
            case 'qb-open':         this.openQuestionBank(); break;               // 추가됨
            case 'qb-edit':         this.editQuestionBank(); break;               // 추가됨
            case 'qb-save':         this.saveQuestionBank(); break;               // 추가됨
            case 'qb-save-as':      this.saveAsQuestionBank(); break;             // 추가됨
            case 'qb-optimize':     this.optimizeQuestionBank(); break;           // 추가됨

            /* --- Exam Setting (시험 설정) --- */
            case 'ex-load-bank':    this.openQuestionBank(); break;               // 추가됨 (공용 함수 사용)
            case 'ex-load-students': this.openStudentList(); break;               // 추가됨
            case 'ex-change-scope':  this.setExamScope(); break;                  // 추가됨
            case 'ex-save-paper':   this.saveExamPaper(); break;                  // 추가됨

            /* --- Student List (학생 명단) --- */
            case 'sl-open':         this.openStudentList(); break;                // 추가됨
            case 'sl-edit':         this.editStudentList(); break;                // 추가됨
            case 'sl-save':         this.saveStudentList(); break;                // 추가됨
            case 'sl-save-as':      this.saveAsStudentList(); break;              // 추가됨

            /* --- Self-study (자기 주도 학습) --- */
            case 'ss-load-bank':    this.openQuestionBank(); break;               // 추가됨 (공용 함수 사용)
            case 'ss-change-scope':  this.setExamScope(); break;                  // 추가됨
            case 'ss-change-grading': this.setGradingMethod(); break;             // 추가됨
            case 'ss-start':        this.startSelfstudy(); break;                 // 추가됨

            /* --- Settings (설정) --- */
            case 'st-path-bank':    this.setQuestionBankDefaultPath(); break;     // 추가됨
            case 'st-path-student':  this.setStudentListDefaultPath(); break;     // 추가됨
            case 'st-theme':        this.setTheme(); break;                       // 추가 및 변경됨
            case 'st-font':         this.setFonts(); break;                       // 추가됨
            case 'st-lang':         this.setLanguage(); break;                    // 추가 및 변경됨

            /* --- Information (정보) --- */
            case 'in-help':         this.help(); break;                           // 추가됨
            case 'in-info-soft':    this.showSoftwareInfo(); break;               // 추가됨
            case 'in-info-copy':    this.showCopyright(); break;                   // 추가됨

            default:
                console.warn(`No handler defined for action: ${action}`);
        }
    }

    /** 문제은행 작업공간 초기화 */
    private initializeQuestionBankWorkspace() {
        if (!this.container) return;
        console.log("문제은행 작업공간을 초기화합니다.");
        // UI 초기화 예시
        this.container.innerHTML = `<h3>문제은행 작업공간</h3><p>새로운 문제은행 제작을 시작합니다.</p>`;
    }

    /**
     * 작업공간에 선택된 파일 경로를 표시합니다.
     */
    private displayFilePathInWorkspace() {
        if (!this.container) return;

        // 현재 작업공간 내용을 유지하면서 경로 정보를 상단에 추가하거나 교체합니다.
        const langData = translations[this.currentLang];
        const title = langData.menus["question-bank"];

        this.container.innerHTML = `
            <div class="view-header">
                <h2>${title}</h2>
            </div>
            <div class="view-content">
                <div class="file-info-box" style="padding: 10px; background: #f0f0f0; border-radius: 4px; margin-bottom: 15px;">
                    <strong>선택된 문제은행 파일 경로:</strong> 
                    <code style="color: #d63384;">${this.question_bank_file_name}</code>
                </div>
                <p>파일이 성공적으로 선택되었습니다. 이제 편집 또는 시험 설정을 진행할 수 있습니다.</p>
            </div>
        `;
    }

    private processWasmDatabase(data: Uint8Array) {
        console.log("Wasm 엔진으로 데이터 전달됨, 크기:", data.length);
        // 여기에 주인님이 만드신 Wasm 호출 로직을 넣으시면 됩니다.
    }

    /* 문제은행 관련 함수군 */
    private newQuestionBank() { this.initializeQuestionBankWorkspace(); }
    
    private async openQuestionBank()
    {
        try {
            // 1. 파일 선택창 호출
            const [handle] = await (window as any).showOpenFilePicker({
                types: [{
                    description: 'SQLite Question Bank Database',
                    accept: { 'application/x-sqlite3': ['.qbdb'] } // .qbdb 확장자 허용
                }],
                excludeAcceptAllOption: true,
                multiple: false
            });

            // 2. 파일 핸들 및 이름 저장
            this.question_bank_file_name = handle.name;
            
            // 3. 파일 객체 얻기
            const file = await handle.getFile();
            const buffer = await file.arrayBuffer();

            this.processWasmDatabase(new Uint8Array(buffer));
            
            
            this.displayFilePathInWorkspace();

        } catch (err: any) {
            // 사용자가 취소했을 때의 예외 처리
            if (err.name !== 'AbortError') {
                console.error("파일 접근 오류:", err);
            }
        }
    }

    private editQuestionBank() { console.log("editQuestionBank() 호출됨"); }
    private saveQuestionBank() { console.log("saveQuestionBank() 호출됨"); }
    private saveAsQuestionBank() { console.log("saveAsQuestionBank() 호출됨"); }
    private optimizeQuestionBank() { console.log("optimizeQuestionBank() 호출됨"); }

    /* 학생 명단 관련 함수군 */
    private openStudentList() { console.log("openStudentList() 호출됨"); }
    private editStudentList() { console.log("editStudentList() 호출됨"); }
    private saveStudentList() { console.log("saveStudentList() 호출됨"); }
    private saveAsStudentList() { console.log("saveAsStudentList() 호출됨"); }

    /* 시험 및 학습 관련 함수군 */
    private setExamScope() { console.log("setExamScope() 호출됨"); }
    private saveExamPaper() { console.log("saveExamPaper() 호출됨"); }
    private setGradingMethod() { console.log("setGradingMethod() 호출됨"); }
    private startSelfstudy() { console.log("startSelfstudy() 호출됨"); }

    /* 설정 관련 함수군 */
    private setQuestionBankDefaultPath() { console.log("setQuestionBankDefaultPath() 호출됨"); }
    private setStudentListDefaultPath() { console.log("setStudentListDefaultPath() 호출됨"); }
    
    /** 테마 설정 및 저장 */
    private setTheme() {
        const nextTheme: AppTheme = this.currentTheme === 'theme-desktop' ? 'theme-web' : 'theme-desktop';
        this.currentTheme = nextTheme;
        document.body.className = nextTheme;
        chrome.storage.local.set({ theme: nextTheme });
    }

    private setFonts() { console.log("setFonts() 호출됨"); }
    
    /** 언어 설정 순환 변경 (ko -> en -> ru) */
    private setLanguage() {
        const langs: SupportedLang[] = ['ko', 'en', 'ru'];
        const nextIdx = (langs.indexOf(this.currentLang) + 1) % langs.length;
        this.currentLang = langs[nextIdx] as SupportedLang; // Type Assertion 적용
        chrome.storage.local.set({ lang: this.currentLang });
        this.updateUILanguage();
    }

    /* 정보 관련 함수군 */
    private help() { console.log("help() 호출됨"); }
    private showSoftwareInfo() { console.log("showSoftwareInfo() 호출됨"); }
    private showCopyright() { console.log("showCopyright() 호출됨"); }

    /**
     * 화면 전환 시 제목 및 기본 구조 렌더링
     */
    private renderView(menu: string) {
        if (!this.container) return;
        this.currentMenu = menu;
        
        const langData = translations[this.currentLang];
        const title = langData.menus[menu] || menu;

        // 화면 전환 시의 깜빡임을 방지하기 위해 innerHTML 사용 최소화
        this.container.innerHTML = `
            <div class="view-header">
                <h2>${title}</h2>
            </div>
            <div class="view-content">
                <p>${title} 섹션입니다. 하위 메뉴를 통해 기능을 선택하세요.</p>
            </div>
        `;
    }

    private refreshCurrentViewTitle() {
        const titleEl = this.container?.querySelector('h2');
        if (titleEl && this.currentMenu) {
            titleEl.textContent = translations[this.currentLang].menus[this.currentMenu];
        }
    }
}

window.addEventListener('DOMContentLoaded', () => new QuizWizardApp());