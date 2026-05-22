// Copyright 2026 PARK Youngho.
//
// Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
// https://www.apache.org/licenses/LICENSE-2.0> or the MIT license
// <LICENSE-MIT or https://opensource.org/licenses/MIT>, at your option.
// This file may not be copied, modified, or distributed
// except according to those terms.
export const helpTranslations = {
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
        },
        contents: {
            "qbank-structure": `
                <p>문제은행은 헤더와 문제들로 구성된다.</p>
                <h3>1. 헤더</h3>
                <p>헤더는 문제를 출제할 때에 시험지의 처음에 나타나는 사항들에 대한 정보를 갖고 있다.</p>
                <p>1.1. 헤더의 편집은 <strong>문제 은행 > 헤더 편집</strong>에서 할 수 있다.</p>
                <p>1.2. 헤더에는 제목, 이름, 학번, 문제유형의 명칭들 및 주의사항 등으로 구성되어 있다.</p>
                <ul>
                    <li>1.2.1. <strong>제목</strong> - 수학 기말고사, 과학 중간고사 등의 시험지에 나타나는 시험의 이름이다. 시험지에 출력될 때에는 볼드체의 큰 글꼴 크기로 출력된다.</li>
                    <li>1.2.2. <strong>이름</strong> - 시험지에 나타나는 이름이라는 단어이다. 즉, '이름'이라고 입력하면 시험지에 '이름:'이라고 나타나고 '성명'이라고 입력하면 '성명:'이라고 나타난다.</li>
                    <li>1.2.3. <strong>ID</strong> - 수험생의 고유번호이다. '학번'이라고 입력하면 시험지에 '학번:'이라고 나타나고 '수험번호'라고 입력하면 '수험번호:'라고 나타난다.</li>
                    <li>1.2.4. <strong>단일 선택형 객관식</strong> - '가 형'으로 입력하면 시험지에 문제 번호 다음에 '[가 형]' 으로 문제 앞에 인쇄된다. 이를 통해 수험생은 그 문제가 '가 형' 문제라는 것을 알게 된다. 아무것도 입력을 하지 않으면 빈 괄호 [ ]만 나타나므로 미관상 좋지 않다.</li>
                    <li>1.2.5. <strong>복수 응답형 객관식</strong> - '나 형'으로 입력하면 시험지에 문제 번호 다음에 '[나 형]' 으로 문제 앞에 인쇄된다. 이를 통해 수험생은 그 문제가 '나 형' 문제라는 것을 알게 된다. 아무것도 입력을 하지 않으면 빈 괄호 [ ]만 나타나므로 미관상 좋지 않다.</li>
                    <li>1.2.6. <strong>단답형 주관식</strong> - '다 형'으로 입력하면 시험지에 문제 번호 다음에 '[다 형]' 으로 문제 앞에 인쇄된다. 이를 통해 수험생은 그 문제가 '다 형' 문제라는 것을 알게 된다. 아무것도 입력을 하지 않으면 빈 괄호 [ ]만 나타나므로 미관상 좋지 않다.</li>
                    <li>1.2.7. <strong>논술형 주관식</strong> - '라 형'으로 입력하면 시험지에 문제 번호 다음에 '[라 형]' 으로 문제 앞에 인쇄된다. 이를 통해 수험생은 그 문제가 '라 형' 문제라는 것을 알게 된다. 아무것도 입력을 하지 않으면 빈 괄호 [ ]만 나타나므로 미관상 좋지 않다.</li>
                    <li>1.2.8. <strong>주의사항</strong> - 시험 안내 사항이다. 시험의 주의사항을 입력한다. 시험지의 제목 아래에 이름과 ID가 나타나고, 그 아래에 '주의사항'에 입력한 내용이 인쇄되고, 그 아래부터 문제가 시작된다. '주의사항'에 특별히 넣을 내용이 없다면, 그냥 '시험 잘 보세요!' 등의 축복 메시지를 넣어도 된다.</li>
                </ul>
                <p>1.3. <strong>기본 헤더 내용</strong> 버튼 - 이 버튼을 누르면 미리 저장된 기본 내용들이 선택한 '언어'에 따라 '제목'을 제외한 모든 빈 칸에 자동으로 입력된다. 사용자는 기본 내용에서 원하는 부분만 고치면 된다. '주의사항'에는 사용자가 택한 '채점 방식'과 '언어'에 따라 미리 정해 놓은 문제유형에 대한 설명과 채점방식이 자동으로 입력된다.</p>
                
                <h3>2. 문제들</h3>
                <p>2.1. 문제들의 유형은 모두 네 가지의 유형을 지원한다: <strong>단일 선택형 객관식</strong>, <strong>복수 응답형 객관식</strong>, <strong>단답형 주관식</strong> 및 <strong>논술형 주관식</strong>. 현재로서는 연결형 문제유형은 지원하지 않는다. O-X 이진형 문제는 이지선다형 객관식 문제로 구현할 수 있다.</p>
                <ul>
                    <li>2.1.1. <strong>단일 선택형 객관식</strong> - 다지선다형 객관식 문제로서, 선택지들 중에서 하나만이 정답이다.</li>
                    <li>2.1.2. <strong>복수 응답형 객관식</strong> - 다지선다형 객관식 문제로서, 선택지들 중에서 두 개 이상이 정답이다.</li>
                    <li>2.1.3. <strong>단답형 주관식</strong> - 주관식 문제로서, 정답이 한 단어 또는 두 단어 이상의 짧은 표현으로 이루어진다.</li>
                    <li>2.1.4. <strong>논술형 주관식</strong> - 주관식 문제로서, 정답이 한 단락 이상으로 이루어진다.</li>
                </ul>
                <p>2.2. 문제들의 배열의 각각의 문제는 문제 번호와 그룹 번호와 문제 텍스트와 선택지들과 각 선택지의 체크 마크로 구성된다.</p>
                <ul>
                    <li>2.2.1. <strong>문제 번호</strong> - 문제들의 배열에서의 각 문제의 순서에 따른다. 문제 번호는 수업의 진도 순서대로 증가하는 것이 바람직하다. 나중에 시험 범위를 문제 번호를 기준으로 정하기 때문이다. 최대 65,534개까지 가능하다.</li>
                    <li>2.2.2. <strong>그룹 번호</strong> - 같은 그룹에 속한 문제들은 표현만 달랐지 사실상 같은 문제들이다. 무작위로 추출될 때 한 그룹에서 한 문제만 선택된다. 이를 통해 학생별로 다양하지만 사실상 같은 문제를 배정할 수 있다. <strong>최적화</strong>를 실행하면 그룹 번호는 그 그룹 내 가장 작은 문제 번호로 자동 조정된다.</li>
                    <li>2.2.3. <strong>문제 텍스트</strong> - 질문 텍스트이며 여러 줄 입력이 가능하지만, 현재 그림 포함은 지원하지 않는다.</li>
                    <li>2.2.4. <strong>선택지들</strong> - 한 문제당 0개에서 최대 255개까지 가능하다.</li>
                    <li>2.2.5. <strong>체크 마크</strong> - 각 선택지마다 하나의 체크 마크를 가진다.
                        <ul>
                            <li>객관식: 체크된 선택지가 정답이다.</li>
                            <li>단답형: 모든 선택지의 체크 마크가 체크되어야 하며, 그중 하나와 일치하면 정답이다.</li>
                            <li>논술형: 선택지가 없거나 모든 체크 마크가 해제되어야 한다.</li>
                        </ul>
                    </li>
                </ul>
                <p>2.3. <strong>선택지와 체크 마크에 따른 문제 유형 결정</strong></p>
                <ul>
                    <li>2.3.1. 선택지가 없는 문제: <strong>논술형 주관식</strong></li>
                    <li>2.3.2. 선택지가 있고 모든 체크 마크가 체크된 경우: <strong>단답형 주관식</strong></li>
                    <li>2.3.3. 선택지가 있고 모든 체크 마크가 해제된 경우: <strong>논술형 주관식</strong></li>
                    <li>2.3.4. 선택지가 2개 이상이고 하나만 체크된 경우: <strong>단일 선택형 객관식</strong></li>
                    <li>2.3.5. 그 외(선택지 2개 이상, 복수 체크): <strong>복수 응답형 객관식</strong></li>
                </ul>
            `
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
        },
        contents: {
            "qbank-structure": `
                <p>A question bank consists of a header and questions.</p>
                <h3>1. Header</h3>
                <p>The header contains information about the items that appear at the beginning of the exam paper.</p>
                <p>1.1. You can edit the header in <strong>Question Bank > Edit Header</strong>.</p>
                <p>1.2. The header consists of the title, name, ID, names of question types, and notices.</p>
                <ul>
                    <li>1.2.1. <strong>Title</strong> - The name of the exam (e.g., "Math Final Exam"). It is printed in a large, bold font.</li>
                    <li>1.2.2. <strong>Name</strong> - The label for the name field. If you enter "Name", it appears as "Name:".</li>
                    <li>1.2.3. <strong>ID</strong> - The unique ID of the student. If you enter "Student ID", it appears as "Student ID:".</li>
                    <li>1.2.4. <strong>Single-choice question</strong> - If you enter "Type A", it appears as "[Type A]" before the question. If left blank, empty brackets [ ] will appear.</li>
                    <li>1.2.5. <strong>Multiple-choice question</strong> - If you enter "Type B", it appears as "[Type B]" before the question.</li>
                    <li>1.2.6. <strong>Short answer question</strong> - If you enter "Type C", it appears as "[Type C]" before the question.</li>
                    <li>1.2.7. <strong>Essay question</strong> - If you enter "Type D", it appears as "[Type D]" before the question.</li>
                    <li>1.2.8. <strong>Notice</strong> - Exam guidelines. It appears below the Title, Name, and ID, before the questions start.</li>
                </ul>
                <p>1.3. <strong>Default Header Content</strong> Button - Automatically fills in blank fields (except Title) with pre-stored default content based on the selected Language and Scoring Rules.</p>
                
                <h3>2. Questions</h3>
                <p>2.1. Four types are supported: <strong>Single-choice question</strong>, <strong>Multiple-choice question</strong>, <strong>Short answer question</strong>, and <strong>Essay question</strong>. True/False questions can be implemented as two-choice objective questions.</p>
                <ul>
                    <li>2.1.1. <strong>Single-choice question</strong> - Only one choice is correct.</li>
                    <li>2.1.2. <strong>Multiple-choice question</strong> - Two or more choices are correct.</li>
                    <li>2.1.3. <strong>Short answer question</strong> - Correct answer is one or more words or a short expression.</li>
                    <li>2.1.4. <strong>Essay question</strong> - Correct answer consists of one or more paragraphs.</li>
                </ul>
                <p>2.2. Each question consists of a question number, group number, text, choices, and check marks.</p>
                <ul>
                    <li>2.2.1. <strong>Question Number</strong> - Follows the order in the array. Maximum of 65,534 questions.</li>
                    <li>2.2.2. <strong>Group Number</strong> - Questions in the same group are essentially identical. Only one question from a group is selected during random extraction. <strong>Optimize</strong> adjusts group numbers to the smallest question number in the group.</li>
                    <li>2.2.3. <strong>Question Text</strong> - The prompt of the question. Images are not yet supported.</li>
                    <li>2.2.4. <strong>Choices</strong> - 0 to 255 choices per question.</li>
                    <li>2.2.5. <strong>Check Mark</strong> - Each choice has one check mark.
                        <ul>
                            <li>Objective: Checked choices are correct answers.</li>
                            <li>Short answer: All choices must be checked; student's answer must match any one of them.</li>
                            <li>Essay: No choices or all choices unchecked.</li>
                        </ul>
                    </li>
                </ul>
                <p>2.3. <strong>Question Type Determination</strong></p>
                <ul>
                    <li>2.3.1. No choices: <strong>Essay question</strong></li>
                    <li>2.3.2. Choices exist and all checked: <strong>Short answer question</strong></li>
                    <li>2.3.3. Choices exist and all unchecked: <strong>Essay question</strong></li>
                    <li>2.3.4. 2+ choices and only one checked: <strong>Single-choice question</strong></li>
                    <li>2.3.5. Other (2+ choices, multiple checked): <strong>Multiple-choice question</strong></li>
                </ul>
            `
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
        },
        contents: {
            "qbank-structure": `
                <p>Банк вопросов состоит из заголовка и самих вопросов.</p>
                <h3>1. Заголовок</h3>
                <p>Заголовок содержит информацию об элементах, которые появляются в начале экзаменационного листа.</p>
                <p>1.1. Редактировать заголовок можно в меню <strong>Банк вопросов > Редактировать заголовок</strong>.</p>
                <p>1.2. Заголовок состоит из названия экзамена, Ф.И.О., номера студенческого билета, названий типов вопросов и примечаний.</p>
                <ul>
                    <li>1.2.1. <strong>Заголовок</strong> - Название экзамена (например, "Итоговый экзамен"). Выводится жирным шрифтом большого размера.</li>
                    <li>1.2.2. <strong>Ф.И.О.</strong> - Поле для имени. Если вы введете "Имя", оно будет отображаться как "Имя:".</li>
                    <li>1.2.3. <strong>ID</strong> - Уникальный номер студента. Если вы введете "Номер студенческого билета", он будет отображаться как "Номер студенческого билета:".</li>
                    <li>1.2.4. <strong>Тест с одним правильным ответом</strong> - Если вы введете "Тип А", это будет отображаться как "[Тип А]" перед вопросом.</li>
                    <li>1.2.5. <strong>Тест с несколькими правильными ответами</strong> - Если вы введете "Тип Б", это будет отображаться как "[Тип Б]".</li>
                    <li>1.2.6. <strong>Задание с кратким ответом</strong> - Если вы введете "Тип В", это будет отображаться как "[Тип В]".</li>
                    <li>1.2.7. <strong>Задание с развернутым ответом</strong> - Если вы введете "Тип Г", это будет отображаться как "[Тип Г]".</li>
                    <li>1.2.8. <strong>Примечание</strong> - Инструкции к экзамену. Отображаются под заголовком и данными студента.</li>
                </ul>
                <p>1.3. Кнопка <strong>Заголовок по умолчанию</strong> - Автоматически заполняет пустые поля (кроме Заголовка) данными по умолчанию в зависимости от языка и правил начисления баллов.</p>
                
                <h3>2. Вопросы</h3>
                <p>2.1. Поддерживаются четыре типа: <strong>Тест с одним правильным ответом</strong>, <strong>Тест с несколькими правильными ответами</strong>, <strong>Задание с кратким ответом</strong> и <strong>Задание с развернутым ответом</strong>.</p>
                <ul>
                    <li>2.1.1. <strong>Тест с одним правильным ответом</strong> - Только один вариант является правильным.</li>
                    <li>2.1.2. <strong>Тест с несколькими правильными ответами</strong> - Два или более вариантов являются правильными.</li>
                    <li>2.1.3. <strong>Задание с кратким ответом</strong> - Правильный ответ состоит из одного или нескольких слов.</li>
                    <li>2.1.4. <strong>Задание с развернутым ответом</strong> - Ответ состоит из одного или нескольких абзацев.</li>
                </ul>
                <p>2.2. Каждый вопрос состоит из номера вопроса, номера группы, текста, вариантов ответов и отметок.</p>
                <ul>
                    <li>2.2.1. <strong>Номер вопроса</strong> - Соответствует порядку в массиве. Максимум 65 534 вопроса.</li>
                    <li>2.2.2. <strong>Номер группы</strong> - Вопросы в одной группе идентичны по содержанию. При случайном выборе выбирается только один вопрос из группы. <strong>Оптимизировать</strong> устанавливает номер группы равным наименьшему номеру вопроса в группе.</li>
                    <li>2.2.3. <strong>Текст вопроса</strong> - Текст самого вопроса. Изображения пока не поддерживаются.</li>
                    <li>2.2.4. <strong>Варианты ответов</strong> - От 0 до 255 вариантов на вопрос.</li>
                    <li>2.2.5. <strong>Отметка (Чек)</strong> - У каждого варианта есть одна отметка.
                        <ul>
                            <li>Тест: Отмеченные варианты являются правильными.</li>
                            <li>Краткий ответ: Все варианты должны быть отмечены; ответ студента должен совпадать с любым из них.</li>
                            <li>Развернутый ответ: Варианты отсутствуют или все отметки сняты.</li>
                        </ul>
                    </li>
                </ul>
                <p>2.3. <strong>Определение типа вопроса</strong></p>
                <ul>
                    <li>2.3.1. Без вариантов: <strong>Задание с развернутым ответом</strong></li>
                    <li>2.3.2. Есть варианты и все отмечены: <strong>Задание с кратким ответом</strong></li>
                    <li>2.3.3. Есть варианты и все отметки сняты: <strong>Задание с развернутым ответом</strong></li>
                    <li>2.3.4. 2+ варианта и отмечен только один: <strong>Тест с одним правильным ответом</strong></li>
                    <li>2.3.5. Остальные случаи (2+ варианта, несколько отмечено): <strong>Тест с несколькими правильными ответами</strong></li>
                </ul>
            `
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
            "students-usage": "Студенттердин тизмесин колдонуу жөнүндө",
            "selfstudy-prep": "Өз алдынча окууга даيارдык көрүү жөнүндө",
            "selfstudy-scoring": "Баалоо эрежелери жөнүндө",
            "selfstudy-usage": "Өз алдынча окууну колдонуу жөнүндө"
        },
        contents: {
            "qbank-structure": `
                <p>Суроолор банкы баш саптан жана суроолордон турат.</p>
                <h3>1. Баш сап</h3>
                <p>Баш сап экзамен барагынын башында пайда болгон элементтер жөнүндө маалыматты камтыйт.</p>
                <p>1.1. Баш сапты <strong>Суроолор банкы > Баш сапты түзөтүү</strong> менюсунан түзөтсөңүз болот.</p>
                <p>1.2. Баш сап экзамендин аталышынан, аты-жөнүнөн, студенттик билет номеринен, суроо түрлөрүнүн аталыштарынан жана эскертүүлөрдөн турат.</p>
                <ul>
                    <li>1.2.1. <strong>Баш сөз</strong> - Экзамендин аталышы (мис. "Математика экзамени"). Ал чоң, калың шрифт менен көрсөтүлөт.</li>
                    <li>1.2.2. <strong>Аты-жөнү</strong> - Аты-жөнү үчүн талаа. Эгер сиз "Аты" деп киргизсеңиз, ал "Аты:" болуп көрүнөт.</li>
                    <li>1.2.3. <strong>ID</strong> - Студенттин уникалдуу номери. Эгер сиз "Студенттик билет номери" деп киргизсеңиз, ал "Студенттик билет номери:" болуп көрүнөт.</li>
                    <li>1.2.4. <strong>Бир жооптуу тест</strong> - Эгер сиз "А варианты" деп киргизсеңиз, ал суроонун алдында "[А варианты]" болуп көрүнөт.</li>
                    <li>1.2.5. <strong>Бир нече жооптуу тест</strong> - Эгер сиз "Б варианты" деп киргизсеңиз, ал "[Б варианты]" болуп көрүнөт.</li>
                    <li>1.2.6. <strong>Кыска жооп</strong> - Эгер сиз "В варианты" деп киргизсеңиз, ал "[В варианты]" болуп көрүнөт.</li>
                    <li>1.2.7. <strong>Кеңири жооп</strong> - Эгер сиз "Г варианты" деп киргизсеңиз, ал "[Г варианты]" болуп көрүнөт.</li>
                    <li>1.2.8. <strong>Эскертүү</strong> - Экзамен эрежелери. Баш сөздүн жана студенттин маалыматынын астында пайда болот.</li>
                </ul>
                <p>1.3. <strong>Демейки мазмун</strong> баскычы - Тандалган тилге жана баалоо эрежелерине ылайык бош талааларды автоматтык түрдө толтурат.</p>
                
                <h3>2. Суроолор</h3>
                <p>2.1. Төрт түрү колдоого алынат: <strong>Бир жооптуу тест</strong>, <strong>Бир нече жооптуу тест</strong>, <strong>Кыска жооп</strong> жана <strong>Кеңири жооп</strong>.</p>
                <ul>
                    <li>2.1.1. <strong>Бир жооптуу тест</strong> - Бир гана вариант туура.</li>
                    <li>2.1.2. <strong>Бир нече жооптуу тест</strong> - Эки же андан көп вариант туура.</li>
                    <li>2.1.3. <strong>Кыска жооп</strong> - Туура жообу бир же бир нече сөздөн турат.</li>
                    <li>2.1.4. <strong>Кеңири жооп</strong> - Жообу бир же бир нече абзацтан турат.</li>
                </ul>
                <p>2.2. Ар бир суроо номеринен, топтун номеринен, тексттен, варианттардан жана белгилерден турат.</p>
                <ul>
                    <li>2.2.1. <strong>Суроо номери</strong> - Массивдеги иретти сактайт. Максималдуу 65,534 суроо.</li>
                    <li>2.2.2. <strong>Топтун номери</strong> - Бир топко кирген суроолор маңызы боюнча бирдей. Туш келди тандоодо бир топтон бир гана суроо тандалат. <strong>Оптимизация</strong> топтун номерин эң кичине суроо номерине ылайыктайт.</li>
                    <li>2.2.3. <strong>Суроонун тексти</strong> - Суроонун өзүнүн тексти. Сүрөттөр азырынча колдоого алынбайт.</li>
                    <li>2.2.4. <strong>Варианттар</strong> - Бир суроого 0дөн 255ке чейин вариант.</li>
                    <li>2.2.5. <strong>Белги (Чек)</strong> - Ар бир вариантта бирден белги болот.
                        <ul>
                            <li>Тест: Белгиси бар варианттар туура жооптор.</li>
                            <li>Кыска жооп: Бардык варианттар белгилениши керек; студенттин жообу алардын бирине дал келиши керек.</li>
                            <li>Кеңири жооп: Варианттар жок же бардык белгилер алынган.</li>
                        </ul>
                    </li>
                </ul>
                <p>2.3. <strong>Суроонун түрүн аныктоо</strong></p>
                <ul>
                    <li>2.3.1. Варианттары жок: <strong>Кеңири жооп</strong></li>
                    <li>2.3.2. Варианттар бар жана баары белгиленген: <strong>Кыска жооп</strong></li>
                    <li>2.3.3. Варианттар бар жана баары белгиленбеген: <strong>Кеңири жооп</strong></li>
                    <li>2.3.4. 2+ вариант жана бирөө гана белгиленген: <strong>Бир жооптуу тест</strong></li>
                    <li>2.3.5. Башка учурлар (2+ вариант, бир нече белгиленген): <strong>Бир нече жооптуу тест</strong></li>
                </ul>
            `
        }
    }
};
