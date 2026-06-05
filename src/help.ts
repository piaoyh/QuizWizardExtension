// Copyright 2026 PARK Youngho.
//
// Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
// https://www.apache.org/licenses/LICENSE-2.0> or the MIT license
// <LICENSE-MIT or https://opensource.org/licenses/MIT>, at your option.
// This file may not be copied, modified, or distributed
// except according to those terms.

import type { SupportedLang } from "./i18n.js";

type AppTheme = 'theme-blue' | 'theme-light' | 'theme-dark';

class QuizWizHelp {
    private container: HTMLElement | null;
    private currentLang: SupportedLang = 'ko';
    private translations: any = null; // 다국어 스트링 저장용
    private currentTheme: AppTheme = 'theme-blue';
    private currentAction: string = 'qbank-structure';

    constructor() {
        this.container = document.getElementById('view-container');
        this.initHelp();
    }

    /**
     * 다국어 JSON 파일을 로드합니다.
     */
    private async loadTranslations(lang: SupportedLang) {
        try {
            const response = await fetch(`./_locales/${lang}/help.json`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            this.translations = await response.json();
            console.log(`주인님, ${lang} 도움말 언어 팩을 성공적으로 로드했습니다.`);
        } catch (e) {
            console.error("도움말 다국어 파일 로드 실패:", e);
            // 기본값으로 한국어 로드 시도 (도움말은 한국어가 기본일 수도 있음)
            if (lang !== 'ko') {
                await this.loadTranslations('ko');
            }
        }
    }

    private async initHelp() {
        const data = await chrome.storage.local.get(['theme', 'lang', 'font']);
        this.currentTheme = (data.theme as AppTheme) || 'theme-blue';
        
        // 언어 설정 감지 (저장된 설정 -> 브라우저 언어 -> 한국어)
        let lang: SupportedLang;
        if (data.lang) {
            lang = data.lang as SupportedLang;
        } else {
            const browserLang = navigator.language.split('-')[0];
            const supported: SupportedLang[] = ['ko', 'en', 'ru', 'ky'];
            lang = supported.includes(browserLang as SupportedLang) ? (browserLang as SupportedLang) : 'ko';
        }
        this.currentLang = lang;

        // 다국어 데이터 로드
        await this.loadTranslations(this.currentLang);

        const currentFont = (data.font as string) || '"Segoe UI", sans-serif';

        document.body.className = this.currentTheme;
        document.documentElement.style.setProperty('--app-font', currentFont);
        
        this.updateUILanguage();
        this.bindEvents();
        
        // 초기화 시 첫 번째 도움말 항목 표시
        this.renderView('qbank-structure');
    }

    private updateUILanguage() {
        const langData = this.translations;
        if (!langData) return;

        // 로고 타이틀 적용
        const helpTitle = document.getElementById('help-title');
        if (helpTitle && langData.ui['help-title']) {
            helpTitle.textContent = langData.ui['help-title'];
        }

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
        
        // [추가] 언어 변경 감지 (storage 변경 시 실시간 반영)
        chrome.storage.onChanged.addListener(async (changes, area) => {
            if (area === 'local' && changes.lang) {
                const newLang = changes.lang.newValue as SupportedLang;
                if (newLang && newLang !== this.currentLang) {
                    this.currentLang = newLang;
                    await this.loadTranslations(this.currentLang);
                    this.updateUILanguage();
                    // 현재 표시 중인 본문(작업공간) 갱신
                    if (this.currentAction) {
                        this.renderView(this.currentAction);
                    }
                }
            }
        });
    }

    private renderView(action: string) {
        if (!this.container) return;
        this.currentAction = action; // 현재 작업공간 상태 저장
        const langData = this.translations;
        if (!langData) return;

        const title = langData.actions[action] || action;
        let content = langData.contents?.[action];
        
        if (!content) {
            const comingSoon = langData.ui['coming-soon'] || '{title}에 대한 상세 설명이 준비 중입니다.';
            content = `<p>${comingSoon.replace('{title}', title)}</p>`;
        }

        // 도움말 내용 템플릿
        this.container.innerHTML = `
            <div class="view-header">
                <h2>${title}</h2>
            </div>
            <div class="view-content" style="padding: 20px; line-height: 1.6; overflow-y: auto; max-height: calc(100vh - 100px);">
                ${content}
            </div>
        `;
    }
}

window.addEventListener('DOMContentLoaded', () => new QuizWizHelp());
