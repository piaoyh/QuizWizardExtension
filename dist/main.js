import { translations } from './i18n.js';
class QuizWizardApp {
    container;
    currentTheme = 'theme-desktop';
    currentLang = 'ko';
    currentMenu = '';
    constructor() {
        this.container = document.getElementById('view-container');
        this.initApp();
    }
    /**
     * 앱 초기 설정 로드 및 UI 초기화
     */
    async initApp() {
        // 1. 저장된 설정 로드
        const data = await chrome.storage.local.get(['theme', 'lang']);
        this.currentTheme = data.theme || 'theme-desktop';
        this.currentLang = data.lang || 'ko';
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
            this.refreshCurrentViewTitle();
        }
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
        console.log(`Action trigger: ${action}`);
        // 접두사(qb, ex, sl 등)를 이용한 대분류 처리도 가능
        if (action.startsWith('qb-')) {
            this.handleQuestionBankAction(action);
        }
        else if (action === 'st-lang') {
            this.cycleLanguage();
        }
        else if (action === 'st-theme') {
            this.toggleTheme();
        }
        else {
            // 나머지 액션들에 대한 처리
            alert(`Selected action: ${action}`);
        }
    }
    handleQuestionBankAction(action) {
        switch (action) {
            case 'qb-new':
                console.log("New QBank logic...");
                break;
            case 'qb-open':
                console.log("Open QBank logic...");
                break;
            case 'qb-save':
                console.log("Save QBank logic...");
                break;
            // ... 나머지 qb 액션들
        }
    }
    toggleTheme() {
        const nextTheme = this.currentTheme === 'theme-desktop' ? 'theme-web' : 'theme-desktop';
        this.currentTheme = nextTheme;
        document.body.className = nextTheme;
        chrome.storage.local.set({ theme: nextTheme });
    }
    cycleLanguage() {
        const langs = ['ko', 'en', 'ru'];
        const nextIdx = (langs.indexOf(this.currentLang) + 1) % langs.length;
        this.currentLang = langs[nextIdx]; // 명시적으로 타입 단언
        chrome.storage.local.set({ lang: this.currentLang });
        this.updateUILanguage();
    }
    /**
     * 화면 전환 시 제목 및 기본 구조 렌더링
     */
    renderView(menu) {
        if (!this.container)
            return;
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
    refreshCurrentViewTitle() {
        const titleEl = this.container?.querySelector('h2');
        if (titleEl && this.currentMenu) {
            titleEl.textContent = translations[this.currentLang].menus[this.currentMenu];
        }
    }
}
window.addEventListener('DOMContentLoaded', () => new QuizWizardApp());
