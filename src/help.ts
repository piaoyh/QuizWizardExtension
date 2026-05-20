// Copyright 2026 PARK Youngho.
//
// Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
// https://www.apache.org/licenses/LICENSE-2.0> or the MIT license
// <LICENSE-MIT or https://opensource.org/licenses/MIT>, at your option.
// This file may not be copied, modified, or distributed
// except according to those terms.

import { helpTranslations } from "./help_i18n.js";
import type { SupportedLang } from "./i18n.js";

type AppTheme = 'theme-blue' | 'theme-light' | 'theme-dark';

class QuizWizHelp {
    private container: HTMLElement | null;
    private currentLang: SupportedLang = 'ko';
    private currentTheme: AppTheme = 'theme-blue';

    constructor() {
        this.container = document.getElementById('view-container');
        this.initHelp();
    }

    private async initHelp() {
        const data = await chrome.storage.local.get(['theme', 'lang', 'font']);
        this.currentTheme = (data.theme as AppTheme) || 'theme-blue';
        this.currentLang = (data.lang as SupportedLang) || 'ko';
        const currentFont = (data.font as string) || '"Segoe UI", sans-serif';

        document.body.className = this.currentTheme;
        document.documentElement.style.setProperty('--app-font', currentFont);
        
        this.updateUILanguage();
        this.bindEvents();
        
        // 초기화 시 첫 번째 도움말 항목 표시
        this.renderView('qbank-structure');
    }

    private updateUILanguage() {
        const langData = helpTranslations[this.currentLang];
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
            const action = (el as HTMLElement).dataset.action;
            if (action && langData.actions[action]) {
                el.textContent = langData.actions[action];
            }
        });
    }

    private bindEvents() {
        // 하위 메뉴 클릭 시 해당 도움말 렌더링
        document.querySelectorAll('.submenu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const target = e.currentTarget as HTMLElement;
                const action = target.dataset.action;
                if (action) {
                    this.renderView(action);
                }
            });
        });
    }

    private renderView(action: string) {
        if (!this.container) return;
        const langData = helpTranslations[this.currentLang];
        const title = langData.actions[action] || action;

        // 도움말 내용 템플릿 (추후 각 항목별 실제 내용 추가 가능)
        this.container.innerHTML = `
            <div class="view-header">
                <h2>${title}</h2>
            </div>
            <div class="view-content" style="padding: 20px; line-height: 1.6;">
                <p>${title}에 대한 상세 설명이 준비 중입니다.</p>
            </div>
        `;
    }
}

window.addEventListener('DOMContentLoaded', () => new QuizWizHelp());
