class QuizWizardApp {
    container;
    currentTheme = 'theme-desktop';
    currentMenu = '';
    constructor() {
        this.container = document.getElementById('view-container');
        this.loadSettings();
    }
    async loadSettings() {
        const data = await chrome.storage.local.get(['theme']);
        this.currentTheme = data.theme || 'theme-desktop';
        document.body.className = this.currentTheme;
        this.init();
    }
    init() {
        // 주메뉴 버튼들
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
        // 하위 메뉴 아이템들
        const submenuItems = document.querySelectorAll('.submenu-item');
        submenuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const target = e.currentTarget;
                const action = target.dataset.action;
                // 부모 메뉴 찾기
                const parentBtn = target.closest('.menu-item-container')?.querySelector('.menu-item');
                const parentMenu = parentBtn?.dataset.menu;
                console.log(`Action [${action}] from [${parentMenu}]`);
                this.handleAction(parentMenu || '', action || '');
            });
        });
        this.renderView('question-bank');
    }
    applyTheme(theme) {
        this.currentTheme = theme;
        document.body.className = theme;
        chrome.storage.local.set({ theme: theme });
    }
    handleAction(menu, action) {
        // 하위 메뉴 클릭 시 동작 정의
        if (action === 'theme') {
            const nextTheme = this.currentTheme === 'theme-desktop' ? 'theme-web' : 'theme-desktop';
            this.applyTheme(nextTheme);
        }
        else {
            alert(`${menu}의 ${action} 기능을 실행합니다.`);
        }
    }
    renderView(menu) {
        if (!this.container || this.currentMenu === menu)
            return;
        this.currentMenu = menu;
        this.container.innerHTML = '';
        const section = document.createElement('section');
        section.innerHTML = `<h2>${menu.replace('-', ' ').toUpperCase()}</h2><p>이곳은 ${menu} 화면입니다.</p>`;
        // Settings 등 특정 메뉴에 대한 추가 UI는 여기에 switch-case로 작성
        this.container.appendChild(section);
    }
}
window.addEventListener('DOMContentLoaded', () => new QuizWizardApp());
export {};
