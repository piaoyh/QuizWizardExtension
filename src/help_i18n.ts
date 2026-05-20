// Copyright 2026 PARK Youngho.
//
// Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
// https://www.apache.org/licenses/LICENSE-2.0> or the MIT license
// <LICENSE-MIT or https://opensource.org/licenses/MIT>, at your option.
// This file may not be copied, modified, or distributed
// except according to those terms.

import type { SupportedLang } from "./i18n.js";

export const helpTranslations: Record<SupportedLang, any> = {
    ko: {
        menus: {
            "about-qbank": "문제 은행에 대하여",
            "about-exam": "시험 문제 출제에 대하여",
            "about-students": "학생 명단에 대하여",
            "about-selfstudy": "자기 주도 학습에 대하여"
        },
        actions: {
            "qbank-structure": "문제 은행의 구조에 대하여",
            "qbank-editing": "문제 은행의 편집에 대하여",
            "qbank-usage": "문제 은행의 활용에 대하여",
            "exam-random": "시험 문제의 무작위 추출에 대하여",
            "exam-scope": "시험 범위에 대하여",
            "exam-relationship": "문제 은행과 학생 명단의 관계에 대하여",
            "students-structure": "학생 명단의 구조에 대하여",
            "students-editing": "학생 명단 편집에 대하여",
            "students-usage": "학생 명단의 활용에 대하여",
            "selfstudy-prep": "자기 주도 학습을 위한 준비 사항에 대하여",
            "selfstudy-scoring": "채점 방식에 대하여",
            "selfstudy-usage": "자기 주도 학습의 활용에 대하여"
        }
    },
    en: {
        menus: {
            "about-qbank": "About Question Bank",
            "about-exam": "About Exam Setting",
            "about-students": "About Student List",
            "about-selfstudy": "About Self-study"
        },
        actions: {
            "qbank-structure": "About QBank Structure",
            "qbank-editing": "About QBank Editing",
            "qbank-usage": "About QBank Usage",
            "exam-random": "About Random Selection of Questions",
            "exam-scope": "About Exam Scope",
            "exam-relationship": "Relationship between QBank and Student List",
            "students-structure": "About Student List Structure",
            "students-editing": "About Student List Editing",
            "students-usage": "About Student List Usage",
            "selfstudy-prep": "Preparation for Self-study",
            "selfstudy-scoring": "About Scoring Rules",
            "selfstudy-usage": "About Self-study Usage"
        }
    },
    ru: {
        menus: {
            "about-qbank": "О банке вопросов",
            "about-exam": "О постановке экзамена",
            "about-students": "О списке студентов",
            "about-selfstudy": "О самостоятельном обучении"
        },
        actions: {
            "qbank-structure": "О структуре банка вопросов",
            "qbank-editing": "О редактировании банка вопросов",
            "qbank-usage": "Об использовании банка вопросов",
            "exam-random": "О случайном выборе вопросов",
            "exam-scope": "Об области экзамена",
            "exam-relationship": "Связь между банком вопросов и списком студентов",
            "students-structure": "О структуре списка студентов",
            "students-editing": "О редактировании списка студентов",
            "students-usage": "Об использовании списка студентов",
            "selfstudy-prep": "Подготовка к самостоятельному обучению",
            "selfstudy-scoring": "О правилах начисления баллов",
            "selfstudy-usage": "Об использовании самостоятельного обучения"
        }
    },
    ky: {
        menus: {
            "about-qbank": "Суроолор банкы жөнүндө",
            "about-exam": "Экзамен коюу жөнүндө",
            "about-students": "Студенттердин тизмеси жөнүндө",
            "about-selfstudy": "Өз алдынча окуу жөнүндө",
        },
        actions: {
            "qbank-structure": "Суроолор банкынын түзүлүшү жөнүндө",
            "qbank-editing": "Суроолор банкын түзөтүү жөнүндө",
            "qbank-usage": "Суроолор банкын колдонуу жөнүндө",
            "exam-random": "Суроолорду туш келди тандоо жөнүндө",
            "exam-scope": "Экзамендин чөйрөсү жөнүндө",
            "exam-relationship": "Суроолор банкы менен студенттердин тизмесинин байланышы жөнүндө",
            "students-structure": "Студенттердин тизмесинин түзүлүшү жөнүндө",
            "students-editing": "Студенттердин тизмесин түзөтүү жөнүндө",
            "students-usage": "Студенттердин тизмесин кол도нуу жөнүндө",
            "selfstudy-prep": "Өз алдынча окууга даярдык көрүү жөнүндө",
            "selfstudy-scoring": "Баалоо эрежелери жөнүндө",
            "selfstudy-usage": "Өз алдынча окууну колдонуу жөнүндө"
        }
    }
};
