// Copyright 2026. PARK Youngho. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
// https://www.apache.org/licenses/LICENSE-2.0> or the MIT license
// <LICENSE-MIT or https://opensource.org/licenses/MIT>, at your option.
// This file may not be copied, modified, or distributed
// except according to those terms.
///////////////////////////////////////////////////////////////////////////////

export type SupportedLang = 'ko' | 'en' | 'ru' | 'ky';

// Translations are now managed in JSON files under Extension/dist/_locales/
export const translations: Record<SupportedLang, any> = {
    ko: {},
    en: {},
    ru: {},
    ky: {}
};
