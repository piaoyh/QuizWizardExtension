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
        ui: {
            "help-title": "QuizWiz 도움말",
            "coming-soon": "{title}에 대한 상세 설명이 준비 중입니다."
        },
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
            "exam-scope": "출제 범위에 대하여",
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
                <p>문제 은행은 헤더와 문제들으로 구성된다.</p>
                <h3>1. 헤더</h3>
                <p>헤더는 문제를 출제할 때에 시험지의 처음에 나타나는 사항들에 대한 정보를 갖고 있다.</p>
                <p>1.1. 헤더의 편집은 <strong>문제 은행 > 헤더 편집</strong>에서 할 수 있다.</p>
                <p>1.2. 헤더에는 제목, 이름, 학번, 문제 유형의 명칭들 및 주의 사항 등으로 구성되어 있다.</p>
                <ul>
                    <li>1.2.1. <strong>제목</strong>: 수학 기말고사, 과학 중간고사 등의 시험지에 나타나는 시험의 이름이다. 시험지에 출력될 때에는 볼드체의 큰 글꼴 크기로 출력된다.</li>
                    <li>1.2.2. <strong>이름</strong>: 시험지에 나타나는 이름이라는 단어이다. 즉, '이름'이라고 입력하면 시험지에 '이름:'이라고 나타나고 '성명'이라고 입력하면 '성명:'이라고 나타난다.</li>
                    <li>1.2.3. <strong>ID</strong>: 수험생의 고유번호이다. '학번'이라고 입력하면 시험지에 '학번:'이라고 나타나고 '수험번호'라고 입력하면 '수험번호:'라고 나타난다.</li>
                    <li>1.2.4. <strong>단일 선택형 객관식</strong>: '가 형'으로 입력하면 시험지에 문제 번호 다음에 '[가 형]' 으로 문제 앞에 인쇄된다. 이를 통해 수험생은 그 문제가 '가 형' 문제라는 것을 알게 된다. 아무것도 입력을 하지 않으면 빈 괄호 [ ]만 나타나므로 미관상 좋지 않다.</li>
                    <li>1.2.5. <strong>복수 응답형 객관식</strong>: '나 형'으로 입력하면 시험지에 문제 번호 다음에 '[나 형]' 으로 문제 앞에 인쇄된다. 이를 통해 수험생은 그 문제가 '나 형' 문제라는 것을 알게 된다. 아무것도 입력을 하지 않으면 빈 괄호 [ ]만 나타나므로 미관상 좋지 않다.</li>
                    <li>1.2.6. <strong>단답형 주관식</strong>: '다 형'으로 입력하면 시험지에 문제 번호 다음에 '[다 형]' 으로 문제 앞에 인쇄된다. 이를 통해 수험생은 그 문제가 '다 형' 문제라는 것을 알게 된다. 아무것도 입력을 하지 않으면 빈 괄호 [ ]만 나타나므로 미관상 좋지 않다.</li>
                    <li>1.2.7. <strong>논술형 주관식</strong>: '라 형'으로 입력하면 시험지에 문제 번호 다음에 '[라 형]' 으로 문제 앞에 인쇄된다. 이를 통해 수험생은 그 문제가 '라 형' 문제라는 것을 알게 된다. 아무것도 입력을 하지 않으면 빈 괄호 [ ]만 나타나므로 미관상 좋지 않다.</li>
                    <li>1.2.8. <strong>주의 사항</strong>: 시험 안내 사항이다. 시험의 주의 사항을 입력한다. 시험지의 제목 아래에 이름과 ID가 나타나고, 그 아래에 '주의 사항'에 입력한 내용이 인쇄되고, 그 아래부터 문제가 시작된다. '주의 사항'에 특별히 넣을 내용이 없다면, 그냥 '시험 잘 보세요!' 등의 축복 메시지를 넣어도 된다.</li>
                </ul>
                <p>1.3. <strong>기본 헤더 내용</strong> 버튼: 이 버튼을 누르면 미리 저장된 기본 내용들이 선택한 '언어'에 따라 '제목'을 제외한 모든 빈 칸에 자동으로 입력된다. 사용자는 기본 내용에서 원하는 부분만 고치면 된다. '주의 사항'에는 사용자가 택한 '채점 방식'과 '언어'에 따라 미리 정해 놓은 문제 유형에 대한 설명과 채점방식이 자동으로 입력된다.</p>
                <h3>2. 문제들</h3>
                <p>2.1. 문제들의 유형은 모두 네 가지의 유형을 지원한다: <strong>단일 선택형 객관식</strong>, <strong>복수 응답형 객관식</strong>, <strong>단답형 주관식</strong> 및 <strong>논술형 주관식</strong>. 현재로서는 연결형 문제 유형은 지원하지 않는다. O-X 이진형 문제는 이지선다형 객관식 문제로 구현할 수 있다.</p>
                <ul>
                    <li>2.1.1. <strong>단일 선택형 객관식</strong>: 다지선다형 객관식 문제로서, 선택지들 중에서 하나만이 정답이다.</li>
                    <li>2.1.2. <strong>복수 응답형 객관식</strong>: 다지선다형 객관식 문제로서, 선택지들 중에서 두 개 이상이 정답이다.</li>
                    <li>2.1.3. <strong>단답형 주관식</strong>: 주관식 문제로서, 정답이 한 단어 또는 두 단어 이상의 짧은 표현으로 이루어진다.</li>
                    <li>2.1.4. <strong>논술형 주관식</strong>: 주관식 문제로서, 정답이 한 단락 이상으로 이루어진다.</li>
                </ul>
                <p>2.2. 문제들의 배열의 각각의 문제는 문제 번호와 그룹 번호와 문제 텍스트와 선택지들과 각 선택지의 체크 마크로 구성된다.</p>
                <ul>
                    <li>2.2.1. <strong>문제 번호</strong>: 문제들의 배열에서의 각 문제의 순서에 따른다. 문제 번호는 수업의 진도 순서대로 증가하는 것이 바람직하다. 나중에 시험 범위를 문제 번호를 기준으로 정하기 때문이다. 최대 6,5534개까지 가능하다.</li>
                    <li>2.2.2. <strong>그룹 번호</strong>: 같은 그룹에 속한 문제들은 표현만 달랐지 사실상 같은 문제들이다. 무작위로 추출될 때 한 그룹에서 한 문제만 선택된다. 이를 통해 학생별로 다양하지만 사실상 같은 문제를 배정할 수 있다. <strong>최적화</strong>를 실행하면 그룹 번호는 그 그룹 내 가장 작은 문제 번호로 자동 조정된다.</li>
                    <li>2.2.3. <strong>문제 텍스트</strong>: 질문 텍스트이며 여러 줄 입력이 가능하지만, 현재 그림 포함은 지원하지 않는다.</li>
                    <li>2.2.4. <strong>선택지들</strong>: 한 문제당 0개에서 최대 255개까지 가능하다.</li>
                    <li>2.2.5. <strong>체크 마크</strong>: 각 선택지마다 하나의 체크 마크를 가진다.
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
            `,
            "qbank-editing": `
                <p>문제 은행의 편집에서는 한 문제를 하나의 문제 카드에서 작성하도록 되어 있다.</p>
                <h3>1. 사용자 입력사항</h3>
                <p>문제 카드에서 사용자는 그룹 번호, 문제 텍스트, 선택지 택스트, 체크 마크를 입력해야 한다.</p>
                <ul>
                    <li>1.1. <strong>그룹 번호</strong>: 그 문제가 속한 그룹을 정하는 숫자이다. 숫자 외의 문자는 입력이 불가능하며, 1부터 6,5534까지만 입력이 가능하다.</li>
                    <li>1.2. <strong>문제 텍스트</strong>: 여러 줄의 문제를 자유롭게 입력할 수 있다.</li>
                    <li>1.3. <strong>선택지 택스트</strong>: 여러 줄의 선택지를 자유롭게 입력할 수 있다.</li>
                    <li>1.4. <strong>체크 마크</strong>: 마우스로 클릭하여 체크와 언체크를 전환할 수 있다.</li>
                </ul>
                <h3>2. 편집 도구들</h3>
                <p>편집 도구들으로는 위쪽 밴드에 두 개의 문제 번호 입력창, <strong>->V<- 문제 삽입</strong> 버튼, <strong>= 문제 복제</strong> 버튼, <strong>+ 문제 추가</strong> 버튼, <strong>- 문제 삭제</strong> 버튼 및 <strong>토글</strong> 버튼이 있다. <strong>토글</strong> 버튼을 누르면 모든 것들이 두 개의 선택지 번호 입력창, <strong>->V<- 선택지 삽입</strong> 버튼, <strong>= 선택지 복제</strong> 버튼, <strong>+ 선택지 추가</strong> 버튼, <strong>- 선택지 삭제</strong> 버튼으로 바뀐다. 1번 문제 카드에는 <strong>아래로</strong> 버튼이 있고 마지막 문제 카드에는 <strong>위로</strong> 버튼이 있다. 그 외의 다른 문제 카드들에는 <strong>위로</strong> 버튼과 <strong>아래로</strong> 버튼이 있다.</p>
                <ul>
                    <li>2.1. <strong>+ 문제 추가</strong> 버튼: 문제 카드들의 맨 마지막에 문제 카드 하나를 추가한다. 추가된 문제 카드는 그 문제 번호와 같은 그룹 번호를 갖게 된다.</li>
                    <li>2.2. <strong>- 문제 삭제</strong> 버튼: 포커스가 있는 문제 카드를 삭제한다.</li>
                    <li>2.3. <strong>= 문제 복제</strong> 버튼: 포커스가 있는 문제 카드와 그 다음 카드 사이에 문제 카드 하나를 삽입하고, 포커스가 있는 문제 카드의 모든 내용을 새로 삽입된 문제 카드에 복제한다. 이는 비슷한 문제를 만들 때에 유용하다. 사용자의 타이핑의 수고와 복사&붙여넣기의 수고를 덜어 주기 때문이다. 새로 삽입된 문제 카드는 이전 문제 카드의 그룹 번호와 같은 그룹 번호를 갖게 된다. 물론, 그룹 번호는 사용자가 다시 바꿀 수 있다. 같은 그룹에 속하고 표현만 다른 사실상 같은 문제를 만드는 데에 유용하다.</li>
                    <li>2.4. <strong>->V<- 문제 삽입</strong> 버튼: 이 버튼의 왼쪽에 있는 두 개의 문제 번호 입력창에 입력된 문제 번호 사이에 새로운 빈 문제 카드를 끼워 넣어 준다. 삽입된 문제 카드는 그 문제 번호와 같은 그룹 번호를 갖게 된다.</li>
                    <li>2.5. <strong>두 개의 문제 번호 입력창</strong>: 완쪽의 입력창에는 끼워 넣을 문제의 앞 문제의 번호를 입력하고, 오른쪽의 입력창에는 끼워 넣을 문제의 다음 문제 번호를 입력한다. 완쪽의 입력창에 문제 번호를 입력하면 자동으로 오른쪽 입력창에 다음 문제 번호가 입력된다. 또한, 오른쪽 입력창에 문제 번호를 입력하면 자동으로 완쪽의 입력창에 이전 문제 번호가 입력된다. <strong>->V<- 문제 삽입</strong> 버튼을 누르면 이 두 문제 번호 입력창에 입력된 문제 번호의 문제들 사이에 새로운 문제 카드가 삽입된다.</li>
                    <li>2.6. <strong>토글</strong> 버튼: 이 번튼을 누름으로써 문제 편집 모드과 선택지 편집 모드를 전환할 수 있다.</li>
                    <li>2.7. <strong>+ 선택지 추가</strong> 버튼: 포커스가 있는 문제 카드에서 맨 마지막에 선택지 하나를 추가한다.</li>
                    <li>2.8. <strong>- 선택지 삭제</strong> 버튼: 포커스가 있는 선택지를 삭제한다.</li>
                    <li>2.9. <strong>= 선택지 복제</strong> 버튼: 포커스가 있는 선택지와 그 다음 선택지 사이에 선택지 하나를 삽입하고, 포커스가 있는 선택지의 모든 내용을 새로 삽입된 선택지에 복제한다. 이는 비슷한 선택지를 만들 때에 유용하다. 사용자의 타이핑의 수고와 복사&붙여넣기의 수고를 덜어 주기 때문이다.</li>
                    <li>2.10. <strong>->V<- 선택지 삽입</strong> 버튼: 이 버튼의 왼쪽에 있는 두 개의 선택지 번호 입력창에 입력된 선택지 번호 사이에 새로운 빈 선택지를 끼워 넣어 준다.</li>
                    <li>2.11. <strong>두 개의 선택지 번호 입력창</strong>: 완쪽의 입력창에는 끼워 넣을 선택지의 앞 선택지의 번호를 입력하고, 오른쪽의 입력창에는 끼워 넣을 선택지의 다음 선택지 번호를 입력한다. 완쪽의 입력창에 선택지 번호를 입력하면 자동으로 오른쪽 입력창에 다음 선택지 번호가 입력된다. 또한, 오른쪽 입력창에 선택지 번호를 입력하면 자동으로 완쪽의 입력창에 이전 선택지 번호가 입력된다. <strong>->V<- 선택지 삽입</strong> 버튼을 누르면 이 두 선택지 번호 입력창에 입력된 선택지 번호의 선택지들 사이에 새로운 선택지가 삽입된다.</li>
                    <li>2.12. <strong>위로</strong> 버튼: 문제의 순서는 수업의 진도와 밀접한 관련이 있다. 따라서, 문제 은행을 편집하다보면 문제들의 순서를 앞뒤로 바꾸어야 할 경우가 많다. 이 버튼을 누르면 그 문제가 위(이전)의 문제와 그 위치를 교환한다. 이동후에도 포커스는 이 버튼을 누른 문제 카드에 있다.</li>
                    <li>2.13. <strong>아래로</strong> 버튼: 이 버튼을 누르면 그 문제가 아래(다음)의 문제와 그 위치를 교환한다. 이동후에도 포커스는 이 버튼을 누른 문제 카드에 있다.</li>
                </ul>
            `,
            "qbank-usage": `
                <p>문제 은행은 좋은 문제들을 수업의 진도 순서에 따라 관리함으로써 학생들을 양질의 문제로 평가할 수 있는 좋은 방안이다.</p>
                <h3>1. 그룹 시스템의 활용</h3>
                <ul>
                    <li>1.1. 그룹 시스템의 목적은 표현만 다른 여러 개의 동일한 문제들을 문제 은행에 구비해 둠으로써 같은 문제라도 다양하게 출제할 수 있는 데에 있다. 또한, 학생들이 부정 행위를 시도하는 경우에도 학생들에게 같은 문제이지만 서로 다른 문제인 것처럼 보이게 함으로써 부정 행위를 더욱 어렵게 하기 위한 다른 목적도 있다. 시험 감독자가 감시하는 긴장된 상황에서는, 친구의 시험지에 있는 문제가 자신의 시험지에 있는 문제와 표현만 달랐지 사실상 같은 문제라는 것을 인식하기는 극도로 어려울 것이다.</li>
                    <li>1.2. 출제자의 실수에 의해 어떤 문제는 다른 문제의 힌트가 되는 경우도 있다. 그런 경우에도 서로 힌트가 되는 문제들을 같은 그룹으로 묶어 두면 이 문제들은 절대로 한 시험지에 같이 출제되지 않는다.</li>
                    <li>1.3. 그 외에도 출제자의 판단에 따라 복수의 서로 다른 문제들이 한 시험지에 같이 출제되어서는 안 된다고 판단되는 경우에는 그 문제들을 한 그룹으로 묶어 놓으면 그 문제들이 함께 같은 시험지에 출제되는 것을 방지할 수 있다.</li>
                </ul>
                <h3>2. 문제 은행 통계의 활용</h3>
                <ul>
                    <li>2.1. 문제 은행에서 일정 범위 내에 있는 문제들이 무작위로 선택되어 출제되도록 함에 있어서, 의사 난수 발생기는 필수적이다. 본 제품에서 사용된 의사 난수 발생기는 통계학적으로도 안전할 뿐만 아니라 암호학적으로도 안전한 의사 난수 발생기이다. 따라서, 문제 은행에서 객관식 문제의 정답의 분포가 편향되어 있더라도 실재 출제되는 시험 문제에서의 문제의 선택의 무작위성과 선택지 중에서의 정답의 분포의 무작위성이 보장된다. 하지만, 문제 은행의 각 객관식 문제의 정답의 분포가 치우치지 않고 일정하다면 정답 분포의 무작위성이 더욱 확고해질 것이다.</li>
                    <li>2.2. 문제 은행에서의 객관식 문제들의 정답 분포의 통계를 볼 수 있어서 원본 문제 은행의 정답 분포를 조정할 수 있다.</li>
                    <li>2.3. 문제 은행에서 <strong>단일 선택형 객관식</strong>, <strong>복수 응답형 객관식</strong>, <strong>단답형 주관식</strong> 및 <strong>논술형 주관식</strong> 등 4가지 유형의 문제들의 개수를 조사함으로써 문제 은행을 더 체계적으로 관리할 수 있다.</li>
                </ul>
                <h3>3. 주관식 문제 유형의 정답 및 모범답안 활용</h3>
                <ul>
                    <li>3.1. 문제 은행에서 <strong>단답형 주관식</strong> 문제의 복수개의 정답들은 자기 주도 학습의 평가에서 사용자가 입력한 답이 복수개의 정답들 중에 하나라도 일치하면 정답으로 처리된다. 따라서, 같은 답을 여러 가지로 표현가능한 것들은 모두 선택지 란에 기록하는 것이 나중에 답안지 채점에도 유리하고 자기 주도 학습에도 유리하다.</li>
                    <li>3.2. 문제 은행에서 <strong>논술형 주관식</strong> 문제의 하나 또는 복수개의 모범답안들은 자기 주도 학습의 평가에서는 논술형 주관식 문제 자체가 평가 대상에서 제외되기 때문에 별 의미가 없지만, 나중에 답안지 채점에서는 교수자가 논술형 주관식 문제를 채점할 때에 일관성을 확보하는 데에 유리하다.</li>
                    <li>3.3. 문제 은행에서 모든 선택지가 체크되어 있으면 그 문제는 <strong>단답형 주관식</strong> 문제로 해석되고, 단답형 주관식 문제의 정답은 한정되어 있기 때문에 수험생의 답이 정답들 중 하나와 일치해야 답으로 인정된다. 따라서, 모든 선택지가 체크되는 것이 철학적으로도 의미가 있다.</li>
                    <li>3.4. 문제 은행에서 모든 선택지가 체크 해제되어 있거나 선택지가 아예 없으면 그 문제는 <strong>논술형 주관식</strong> 문제로 해석되고, 논술형 주관식 문제의 정답은 열려 있기 때문에 출제자의 답도 정답이 아니라 모범답안이 된다. 모범답안은 완벽할 수 없고 복수개가 존재할 수도 있다. 따라서, 선택지 란에 쓰여진 출제자의 답은 정답이 아니라 모범답안이므로 모든 선택지가 체크 해제되는 것이 철학적으로도 의미가 있다.</li>
                </ul>
                <h3>4. 문제 은행의 성장 및 진화</h3>
                <ul>
                    <li>4.1. 교수자가 학생들을 가르치면서 수시로 문제 은행에 새로운 문제들을 추가하거나 기존의 문제들 중에서 저품질의 문제들을 삭제할 수 있다. 이러한 방법으로 문제 은행은 더 많은 양질의 문제들을 보유할 수 있게 된다.</li>
                    <li>4.2. 교수자는 문제 은행에서 문제들을 약간씩 변형하면서 새로운 문제들을 만들어 같은 그룹에 속하게 할 수 있다. 이러한 방법으로 교수자는 문제 은행을 부풀릴 수 있다.</li>
                    <li>4.3. 학생들이 공부를 열심히 하지 않는 상황이라면, 교수자는 문제 은행을 공개하고 학생들이 QuizWiz를 자신의 컴퓨터에 설치한 후에 학생들이 공개된 문제 은행 파일을 내려받아 자기 주도 학습 기능으로 스스로 문제를 풀어가며 자습하는 습관을 이끌어 낼 수 있다.</li>
                </ul>
            `,
            "exam-random": `
                <h3>1. 문제 은행으로부터의 시험 문제의 추출</h3>
                <ul>
                    <li>1.1. <strong>출제 범위</strong>: 문제 은행에서의 문제 번호의 범위로 결정된다.</li>
                    <li>1.2. <strong>무작위 추출</strong>: 문제 은행에서 출제 범위 내에 있는 문제들을 출제 문항 수만큼 통계학적으로뿐만 아니라 암호학적으로도 안전하게 무작위로 추출한다.</li>
                    <li>1.3. <strong>출제 문항 수</strong>: 출제 문항 수는 출제 범위 내에 있는 문제들의 그룹들의 수를 넘을 수 없다.</li>
                    <li>1.4. <strong>그룹 당 문항 수</strong>: 같은 그룹에 있는 문항들은 0개 또는 1개 출제되며 절대로 2개 이상의 문항이 같은 그룹에서 출제되지 않는다.</li>
                    <li>1.5. <strong>문제 순서 셔플</strong>: 출제된 문제들은 통계학적으로뿐만 아니라 암호학적으로도 안전하게 무작위로 그 순서가 섞인다.</li>
                    <li>1.6. <strong>선택지 순서 셔플</strong>: 출제된 각 문제들의 선택지들의 순서도 통계학적으로뿐만 아니라 암호학적으로도 안전하게 무작위로 그 순서가 섞인다.</li>
                </ul>
                <h3>2. 문제 은행으로부터 추출된 시험 문제의 정답</h3>
                <ul>
                    <li>2.1. <strong>정답의 변경</strong>: 객관식 문제의 경우, 문제 은행으로부터 무작위로 추출된 후 무작위로 그 문제들의 순서가 섞이고 각각의 문제의 선택지의 순서도 무작위로 섞이므로 각 추출된 문제들의 정답들도 문제 은행에서의 원본 문제들의 정답들과 달라지게 된다.</li>
                    <li>2.2. <strong>정답 세트 제공</strong>: 추출된 문제들의 세트를 위한 정답들의 세트도 함께 제공된다.</li>
                </ul>
            `,
            "exam-scope": `
                <h3>1. 문제 은행의 문제들의 순서</h3>
                <ul>
                    <li>1.1. 당연한 이야기이겠지만, 출제 범위의 결정은 수업의 진도와 밀접한 관련이 있다. 따라서, 문제 은행의 문제들의 순서는 수업의 진도와 같아야 한다.</li>
                    <li>1.2. 출제 범위는 문제 은행에서 몇 번 문제부터 몇 번 문제까지의 형식으로 결정된다.</li>
                    <li>1.3. 문제 은행의 문제들의 순서가 수업의 진도와 같지 않으면 출제 범위를 합리적으로 선정하기가 매우 어려워진다.</li>
                </ul>
                <h3>2. 출제 범위의 설정</h3>
                <ul>
                    <li>2.1. 시험 문제 출제를 위한 출제 범위와 자기 주도 학습을 위한 학습 범위는 같은 정보를 공유한다.</li>
                    <li>2.2. 출제 범위의 형식은 문제 은행에서 몇 번 문제부터 몇 번 문제까지의 형식이다.</li>
                    <li>2.3. 출제 범위는 항상 시작 번호의 문제와 끝 번호의 문제를 포함한다. 예를 들어, 출제 범위가 50번부터 100번까지라고 하면 50번 문제와 100번 문제 모두 출제 범위에 포함되므로 시험 문제에 50번 문제와 100번 문제가 출제될 수도 있다.</li>
                </ul>
                <h3>3. 시험에 출제되는 문항 수</h3>
                <ul>
                    <li>3.1. 시험에 출제되는 문항 수 문제 은행에서 출제 범위 내에 있는 문제들의 수를 넘을 수 없다.</li>
                    <li>3.2. 시험에 출제되는 문항 수 문제 은행에서 출제 범위 내에 있는 문제들이 속한 그룹들의 수를 넘을 수 없다.</li>
                    <li>3.3. <strong>시험에 출제되는 문항 수</strong> &le; <strong>문제 은행에서 출제 범위 내에 있는 문제들이 속한 그룹들의 수</strong> &le; <strong>문제 은행에서 출제 범위 내에 있는 문제들의 수</strong></li>
                </ul>
            `,
            "exam-relationship": `
                <h3>1. 문제 은행</h3>
                <ul>
                    <li>1.1. 문제 은행은 시험 문제를 학생들의 수만큼 생성하기 위한 주된 수단이다.</li>
                    <li>1.2. 문제 은행은 시험 문제를 관리하기 위한 직접적 수단이다.</li>
                    <li>1.3. 문제 은행은 학생들에게 서로 다른 고유한 시험지를 부여하기 위한 원천이 된다.</li>
                </ul>
                <h3>2. 학생 명단</h3>
                <ul>
                    <li>2.1. 학생 명단은 시험 문제를 학생들의 수만큼 생성하기 위한 보조 수단이다.</li>
                    <li>2.2. 학생 명단은 학생들을 관리하기 위한 수단이 아니라 수험생들의 목록을 관리하기 위한 수단이다.</li>
                    <li>2.3. 학생 명단은 학생들마다 서로 다른 고유한 시험지가 배당되는 역할을 한다.</li>
                </ul>
                <h3>3. 시험 문제 출제</h3>
                <ul>
                    <li>3.1. 학생 명단에 있는 학생들의 수만큼 문제 세트가 생성된다.</li>
                    <li>3.2. 학생 명단에 있는 모든 학생들에게 서로 다른 문제 세트가 부여된다.</li>
                    <li>3.3. 시험 문제가 학생 명단에 있는 학생들에게 배당될 때에는 미리 설정된 출제 범위와 미리 설정된 출제 문항 수에 따라 학생들마다 문제 은행에서 무작위로 새로 추출하여 문제 세트가 구성된다.</li>
                    <li>3.4. 예를 들면, 한 학생의 시험지에 있는 1번 문제가 다른 학생의 시험지에서 1번 문제가 된다는 보장이 없다. 또한, 그 1번 문제가 다른 학생의 시험지에서 7번 문제가 될 수도 있고 아예 없을 수도 있다.</li>
                </ul>
            `,
            "students-structure": `
                <h3>1. 학생 명단의 구성</h3>
                <ul>
                    <li>1.1. 학생 명단의 구조는 문제 은행의 구조에 비하면 매우 단순하다.</li>
                    <li>1.2. 학생 명단은 각 학생의 개별 정보들의 배열이다.</li>
                    <li>1.3. 각 학생의 정보는 학생의 성명과 학번으로 구성된다.</li>
                </ul>
                <h3>2. 학생 카드</h3>
                <ul>
                    <li>2.1. 한 명의 학생의 정보는 하나의 학생 카드에 기록된다.</li>
                    <li>2.2. 학생 카드에는 학생 성명과 학번을 입력할 수 있다.</li>
                    <li>2.3. 학생 성명은 성과 이름을 따로 나누지 않고 전체 이름을 입력한다. 이는 문화마다 성명의 구조 및 순서가 다르기 때문이다.</li>
                    <li>2.4. 학번은 학생의 숫자뿐만 아니라 문자도 포함할 수 있다.</li>
                    <li>2.5. 각각의 학생 카드에는 체크 박스가 있는데, 이는 학생 명단을 편집하기 위한 용도이고 정보의 일부분은 아니다.</li>
                </ul>
            `,
            "students-editing": `
                <p>학생 명단의 편집에서는 한 명의 학생을 하나의 학생 카드에서 작성하도록 되어 있다.</p>
                <h3>1. 사용자 입력사항</h3>
                <p>학생 카드에서 사용자는 성명과 학번을 입력해야 한다.</p>
                <ul>
                    <li>1.1. <strong>성명</strong>: 그 학생의 성명이다. 성과 이름과 부칭 등을 따로 입력하지 않고 한꺼번에 입력한다. 나라마다 문화마다 이름의 구성이 다르고 같은 나라에서도 종족마다 이름의 구성이 다르다. 본 앱은 학생관리가 목적이 아니라 문제 은행의 관리가 주목적이므로 이름의 구성성분들을 구분하지 않는 것이 더 편할 것이다.</li>
                    <li>1.2. <strong>학번</strong>: 숫자뿐만 아니라 문자들도 입력가능하다.</li>
                    <li>1.3. <strong>체크박스</strong>: 입력 사항이 아니라 편집 도구이다.</li>
                </ul>
                <h3>2. 편집 도구들</h3>
                <p>편집 도구들으로는 위쪽 밴드에 <strong>모두 선택</strong> 버튼, <strong>선택 반전</strong> 버튼, <strong>+ 학생 추가</strong> 버튼, <strong>- 학생 제외</strong> 버튼 및 각 학생카드에 있는 체크박스가 있다.</p>
                <ul>
                    <li>2.1. <strong>+ 학생 추가</strong> 버튼: 학생 카드들의 맨 마지막에 학생 카드 하나를 추가한다.</li>
                    <li>2.2. <strong>- 학생 제외</strong> 버튼: 포커스가 있는 학생 카드를 삭제한다.</li>
                    <li>2.3. <strong>체크박스</strong>: 체크박스를 클릭하면 체크 마크가 나타나면서 그 학생이 선택되었음을 나타낸다. 다시 한 번 체크박스를 클릭하면 체크 마크가 사라지면서 그 학생이 선택되지 않았음을 나타낸다.</li>
                    <li>2.4. <strong>모두 선택</strong> 버튼: 모든 학생 카드를 선택한다. 일일이 선택하지 않고 일괄적으로 모두 선택한다. 소수의 학생들만 빼고 대부분의 학생들을 선택하는 경우에는 모두 선택을 실행한 후 선택하지 않을 학생들만 골라서 언체크하면 된다.</li>
                    <li>2.5. <strong>선택 반전</strong> 버튼: 선택과 미선택을 반전하는 버튼이다. 다수의 학생들을 선택할 필요가 있을 때에 선택하지 않을 학생들을 선택한 후에 <strong>선택 반전</strong> 버튼을 눌러서 선택을 반전시킬 수 있다.</li>
                    <li>2.6. <strong>최적화</strong>: 비어 있는 모든 학생 카드를 없앤다.</li>
                </ul>
            `,
            "students-usage": `
                <h3>1. 목적</h3>
                <p>학생 명단은 각각의 학생들에게 서로 다른 시험지로 시험을 보게 함으로써 부정 행위를 방지하기 위한 것이다.</p>
                <h3>2. 학생 맞춤형 인쇄</h3>
                <p>시험지들을 출력할 때에, 학생 명단에 있는 학생들의 성명과 학번이 각각의 시험지에 학생 맞춤형으로 인쇄된다.</p>
                <h3>3. 재시험 관리</h3>
                <p>재시험을 보는 학생들의 명단은 재시험 보는 학생들만을 선택하여 다른 파일로 따로 저장하여 관리하는 것이 재시험 시험지를 출력하는 데에 더 편리하다.</p>
            `,
            "selfstudy-prep": `
                <h3>1. 자기 주도 학습의 목적</h3>
                <ul>
                    <li>1.1. 교수자가 수험자 입장에서 모의 시험을 치루어 봄으로써 시간 배정, 문제의 난이도, 시험 상황에서의 긴장도 등을 체험해 봄으로써 문제 은행을 수정하거나 출제 문항 수를 현실성 있게 조절할 수 있도록 하는 데에 그 목적이 있다.</li>
                    <li>1.2. 학생들이 공부하는 습관이 들어 있지 않은 경우에 교수자는 문제 은행 파일을 학생들에게 나누어 주어서 학생들이 문제들을 스스로 풀어 보도록 함으로써 학습 내용을 익히고 공부하는 습관을 형성하도록 돕는 데에 다른 목적이 있다.</li>
                    <li>1.3. 학생들의 학업 의욕이 낮은 경우에 수험생들의 시험 공부를 돕는 데에 또 다른 목적이 있다.</li>
                </ul>
                <h3>2. 자기 주도 학습을 위한 전제 조건</h3>
                <ul>
                    <li>2.1 자기 주도 학습은 문제 은행을 불러오지 않고는 시작할 수 없다. 따라서 반드시 문제 은행을 불러와야 한다.</li>
                    <li>2.2. 문제 은행을 불러오면 비로소 학습 범위 설정이 활성화되어 학습 범위를 정할 수 있다. 학습 범위를 정하지 않으면 기본 설정으로 전체 범위가 학습 범위로 자동 설정된다.</li>
                    <li>2.3. 문제 은행을 불러오고 학습 범위를 정하면 비로소 자기 주도 학습을 시작할 수 있는 준비가 된 것이다.</li>
                </ul>
            `,
            "selfstudy-scoring": `
                <h3>1. 자기 주도 학습에서 배제되는 문제</h3>
                <p>자기 주도 학습에서는 논술형 주관식 문제를 채점하지 않는다.</p>
                <h3>2. 채점 방식의 종류</h3>
                <p>채점 방식에는 감점 여부와 부분 점수 여부에 따라 4가지로 나눌 수 있다.</p>
                <ul>
                    <li>2.1. <strong>감점이 있고 부분 점수가 있는 채점 방식</strong>: 감점과 부분 점수는 객관식 문제에만 적용되며, 단답형 주관식 문제는 부분 점수가 없고 틀려도 감점되지 않는다.
                        <ul>
                            <li>2.1.1. <strong>단일 선택형 객관식</strong>
                                <ul>
                                    <li>2.1.1.1. 정답을 맞힌 경우: 배정된 점수가 부여된다.</li>
                                    <li>2.1.1.2. 답을 선택하지 않거나 두 개 이상의 답을 선택한 경우: 0점이 부여된다.</li>
                                    <li>2.1.1.3. 하나의 오답을 택한 경우: <strong>배정된 점수</strong>/ (선택지의 개수 - 1)의 감점을 받는다.</li>
                                </ul>
                            </li>
                            <li>2.1.2. <strong>복수 응답형 객관식</strong>
                                <ul>
                                    <li>2.1.2.1. 선택한 답의 개수가 정답의 개수와 같고 선택한 모든 답이 정답인 경우: 배정된 점수가 부여된다.</li>
                                    <li>2.1.2.2. 선택한 답의 개수가 정답의 개수와 다른 경우: 0점이 부여된다.</li>
                                    <li>2.1.2.3. 선택한 답의 개수가 정답의 개수와 같은 경우: (<strong>선택지에서의 오답의 개수</strong> x <strong>선택한 정답의 개수</strong> - <strong>선택지에서의 정답의 개수</strong> x <strong>선택한 오답의 개수</strong>) x <strong>배정된 점수</strong> / <strong>선택지의 개수</strong> 점이 부여된다.</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>2.2. <strong>감점이 있고 부분 점수가 없는 채점 방식</strong>: 감점은 객관식 문제에만 적용되며, 단답형 주관식 문제는 틀려도 감점되지 않는다.
                        <ul>
                            <li>2.2.1. <strong>단일 선택형 객관식</strong>
                                <ul>
                                    <li>2.2.1.1. 정답을 맞힌 경우: 배정된 점수가 부여된다.</li>
                                    <li>2.2.1.2. 답을 선택하지 않거나 두 개 이상의 답을 선택한 경우: 0점을 받는다.</li>
                                    <li>2.2.1.3. 하나의 오답을 택한 경우: <strong>배정된 점수</strong>/ (선택지의 개수 - 1)의 감점을 받는다.</li>
                                </ul>
                            </li>
                            <li>2.2.2. <strong>복수 응답형 객관식</strong>
                                <ul>
                                    <li>2.2.2.1. 선택한 답의 개수가 정답의 개수와 같고 선택한 모든 답이 정답인 경우: 배정된 점수가 부여된다.</li>
                                    <li>2.2.2.2. 선택한 답의 개수가 정답의 개수와 다른 경우: 0점을 받는다.</li>
                                    <li>2.2.2.3. 선택한 답의 개수가 정답의 개수와 같고 오답을 포함하거나 정답 중 일부를 누락할 경우: <strong>배정된 점수</strong> / (<strong>선택지의 개수</strong> x (<strong>선택지의 개수</strong> - 1))의 감점을 받는다.</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>2.3. <strong>감점이 없고 부분 점수가 있는 채점 방식</strong>
                        <ul>
                            <li>2.3.1. <strong>단일 선택형 객관식</strong>
                                <ul>
                                    <li>2.3.1.1. 정답을 맞힌 경우: 배정된 점수가 부여된다.</li>
                                    <li>2.3.1.2. 그 외의 경우: 0점을 받는다.</li>
                                </ul>
                            </li>
                            <li>2.3.2. <strong>복수 응답형 객관식</strong>
                                <ul>
                                    <li>2.3.2.1. 선택한 답의 개수가 정답의 개수와 같고 선택한 모든 답이 정답인 경우: 배정된 점수가 부여된다.</li>
                                    <li>2.3.2.2. 선택한 답의 개수가 정답의 개수와 다른 경우: 0점을 받는다.</li>
                                    <li>2.3.2.3. 선택한 답의 개수가 정답의 개수와 같은 경우: <strong>배정된 점수</strong> x <strong>선택한 정답의 개수</strong> / <strong>선택지에서의 정답의 개수</strong> 점이 부여된다.</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>2.4. <strong>감점이 있고 부분 점수가 없는 채점 방식</strong>
                        <ul>
                            <li>2.4.1. <strong>단일 선택형 객관식</strong>
                                <ul>
                                    <li>2.4.1.1. 정답을 맞힌 경우: 배정된 점수가 부여된다.</li>
                                    <li>2.4.1.2. 그 외의 경우: 0점을 받는다.</li>
                                </ul>
                            </li>
                            <li>2.4.2. <strong>복수 응답형 객관식</strong>
                                <ul>
                                    <li>2.4.2.1. 선택한 답의 개수가 정답의 개수와 같고 선택한 모든 답이 정답인 경우: 배정된 점수가 부여된다.</li>
                                    <li>2.4.2.2. 그 외의 경우: 0점을 받는다.</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
                <h3>3. 채점 방식의 설정 공유</h3>
                <p>자기 주도 학습의 채점 방식 설정은 시험 문제 출제의 출제 범위 설정과 설정 값을 공유하므로 시험 문제 출제의 출제 범위 설정을 고치면 자동으로 자기 주도 학습의 채점 방식 설정도 바뀐다.</p>
            `,
            "selfstudy-usage": `
                <h3>1. 교수자</h3>
                <ul>
                    <li>1.1. 교수자는 문제 은행을 구축한 후에 스스로 문제 은행의 문제들을 풀어 봄으로써 문제들의 현실성을 가늠할 수 있는 도구로 자기 주도 학습을 활용할 수 있다.</li>
                    <li>1.2. 교수자는 시험 문제를 출제하기 전에 스스로 출제 범위의 문제들을 풀어 봄으로써 시험의 현실성을 가늠할 수 있는 도구로 자기 주도 학습을 활용할 수 있다.</li>
                </ul>
                <h3>2. 학생</h3>
                <p>이것은 교수자가 문제 은행을 공개할 경우에 의미있는 사항들이다.</p>
                <ul>
                    <li>2.1. 학생은 스스로 시험 문제들을 풀어 봄으로써 배운 내용을 복습하는 도구로 자기 주도 학습을 활용할 수 있다.</li>
                    <li>2.2. 학생은 시험 전에 스스로 시험 범위의 문제들을 풀어 봄으로써 시험을 준비하는 도구로 자기 주도 학습을 활용할 수 있다.</li>
                    <li>2.3. 교수자가 문제 은행을 공개하지 않은 경우에는, 학생은 배운 내용에 대하여 스스로 문제를 만들어 자신이 만든 문제를 풀어 봄으로써 실전 연습을 할 수도 있다.</li>
                </ul>
            `
        }
    },
    en: {
        ui: {
            "help-title": "QuizWiz Help",
            "coming-soon": "Detailed explanation for {title} is coming soon."
        },
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
                <p>The Question Bank consists of a header and questions.</p>
                <h3>1. Header</h3>
                <p>The header contains information about items that appear at the beginning of the exam paper when creating an exam.</p>
                <p>1.1. You can edit the header in <strong>Question Bank > Edit Header</strong>.</p>
                <p>1.2. The header consists of the title, name, ID, names of question types, and notices.</p>
                <ul>
                    <li>1.2.1. <strong>Title</strong>: The name of the exam, such as Math Final Exam or Science Midterm Exam. It is printed in a large, bold font on the exam paper.</li>
                    <li>1.2.2. <strong>Name</strong>: The word for 'Name' displayed on the exam paper. For example, if you enter 'Full Name', it will appear as 'Full Name:' on the paper.</li>
                    <li>1.2.3. <strong>ID</strong>: The unique identifier for the examinee. If you enter 'Student ID', it will appear as 'Student ID:' on the paper.</li>
                    <li>1.2.4. <strong>Single-choice question</strong>: If you enter 'Type A', it will be printed as '[Type A]' before the question number on the exam paper. This informs the examinee that the question is 'Type A'. If left blank, only empty brackets [ ] will appear.</li>
                    <li>1.2.5. <strong>Multiple-choice question</strong>: If you enter 'Type B', it will be printed as '[Type B]' before the question number. This informs the examinee that the question is 'Type B'. If left blank, only empty brackets [ ] will appear.</li>
                    <li>1.2.6. <strong>Short answer question</strong>: If you enter 'Type C', it will be printed as '[Type C]' before the question number. This informs the examinee that the question is 'Type C'. If left blank, only empty brackets [ ] will appear.</li>
                    <li>1.2.7. <strong>Essay question</strong>: If you enter 'Type D', it will be printed as '[Type D]' before the question number. This informs the examinee that the question is 'Type D'. If left blank, only empty brackets [ ] will appear.</li>
                    <li>1.2.8. <strong>Notice</strong>: Exam instructions. Enter the guidelines for the exam. The name and ID appear below the title, followed by the notice content, and then the questions begin. If there's nothing specific to include, you can add a simple message like 'Good luck!'.</li>
                </ul>
                <p>1.3. <strong>Default Header Content</strong> button: Clicking this button automatically fills all fields except the 'Title' with pre-saved default content based on the selected 'Language'. Users can then modify only the necessary parts. The 'Notice' section will be automatically populated with descriptions of question types and scoring rules based on the user's selected 'Scoring Rule' and 'Language'.</p>
                <h3>2. Questions</h3>
                <p>2.1. Four types of questions are supported: <strong>Single-choice question</strong>, <strong>Multiple-choice question</strong>, <strong>Short answer question</strong>, and <strong>Essay question</strong>. Matching questions are not currently supported. True/False questions can be implemented as two-choice objective questions.</p>
                <ul>
                    <li>2.1.1. <strong>Single-choice question</strong>: A multiple-choice question where only one option is correct.</li>
                    <li>2.1.2. <strong>Multiple-choice question</strong>: A multiple-choice question where two or more options are correct.</li>
                    <li>2.1.3. <strong>Short answer question</strong>: A subjective question where the answer is a single word or a short phrase.</li>
                    <li>2.1.4. <strong>Essay question</strong>: A subjective question where the answer consists of one or more paragraphs.</li>
                </ul>
                <p>2.2. Each question in the question array consists of a question number, group number, question text, choices, and a check mark for each choice.</p>
                <ul>
                    <li>2.2.1. <strong>Question Number</strong>: Follows the order of questions in the array. It is recommended to increase question numbers according to the progress of the class, as exam scopes are determined by question numbers. Up to 65,534 questions are possible.</li>
                    <li>2.2.2. <strong>Group Number</strong>: Questions in the same group are essentially the same question with different expressions. Only one question from a group is randomly selected for an exam. This allows for assigning different but equivalent questions to each student. Running <strong>Optimize</strong> automatically adjusts the group number to the smallest question number within that group.</li>
                    <li>2.2.3. <strong>Question Text</strong>: The text of the question. Multiple lines are supported, but images are currently not supported.</li>
                    <li>2.2.4. <strong>Choices</strong>: Between 0 and 255 choices are allowed per question.</li>
                    <li>2.2.5. <strong>Check Mark</strong>: Each choice has one check mark.
                        <ul>
                            <li>Objective: Checked choices are the correct answers.</li>
                            <li>Short Answer: All choices must be checked; if the student's response matches any of them, it is correct.</li>
                            <li>Essay: There should be no choices, or all check marks should be unchecked.</li>
                        </ul>
                    </li>
                </ul>
                <p>2.3. <strong>Determining Question Type by Choices and Check Marks</strong></p>
                <ul>
                    <li>2.3.1. Questions with no choices: <strong>Essay question</strong></li>
                    <li>2.3.2. Questions with choices where all check marks are checked: <strong>Short answer question</strong></li>
                    <li>2.3.3. Questions with choices where all check marks are unchecked: <strong>Essay question</strong></li>
                    <li>2.3.4. Questions with 2 or more choices where only one is checked: <strong>Single-choice question</strong></li>
                    <li>2.3.5. Others (2 or more choices, multiple checks): <strong>Multiple-choice question</strong></li>
                </ul>
            `,
            "qbank-editing": `
                <p>In Question Bank editing, each question is created in its own Question Card.</p>
                <h3>1. User Input Items</h3>
                <p>On a Question Card, users must enter the group number, question text, choice text, and check marks.</p>
                <ul>
                    <li>1.1. <strong>Group Number</strong>: A number that defines the group the question belongs to. Only digits are allowed, from 1 to 65,534.</li>
                    <li>1.2. <strong>Question Text</strong>: You can freely enter multi-line question text.</li>
                    <li>1.3. <strong>Choice Text</strong>: You can freely enter multi-line choice text.</li>
                    <li>1.4. <strong>Check Mark</strong>: Click with the mouse to toggle between checked and unchecked.</li>
                </ul>
                <h3>2. Editing Tools</h3>
                <p>The editing tools in the top band include two question number input fields, the <strong>->V<- Insert Question</strong> button, <strong>= Duplicate Question</strong> button, <strong>+ Add Question</strong> button, <strong>- Remove Question</strong> button, and the <strong>Toggle</strong> button. Pressing the <strong>Toggle</strong> button replaces these with two choice number input fields, the <strong>->V<- Insert Choice</strong> button, <strong>= Duplicate Choice</strong> button, <strong>+ Add Choice</strong> button, and <strong>- Remove Choice</strong> button. The first Question Card has a <strong>Down</strong> button, the last card has an <strong>Up</strong> button, and other cards have both <strong>Up</strong> and <strong>Down</strong> buttons.</p>
                <ul>
                    <li>2.1. <strong>+ Add Question</strong> button: Adds a new Question Card at the end. The added card will have a group number equal to its question number.</li>
                    <li>2.2. <strong>- Remove Question</strong> button: Deletes the Question Card that currently has focus.</li>
                    <li>2.3. <strong>= Duplicate Question</strong> button: Inserts a new Question Card between the focused card and the next one, copying all content from the focused card to the new one. This is useful for creating similar questions, saving effort on typing and copy-pasting. The new card inherits the group number of the original card, which can then be changed by the user. It's ideal for creating equivalent questions with different phrasing within the same group.</li>
                    <li>2.4. <strong>->V<- Insert Question</strong> button: Inserts a new blank Question Card between the question numbers entered in the two input fields to its left. The inserted card will have a group number equal to its question number.</li>
                    <li>2.5. <strong>Two Question Number Input Fields</strong>: Enter the preceding question number in the left field and the following question number in the right field. Typing in one field automatically updates the other. Clicking <strong>->V<- Insert Question</strong> places a new card between these two numbers.</li>
                    <li>2.6. <strong>Toggle</strong> button: Switch between question editing mode and choice editing mode.</li>
                    <li>2.7. <strong>+ Add Choice</strong> button: Adds a choice at the end of the focused Question Card.</li>
                    <li>2.8. <strong>- Remove Choice</strong> button: Deletes the focused choice.</li>
                    <li>2.9. <strong>= Duplicate Choice</strong> button: Inserts a choice between the focused one and the next, copying all content. Useful for creating similar choices efficiently.</li>
                    <li>2.10. <strong>->V<- Insert Choice</strong> button: Inserts a blank choice between the choice numbers entered in the two input fields to its left.</li>
                    <li>2.11. <strong>Two Choice Number Input Fields</strong>: Works similarly to the question number input fields, defining where a new choice should be inserted.</li>
                    <li>2.12. <strong>Up</strong> button: Since question order is related to class progress, you may need to reorder questions. This button swaps the current question with the preceding one. Focus remains on the moved card.</li>
                    <li>2.13. <strong>Down</strong> button: Swaps the current question with the following one. Focus remains on the moved card.</li>
                </ul>
            `,
            "qbank-usage": `
                <p>Managing a Question Bank in the order of class progress is an excellent way to evaluate students with high-quality questions.</p>
                <h3>1. Utilizing the Group System</h3>
                <ul>
                    <li>1.1. The purpose of the group system is to have multiple equivalent versions of the same question in the Question Bank. This allows for diverse question assignment and makes cheating more difficult as students receive different but equivalent questions. In a tense, proctored exam environment, it would be extremely difficult for a student to realize that a question on a friend's exam paper is actually identical to their own, just worded differently.</li>
                    <li>1.2. Sometimes a question might accidentally provide a hint for another question. By grouping such questions together, they will never appear on the same exam paper.</li>
                    <li>1.3. Any questions that you believe should not appear together on a single exam can be prevented from doing so by placing them in the same group.</li>
                </ul>
                <h3>2. Utilizing Question Bank Statistics</h3>
                <ul>
                    <li>2.1. A pseudo-random number generator (PRNG) is essential for randomly selecting questions from a specified range. The PRNG used in this product is both statistically and cryptographically secure. Thus, even if the distribution of correct answers in the Question Bank is biased, the randomness of question selection and answer distribution in the actual exam is guaranteed. However, a balanced distribution in the original bank further strengthens this randomness.</li>
                    <li>2.2. You can view statistics on the distribution of correct answers for objective questions and adjust the source Question Bank accordingly.</li>
                    <li>2.3. Statistics on the four question types (<strong>Single-choice question</strong>, <strong>Multiple-choice question</strong>, <strong>Short answer question</strong>, and <strong>Essay question</strong>) help in systematic management of the Question Bank.</li>
                </ul>
                <h3>3. Utilizing Answers and Model Answers for Subjective Questions</h3>
                <ul>
                    <li>3.1. For <strong>Short answer questions</strong>, a student's response is considered correct if it matches any of the multiple answers recorded in the Question Bank. Recording various valid expressions of the same answer in the choices is beneficial for both self-study and later manual grading.</li>
                    <li>3.2. For <strong>Essay questions</strong>, model answers are provided. While essay questions are excluded from automated self-study evaluation, model answers help instructors maintain consistency during manual grading.</li>
                    <li>3.3. Philosophically, a question with all choices checked is interpreted as a <strong>Short answer question</strong> because the answer is limited and must match one of the provided options.</li>
                    <li>3.4. A question with no choices or all choices unchecked is interpreted as an <strong>Essay question</strong>. Since essay answers are open-ended, the instructor's provided answers are 'model answers' rather than definitive 'correct answers'. Model answers can be multiple and are never truly exhaustive, which is why having them all unchecked is philosophically meaningful.</li>
                </ul>
                <h3>4. Growth and Evolution of the Question Bank</h3>
                <ul>
                    <li>4.1. Instructors can continuously improve the bank by adding new questions and removing low-quality ones based on teaching experience.</li>
                    <li>4.2. Instructors can create variations of existing questions and group them together to expand the bank's diversity.</li>
                    <li>4.3. If students are struggling, an instructor can share the Question Bank file. Students can then use QuizWiz's self-study feature on their own computers to practice and develop better study habits.</li>
                </ul>
            `,
            "exam-random": `
                <h3>1. Extraction of Exam Questions from Question Bank</h3>
                <ul>
                    <li>1.1. <strong>Exam Scope</strong>: Determined by the range of question numbers in the Question Bank.</li>
                    <li>1.2. <strong>Random Extraction</strong>: Questions within the exam scope are extracted randomly based on the specified number of questions, using a statistically and cryptographically secure method.</li>
                    <li>1.3. <strong>Number of Questions</strong>: The number of questions to be extracted cannot exceed the total number of groups within the specified scope.</li>
                    <li>1.4. <strong>Questions per Group</strong>: Either zero or one question is selected from each group; two or more questions from the same group will never be included in the same exam.</li>
                    <li>1.5. <strong>Question Shuffling</strong>: The sequence of the extracted questions is randomly shuffled using a statistically and cryptographically secure method.</li>
                    <li>1.6. <strong>Choice Shuffling</strong>: The order of choices for each extracted question is also randomly shuffled in a statistically and cryptographically secure manner.</li>
                </ul>
                <h3>2. Correct Answers for Extracted Questions</h3>
                <ul>
                    <li>2.1. <strong>Change of Answers</strong>: For objective questions, because the questions are randomly selected and shuffled, and the order of choices for each question is also randomized, the correct answer keys for the extracted questions will differ from those of the original questions in the bank.</li>
                    <li>2.2. <strong>Provision of Answer Key</strong>: An answer key corresponding to the extracted question set is provided together.</li>
                </ul>
            `,
            "exam-scope": `
                <h3>1. Order of Questions in Question Bank</h3>
                <ul>
                    <li>1.1. Naturally, determining the exam scope is closely related to class progress. Therefore, the order of questions in the Question Bank should align with the class progress.</li>
                    <li>1.2. The exam scope is defined in the format of "from question number X to question number Y" in the Question Bank.</li>
                    <li>1.3. If the question order in the bank does not match the class progress, it becomes very difficult to select a reasonable exam scope.</li>
                </ul>
                <h3>2. Setting the Exam Scope</h3>
                <ul>
                    <li>2.1. The exam scope for creating exam papers and the study scope for self-study share the same information.</li>
                    <li>2.2. The format of the exam scope is from question number X to question number Y in the Question Bank.</li>
                    <li>2.3. The exam scope always includes both the start number and the end number. For example, if the scope is from 50 to 100, both questions 50 and 100 are included in the scope and may appear on the exam.</li>
                </ul>
                <h3>3. Number of Questions in the Exam</h3>
                <ul>
                    <li>3.1. The number of questions in an exam cannot exceed the total number of questions within the specified scope in the Question Bank.</li>
                    <li>3.2. The number of questions in an exam cannot exceed the number of groups that the questions within the specified scope belong to.</li>
                    <li>3.3. <strong>Number of exam questions</strong> &le; <strong>Number of groups in scope</strong> &le; <strong>Number of questions in scope</strong></li>
                </ul>
            `,
            "exam-relationship": `
                <h3>1. Question Bank</h3>
                <ul>
                    <li>1.1. The Question Bank is the primary means of generating exam questions for each student.</li>
                    <li>1.2. The Question Bank is the direct means of managing exam questions.</li>
                    <li>1.3. The Question Bank serves as the source for providing different, unique exam papers to students.</li>
                </ul>
                <h3>2. Student List</h3>
                <ul>
                    <li>2.1. The Student List is a secondary means of generating exam questions for each student.</li>
                    <li>2.2. The Student List is not a means for managing students, but a means for managing the list of examinees.</li>
                    <li>2.3. The Student List plays the role of assigning a different, unique exam paper to each student.</li>
                </ul>
                <h3>3. Exam Setting</h3>
                <ul>
                    <li>3.1. A question set is generated for each student in the Student List.</li>
                    <li>3.2. A different question set is assigned to every student in the Student List.</li>
                    <li>3.3. When exam questions are assigned to students in the Student List, a question set is composed for each student by randomly extracting new questions from the Question Bank based on the pre-set exam scope and the pre-set number of questions.</li>
                    <li>3.4. For example, there is no guarantee that question number 1 on one student's exam paper will be question number 1 on another student's exam paper. Furthermore, that question number 1 might be question number 7 on another student's paper, or it might not be there at all.</li>
                </ul>
            `,
            "students-structure": `
                <h3>1. Composition of Student List</h3>
                <ul>
                    <li>1.1. The structure of the Student List is very simple compared to the Question Bank.</li>
                    <li>1.2. The Student List is an array of individual information for each student.</li>
                    <li>1.3. Each student's information consists of the student's full name and student ID number.</li>
                </ul>
                <h3>2. Student Card</h3>
                <ul>
                    <li>2.1. Information for one student is recorded on one Student Card.</li>
                    <li>2.2. You can enter the student's name and ID number on the Student Card.</li>
                    <li>2.3. Enter the full name without separating the first and last names. This is because the structure and order of names vary by culture.</li>
                    <li>2.4. The student ID number can include characters as well as numbers.</li>
                    <li>2.5. Each Student Card has a checkbox, which is used for editing the list and is not part of the information itself.</li>
                </ul>
            `,
            "students-editing": `
                <p>In Student List editing, each student's information is entered on an individual Student Card.</p>
                <h3>1. User Input Items</h3>
                <p>On a Student Card, users must enter the name and student ID.</p>
                <ul>
                    <li>1.1. <strong>Full Name</strong>: The student's full name. Enter the first name, last name, and middle name (if applicable) together. Since naming conventions vary across cultures and ethnic groups, it is more convenient for this app—whose primary focus is question bank management rather than student management—to not separate name components.</li>
                    <li>1.2. <strong>Student ID</strong>: Alphanumeric characters are allowed.</li>
                    <li>1.3. <strong>Checkbox</strong>: An editing tool rather than an input item.</li>
                </ul>
                <h3>2. Editing Tools</h3>
                <p>Editing tools include the <strong>Select All</strong>, <strong>Invert Selection</strong>, <strong>+ Add Student</strong>, and <strong>- Remove Students</strong> buttons on the top band, as well as the checkbox on each Student Card.</p>
                <ul>
                    <li>2.1. <strong>+ Add Student</strong> button: Adds a new Student Card at the end of the list.</li>
                    <li>2.2. <strong>- Remove Students</strong> button: Deletes the Student Card that currently has focus.</li>
                    <li>2.3. <strong>Checkbox</strong>: Clicking the checkbox displays a checkmark, indicating the student is selected. Clicking it again removes the checkmark, indicating the student is deselected.</li>
                    <li>2.4. <strong>Select All</strong> button: Selects all Student Cards at once. If you need to select most students except for a few, you can select all and then manually uncheck the ones you want to exclude.</li>
                    <li>2.5. <strong>Invert Selection</strong> button: Reverses the selection state for all students. If you need to select many students, you can first select the ones you want to exclude and then click <strong>Invert Selection</strong> to reverse the choice.</li>
                    <li>2.6. <strong>Optimize</strong>: Removes all empty Student Cards.</li>
                </ul>
            `,
            "students-usage": `
                <h3>1. Purpose</h3>
                <p>The Student List is used to prevent cheating by assigning a different, randomized exam paper to each student.</p>
                <h3>2. Personalized Printing</h3>
                <p>When printing exam papers, the names and student IDs from the list are printed on each corresponding student's personalized exam paper.</p>
                <h3>3. Re-examination Management</h3>
                <p>For re-examinations, it is more convenient to select only the students involved and save them as a separate file for managing and printing re-exam papers.</p>
            `,
            "selfstudy-prep": `
                <h3>1. Purpose of Self-study</h3>
                <ul>
                    <li>1.1. The purpose is to allow instructors to experience a mock exam from a student's perspective, feeling the time allocation, difficulty level, and nervousness under exam conditions, thereby enabling them to modify the Question Bank or adjust the number of questions realistically.</li>
                    <li>1.2. Another purpose is to help students who lack study habits by having instructors distribute Question Bank files so students can solve questions themselves, thereby learning the content and forming study habits.</li>
                    <li>1.3. Yet another purpose is to assist examinees in studying for exams when their academic motivation is low.</li>
                </ul>
                <h3>2. Prerequisites for Self-study</h3>
                <ul>
                    <li>2.1. Self-study cannot be started without loading a Question Bank. Therefore, you must load a Question Bank.</li>
                    <li>2.2. Once a Question Bank is loaded, the study scope setting becomes active, allowing you to define the study range. If no scope is set, the entire range is automatically set as the study scope by default.</li>
                    <li>2.3. Once a Question Bank is loaded and the study scope is defined, you are ready to begin self-study.</li>
                </ul>
            `,
            "selfstudy-scoring": `
                <h3>1. Questions Excluded from Self-study</h3>
                <p>In self-study, essay-type subjective questions (Essay questions) are not scored.</p>
                <h3>2. Types of Scoring Methods</h3>
                <p>Scoring methods can be divided into four types based on whether there is negative marking and whether partial credit is given.</p>
                <ul>
                    <li>2.1. <strong>Scoring with negative marking and partial credit</strong>: Negative marking and partial credit apply only to objective questions; short answer subjective questions have no partial credit and are not penalized for incorrect answers.
                        <ul>
                            <li>2.1.1. <strong>Single-choice objective question</strong>
                                <ul>
                                    <li>2.1.1.1. Correct answer: Assigned points are awarded.</li>
                                    <li>2.1.1.2. No answer or multiple answers: 0 points are awarded.</li>
                                    <li>2.1.1.3. One wrong answer: A deduction of <strong>assigned points</strong> / (number of choices - 1) is applied.</li>
                                </ul>
                            </li>
                            <li>2.1.2. <strong>Multiple-choice objective question</strong>
                                <ul>
                                    <li>2.1.2.1. Correct number of answers and all selected are correct: Assigned points are awarded.</li>
                                    <li>2.1.2.2. Number of selected answers differs from correct count: 0 points are awarded.</li>
                                    <li>2.1.2.3. Correct number of answers selected: (<strong>number of wrong options</strong> x <strong>number of selected correct answers</strong> - <strong>number of correct options</strong> x <strong>number of selected wrong answers</strong>) x <strong>assigned points</strong> / <strong>number of choices</strong> points are awarded.</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>2.2. <strong>Scoring with negative marking and without partial credit</strong>: Negative marking applies only to objective questions; short answer subjective questions are not penalized for incorrect answers.
                        <ul>
                            <li>2.2.1. <strong>Single-choice objective question</strong>
                                <ul>
                                    <li>2.2.1.1. Correct answer: Assigned points are awarded.</li>
                                    <li>2.2.1.2. No answer or multiple answers: 0 points are received.</li>
                                    <li>2.2.1.3. One wrong answer: A deduction of <strong>assigned points</strong> / (number of choices - 1) is applied.</li>
                                </ul>
                            </li>
                            <li>2.2.2. <strong>Multiple-choice objective question</strong>
                                <ul>
                                    <li>2.2.2.1. Correct number of answers and all selected are correct: Assigned points are awarded.</li>
                                    <li>2.2.2.2. Number of selected answers differs from correct count: 0 points are received.</li>
                                    <li>2.2.2.3. Correct number of answers selected but contains errors or omissions: A deduction of <strong>assigned points</strong> / (<strong>number of choices</strong> x (<strong>number of choices</strong> - 1)) is applied.</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>2.3. <strong>Scoring without negative marking and with partial credit</strong>
                        <ul>
                            <li>2.3.1. <strong>Single-choice objective question</strong>
                                <ul>
                                    <li>2.3.1.1. Correct answer: Assigned points are awarded.</li>
                                    <li>2.3.1.2. Otherwise: 0 points are received.</li>
                                </ul>
                            </li>
                            <li>2.3.2. <strong>Multiple-choice objective question</strong>
                                <ul>
                                    <li>2.3.2.1. Correct number of answers and all selected are correct: Assigned points are awarded.</li>
                                    <li>2.3.2.2. Number of selected answers differs from correct count: 0 points are received.</li>
                                    <li>2.3.2.3. Correct number of answers selected: <strong>assigned points</strong> x <strong>number of selected correct answers</strong> / <strong>number of correct options</strong> points are awarded.</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>2.4. <strong>Scoring without negative marking and without partial credit</strong>
                        <ul>
                            <li>2.4.1. <strong>Single-choice objective question</strong>
                                <ul>
                                    <li>2.4.1.1. Correct answer: Assigned points are awarded.</li>
                                    <li>2.4.1.2. Otherwise: 0 points are received.</li>
                                </ul>
                            </li>
                            <li>2.4.2. <strong>Multiple-choice objective question</strong>
                                <ul>
                                    <li>2.4.2.1. Correct number of answers and all selected are correct: Assigned points are awarded.</li>
                                    <li>2.4.2.2. Otherwise: 0 points are received.</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
                <h3>3. Sharing Scoring Rule Settings</h3>
                <p>Since the scoring rule settings for self-study share values with the exam scope settings in exam creation, changing the exam scope settings will automatically update the self-study scoring rule settings.</p>
            `,
            "selfstudy-usage": `
                <h3>1. Instructor</h3>
                <ul>
                    <li>1.1. After building the Question Bank, instructors can use self-study as a tool to gauge the practicality of the questions by solving them themselves.</li>
                    <li>1.2. Before creating an exam, instructors can use self-study as a tool to gauge the realism of the exam by solving questions within the exam scope themselves.</li>
                </ul>
                <h3>2. Student</h3>
                <p>These are meaningful items if the instructor chooses to disclose the Question Bank.</p>
                <ul>
                    <li>2.1. Students can use self-study as a tool to review what they have learned by solving exam questions themselves.</li>
                    <li>2.2. Before an exam, students can use self-study as a tool to prepare for the exam by solving questions within the exam scope themselves.</li>
                    <li>2.3. If the instructor does not disclose the Question Bank, students can create their own questions about the learned content and solve them for practical practice.</li>
                </ul>
            `
        }
    },
    ru: {
        ui: {
            "help-title": "Справка QuizWiz",
            "coming-soon": "Подробное описание для {title} скоро появится."
        },
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
                <p>Банк вопросов состоит из заголовка и вопросов.</p>
                <h3>1. Заголовок</h3>
                <p>Заголовок содержит информацию об элементах, которые появляются в начале экзаменационного листа при создании экзамена.</p>
                <p>1.1. Редактировать заголовок можно в меню <strong>Банк вопросов > Редактировать заголовок</strong>.</p>
                <p>1.2. Заголовок состоит из названия, имени, ID, названий типов вопросов и примечаний.</p>
                <ul>
                    <li>1.2.1. <strong>Заголовок</strong>: Название экзамена, например «Итоговый экзамен по математике» или «Промежуточный экзамен по физике». Оно печатается на экзаменационном листе крупным жирным шрифтом.</li>
                    <li>1.2.2. <strong>Имя</strong>: Слово для обозначения поля «Имя» на экзаменационном листе. Например, если вы введете «Ф.И.О.», оно появится как «Ф.И.О.:» на листе.</li>
                    <li>1.2.3. <strong>ID</strong>: Уникальный идентификатор студента. Если вы введете «Номер студенческого», оно появится как «Номер студенческого:» на листе.</li>
                    <li>1.2.4. <strong>Тест с одним правильным ответом</strong>: Если вы введете «Тип А», это будет напечатано как «[Тип А]» перед номером вопроса. Это сообщает студенту, что вопрос относится к типу А. Если оставить поле пустым, появятся только пустые скобки [ ].</li>
                    <li>1.2.5. <strong>Тест с несколькими правильными ответами</strong>: Если вы введете «Тип Б», это будет напечатано как «[Тип Б]» перед номером вопроса. Это сообщает студенту, что вопрос относится к типу Б. Если оставить поле пустым, появятся только пустые скобки [ ].</li>
                    <li>1.2.6. <strong>Задание с кратким ответом</strong>: Если вы введете «Тип В», это будет напечатано как «[Тип В]» перед номером вопроса. Это сообщает студенту, что вопрос относится к типу В. Если оставить поле пустым, появятся только пустые скобки [ ].</li>
                    <li>1.2.7. <strong>Задание с развёрнутым ответом</strong>: Если вы введете «Тип Г», это будет напечатано как «[Тип Г]» перед номером вопроса. Это сообщает студенту, что вопрос относится к типу Г. Если оставить поле пустым, появятся только пустые скобки [ ].</li>
                    <li>1.2.8. <strong>Примечание</strong>: Инструкции к экзамену. Введите правила проведения экзамена. Имя и ID отображаются под заголовком, за ними следует содержание примечания, а затем начинаются вопросы. Если ничего особенного добавлять не нужно, можно написать просто «Удачи!».</li>
                </ul>
                <p>1.3. Кнопка <strong>Заголовок по умолчанию</strong>: Нажатие этой кнопки автоматически заполняет все поля, кроме «Заголовка», предварительно сохранённым контентом в зависимости от выбранного «Языка». Пользователи могут изменять только необходимые части. Раздел «Примечание» будет автоматически заполнен описаниями типов вопросов и правилами оценки на основе выбранной пользователем «Системы оценивания» и «Языка».</p>
                <h3>2. Вопросы</h3>
                <p>2.1. Поддерживаются четыре типа вопросов: <strong>Тест с одним правильным ответом</strong>, <strong>Тест с несколькими правильными ответами</strong>, <strong>Задание с кратким ответом</strong> и <strong>Задание с развёрнутым ответом</strong>. Вопросы на соответствие в настоящее время не поддерживаются. Вопросы типа «Верно/Неверно» можно реализовать как тесты с двумя вариантами ответов.</p>
                <ul>
                    <li>2.1.1. <strong>Тест с одним правильным ответом</strong>: Тест, в котором только один вариант является правильным.</li>
                    <li>2.1.2. <strong>Тест с несколькими правильными ответами</strong>: Тест, в котором два или более вариантов являются правильными.</li>
                    <li>2.1.3. <strong>Задание с кратким ответом</strong>: Субъективный вопрос, ответом на который является одно слово или короткая фраза.</li>
                    <li>2.1.4. <strong>Задание с развёрнутым ответом</strong>: Субъективный вопрос, ответ на который состоит из одного или нескольких абзацев.</li>
                </ul>
                <p>2.2. Каждый вопрос в массиве состоит из номера вопроса, номера группы, текста вопроса, вариантов ответов и отметки для каждого варианта.</p>
                <ul>
                    <li>2.2.1. <strong>Номер вопроса</strong>: Соответствует порядку вопросов в массиве. Рекомендуется увеличивать номера вопросов в соответствии с прогрессом обучения, так как область экзамена определяется по номерам вопросов. Максимально возможно 65 534 вопроса.</li>
                    <li>2.2.2. <strong>Номер группы</strong>: Вопросы в одной группе по сути являются одним и тем же вопросом, выраженным по-разному. Для экзамена случайным образом выбирается только один вопрос из группы. Это позволяет назначать разные, но эквивалентные вопросы каждому студенту. При выполнении <strong>Оптимизации</strong> номер группы автоматически устанавливается равным наименьшему номеру вопроса в этой группе.</li>
                    <li>2.2.3. <strong>Текст вопроса</strong>: Текст самого вопроса. Поддерживается многострочный ввод, но изображения в настоящее время не поддерживаются.</li>
                    <li>2.2.4. <strong>Варианты ответов</strong>: От 0 до 255 вариантов ответов на один вопрос.</li>
                    <li>2.2.5. <strong>Отметка</strong>: Каждый вариант ответа имеет одну отметку.
                        <ul>
                            <li>Тесты: Отмеченные варианты являются правильными ответами.</li>
                            <li>Краткий ответ: Все варианты должны быть отмечены; если ответ студента совпадает с любым из них, он считается правильным.</li>
                            <li>Развёрнутый ответ: Вариантов быть не должно, либо все отметки должны быть сняты.</li>
                        </ul>
                    </li>
                </ul>
                <p>2.3. <strong>Определение типа вопроса по вариантам и отметкам</strong></p>
                <ul>
                    <li>2.3.1. Вопросы без вариантов: <strong>Задание с развёрнутым ответом</strong></li>
                    <li>2.3.2. Вопросы с вариантами, где все отметки установлены: <strong>Задание с кратким ответом</strong></li>
                    <li>2.3.3. Вопросы с вариантами, где все отметки сняты: <strong>Задание с развёрнутым ответом</strong></li>
                    <li>2.3.4. Вопросы с 2 или более вариантами, где отмечен только один: <strong>Тест с одним правильным ответом</strong></li>
                    <li>2.3.5. Остальное (2 или более вариантов, несколько отметок): <strong>Тест с несколькими правильными ответами</strong></li>
                </ul>
            `,
            "qbank-editing": `
                <p>При редактировании банка вопросов каждый вопрос создается в своей собственной карточке вопроса.</p>
                <h3>1. Элементы пользовательского ввода</h3>
                <p>В карточке вопроса пользователи вводят номер группы, текст вопроса, текст вариантов ответов и устанавливают отметки.</p>
                <ul>
                    <li>1.1. <strong>Номер группы</strong>: Число, определяющее группу, к которой относится вопрос. Разрешены только цифры от 1 до 65 534.</li>
                    <li>1.2. <strong>Текст вопроса</strong>: Вы можете свободно вводить многострочный текст вопроса.</li>
                    <li>1.3. <strong>Текст варианта</strong>: Вы можете свободно вводить многострочный текст варианта ответа.</li>
                    <li>1.4. <strong>Отметка</strong>: Нажмите мышью, чтобы переключить отметку.</li>
                </ul>
                <h3>2. Инструменты редактирования</h3>
                <p>Инструменты редактирования на верхней панели включают два поля ввода номеров вопросов, кнопку <strong>->V<- Вставить вопрос</strong>, кнопку <strong>= Дублировать вопрос</strong>, кнопку <strong>+ Добавить вопрос</strong>, кнопку <strong>- Удалить вопрос</strong> и кнопку <strong>Переключить</strong>. Нажатие кнопки <strong>Переключить</strong> заменяет их на два поля ввода номеров вариантов, кнопку <strong>->V<- Вставить вариант</strong>, кнопку <strong>= Дублировать вариант</strong>, кнопку <strong>+ Добавить вариант</strong> и кнопку <strong>- Удалить вариант</strong>. Первая карточка вопроса имеет кнопку <strong>Вниз</strong>, последняя — кнопку <strong>Вверх</strong>, а остальные — обе кнопки <strong>Вверх</strong> и <strong>Вниз</strong>.</p>
                <ul>
                    <li>2.1. Кнопка <strong>+ Добавить вопрос</strong>: Добавляет новую карточку вопроса в конец. Добавленная карточка будет иметь номер группы, равный её номеру вопроса.</li>
                    <li>2.2. Кнопка <strong>- Удалить вопрос</strong>: Удаляет карточку вопроса, которая в данный момент находится в фокусе.</li>
                    <li>2.3. Кнопка <strong>= Дублировать вопрос</strong>: Вставляет новую карточку вопроса между текущей и следующей, копируя всё содержимое из текущей карточки в новую. Это полезно для создания похожих вопросов, экономя время на ввод и копирование. Новая карточка наследует номер группы оригинальной карточки, который затем может быть изменён пользователем. Идеально подходит для создания эквивалентных вопросов с разными формулировками в рамках одной группы.</li>
                    <li>2.4. Кнопка <strong>->V<- Вставить вопрос</strong>: Вставляет новую пустую карточку вопроса между номерами вопросов, введёнными в двух полях слева от неё. Вставленная карточка будет иметь номер группы, равный её номеру вопроса.</li>
                    <li>2.5. <strong>Два поля ввода номера вопроса</strong>: Введите номер предыдущего вопроса в левое поле и номер следующего вопроса в правое. Ввод в одном поле автоматически обновляет другое. Нажатие <strong>->V<- Вставить вопрос</strong> помещает новую карточку между этими двумя номерами.</li>
                    <li>2.6. Кнопка <strong>Переключить</strong>: Переключение между режимом редактирования вопросов и режимом редактирования вариантов.</li>
                    <li>2.7. Кнопка <strong>+ Добавить вариант</strong>: Добавляет вариант ответа в конец текущей карточки вопроса.</li>
                    <li>2.8. Кнопка <strong>- Удалить вариант</strong>: Удаляет текущий вариант ответа.</li>
                    <li>2.9. Кнопка <strong>= Дублировать вариант</strong>: Вставляет вариант между текущим и следующим, копируя всё содержимое. Полезно для быстрого создания похожих вариантов.</li>
                    <li>2.10. Кнопка <strong>->V<- Вставить вариант</strong>: Вставляет пустой вариант между номерами вариантов, введёнными в двух полях слера от неё.</li>
                    <li>2.11. <strong>Два поля ввода номера варианта</strong>: Работают аналогично полям ввода номера вопроса, определяя место вставки нового варианта.</li>
                    <li>2.12. Кнопка <strong>Вверх</strong>: Поскольку порядок вопросов связан с прогрессом обучения, вам может потребоваться изменить их порядок. Эта кнопка меняет текущий вопрос местами с предыдущим. Фокус остается на перемещённой карточке.</li>
                    <li>2.13. Кнопка <strong>Вниз</strong>: Меняет текущий вопрос местами со следующим. Фокус остается на перемещённой карточке.</li>
                </ul>
            `,
            "qbank-usage": `
                <p>Ведение банка вопросов в соответствии с прогрессом обучения — отличный способ оценивать студентов с помощью качественных вопросов.</p>
                <h3>1. Использование системы групп</h3>
                <ul>
                    <li>1.1. Цель системы групп — иметь несколько эквивалентных версий одного и того же вопроса в банке вопросов. Это позволяет разнообразить задания и затрудняет списывание, так как студенты получают разные, но равнозначные вопросы. В напряженной атмосфере под надзором экзаменатора студенту будет крайне сложно осознать, что вопрос в тесте его друга на самом деле абсолютно идентичен его собственному и отличается лишь формулировкой.</li>
                    <li>1.2. Иногда вопрос может случайно содержать подсказку к другому вопросу. Сгруппировав такие вопросы вместе, вы гарантируете, что они никогда не появятся в одном экзаменационном листе.</li>
                    <li>1.3. Любые вопросы, которые, по вашему мнению, не должны встречаться вместе в одном экзамене, можно исключить из совместного появления, поместив их в одну группу.</li>
                </ul>
                <h3>2. Использование статистики банка вопросов</h3>
                <ul>
                    <li>2.1. Генератор псевдослучайных чисел (ГПСЧ) необходим для случайного выбора вопросов из заданного диапазона. ГПСЧ, используемый в этом продукте, является статистически и криптографически безопасным. Таким образом, даже если распределение правильных ответов в банке вопросов смещено, случайность выбора вопросов и распределения ответов в реальном экзамене гарантирована. Однако сбалансированное распределение в исходном банке ещё больше усиливает эту случайность.</li>
                    <li>2.2. Вы можете просматривать статистику распределения правильных ответов для тестов и соответствующим образом корректировать исходный банк вопросов.</li>
                    <li>2.3. Статистика по четырем типам вопросов (<strong>Тест с одним правильным ответом</strong>, <strong>Тест с несколькими правильными ответами</strong>, <strong>Задание с кратким ответом</strong> и <strong>Задание с развёрнутым ответом</strong>) помогает в систематическом управлении банком вопросов.</li>
                </ul>
                <h3>3. Использование ответов и модельных ответов для субъективных вопросов</h3>
                <ul>
                    <li>3.1. Для <strong>Заданий с кратким ответом</strong> ответ студента считается правильным, если он совпадает с любым из нескольких ответов, записанных в банке вопросов. Запись различных вариантов одного и того же ответа полезна как для самообучения, так и для последующей ручной проверки.</li>
                    <li>3.2. Для <strong>Заданий с развёрнутым ответом</strong> предоставляются модельные ответы. Хотя такие задания исключаются из автоматизированной оценки самообучения, модельные ответы помогают преподавателям сохранять последовательность при ручной проверке.</li>
                    <li>3.3. Философски, вопрос со всеми отмеченными вариантами интерпретируется как <strong>Задание с кратким ответом</strong>, так как ответ ограничен и должен совпадать с одним из предложенных вариантов.</li>
                    <li>3.4. Вопрос без вариантов или со всеми снятыми отметками интерпретируется как <strong>Задание с развёрнутым ответом</strong>. Поскольку ответы на такие задания открыты, предоставленные преподавателем ответы являются «модельными ответами», а не окончательными «правильными ответами». Модельных ответов может быть несколько, и они никогда не бывают исчерпывающими, поэтому отсутствие отметок на них имеет философский смысл.</li>
                </ul>
                <h3>4. Рост и развитие банка вопросов</h3>
                <ul>
                    <li>4.1. Преподаватели могут постоянно улучшать банк, добавляя новые вопросы и удаляя низкокачественные на основе опыта преподавания.</li>
                    <li>4.2. Преподаватели могут создавать вариации существующих вопросов и группировать их вместе, чтобы расширить разнообразие банка.</li>
                    <li>4.3. Если студенты испытывают трудности, преподаватель может поделиться файлом банка вопросов. Затем студенты могут использовать функцию самообучения QuizWiz на своих компьютерах, чтобы практиковаться и вырабатывать лучшие привычки к учёбе.</li>
                </ul>
            `,
            "exam-random": `
                <h3>1. Извлечение экзаменационных вопросов из банка вопросов</h3>
                <ul>
                    <li>1.1. <strong>Область экзамена</strong>: Определяется диапазоном номеров вопросов в банке вопросов.</li>
                    <li>1.2. <strong>Случайное извлечение</strong>: Вопросы в пределах области извлекаются случайным образом в заданном количестве с использованием статистически и криптографически безопасного метода.</li>
                    <li>1.3. <strong>Количество вопросов</strong>: Количество извлекаемых вопросов не может превышать количество групп в пределах области.</li>
                    <li>1.4. <strong>Вопросов на группу</strong>: Из одной группы извлекается 0 или 1 вопрос; два или более вопросов из одной группы никогда не попадут в один экзамен.</li>
                    <li>1.5. <strong>Перемешивание вопросов</strong>: Порядок извлечённых вопросов перемешивается случайным образом статистически и криптографически безопасным методом.</li>
                    <li>1.6. <strong>Перемешивание вариантов</strong>: Порядок вариантов ответов для каждого извлечённого вопроса также перемешивается случайным образом статистически и криптографически безопасным методом.</li>
                </ul>
                <h3>2. Правильные ответы для извлечённых вопросов</h3>
                <ul>
                    <li>2.1. <strong>Изменение ответов</strong>: В случае тестов, поскольку вопросы извлекаются и перемешиваются случайным образом, а порядок вариантов ответов для каждого вопроса также рандомизируется, правильные ответы для извлечённых вопросов будут отличаться от ответов оригинальных вопросов в банке.</li>
                    <li>2.2. <strong>Предоставление ключей ответов</strong>: Вместе с набором извлечённых вопросов предоставляется соответствующий набор правильных ответов.</li>
                </ul>
            `,
            "exam-scope": `
                <h3>1. Порядок вопросов в банке вопросов</h3>
                <ul>
                    <li>1.1. Разумеется, определение области экзамена тесно связано с прогрессом обучения. Поэтому порядок вопросов в банке вопросов должен соответствовать прогрессу обучения.</li>
                    <li>1.2. Область экзамена определяется в формате «с номера вопроса X по номер вопроса Y» в банке вопросов.</li>
                    <li>1.3. Если порядок вопросов в банке не совпадает с прогрессом обучения, становится очень трудно разумно выбрать область экзамена.</li>
                </ul>
                <h3>2. Настройка области экзамена</h3>
                <ul>
                    <li>2.1. Область экзамена для создания экзаменационных листов и область обучения для самостоятельного обучения используют одну и ту же информацию.</li>
                    <li>2.2. Формат области экзамена — с номера вопроса X по номер вопроса Y в банке вопросов.</li>
                    <li>2.3. Область экзамена всегда включает как начальный, так и конечный номера. Например, если область установлена с 50 по 100, то и 50-й, и 100-й вопросы включены в область и могут появиться в экзамене.</li>
                </ul>
                <h3>3. Количество вопросов в экзамене</h3>
                <ul>
                    <li>3.1. Количество вопросов в экзамене не может превышать общее количество вопросов в пределах заданной области в банке вопросов.</li>
                    <li>3.2. Количество вопросов в экзамене не может превышать количество групп, к которым относятся вопросы в пределах заданной области.</li>
                    <li>3.3. <strong>Количество вопросов в экзамене</strong> &le; <strong>Количество групп в области</strong> &le; <strong>Количество вопросов в области</strong></li>
                </ul>
            `,
            "exam-relationship": `
                <h3>1. Банк вопросов</h3>
                <ul>
                    <li>1.1. Банк вопросов является основным средством формирования экзаменационных вопросов по числу студентов.</li>
                    <li>1.2. Банк вопросов — это прямое средство управления экзаменационными вопросами.</li>
                    <li>1.3. Банк вопросов служит источником для предоставления студентам различных уникальных экзаменационных листов.</li>
                </ul>
                <h3>2. Список студентов</h3>
                <ul>
                    <li>2.1. Список студентов является вспомогательным средством формирования экзаменационных вопросов по числу студентов.</li>
                    <li>2.2. Список студентов — это средство управления не студентами, а списком экзаменуемых.</li>
                    <li>2.3. Список студентов служит для распределения различных уникальных экзаменационных листов между студентами.</li>
                </ul>
                <h3>3. Настройки экзамена</h3>
                <ul>
                    <li>3.1. Формируется столько наборов вопросов, сколько студентов в списке.</li>
                    <li>3.2. Каждому студенту в списке назначается свой уникальный набор вопросов.</li>
                    <li>3.3. При распределении экзаменационных вопросов между студентами из списка, для каждого студента формируется набор вопросов путём случайного извлечения новых вопросов из банка вопросов в соответствии с заранее установленным диапазоном и количеством вопросов.</li>
                    <li>3.4. Например, нет гарантии, что вопрос №1 в экзаменационном листе одного студента будет вопросом №1 у другого. Кроме того, этот вопрос №1 может оказаться вопросом №7 у другого студента или вовсе отсутствовать.</li>
                </ul>
            `,
            "students-structure": `
                <h3>1. Структура списка студентов</h3>
                <ul>
                    <li>1.1. Структура списка студентов очень проста по сравнению со структурой банка вопросов.</li>
                    <li>1.2. Список студентов представляет собой массив индивидуальных данных каждого студента.</li>
                    <li>1.3. Информация о каждом студенте состоит из Ф.И.О. и номера студенческого билета.</li>
                </ul>
                <h3>2. Карточка студента</h3>
                <ul>
                    <li>2.1. Информация об одном студенте записывается в одну карточку студента.</li>
                    <li>2.2. В карточку студента можно ввести имя и номер студенческого билета.</li>
                    <li>2.3. Вводите Ф.И.О. полностью, не разделяя фамилию и имя. Это связано с тем, что структура и порядок имён различаются в разных культурах.</li>
                    <li>2.4. Номер студенческого билета может содержать как цифры, так и буквы.</li>
                    <li>2.5. На каждой карточке студента есть флажок (чекбокс), который используется для редактирования списка и не является частью самой информации.</li>
                </ul>
            `,
            "students-editing": `
                <p>При редактировании списка студентов данные каждого студента вводятся в отдельной карточке студента.</p>
                <h3>1. Элементы пользовательского ввода</h3>
                <p>В карточке студента пользователь должен ввести Ф.И.О. и номер студенческого билета.</p>
                <ul>
                    <li>1.1. <strong>Ф.И.О.</strong>: Полное имя студента. Фамилия, имя и отчество (при наличии) вводятся вместе. Поскольку правила именования различаются в разных культурах и этнических группах, для этого приложения, основной целью которого является управление банком вопросов, а не администрирование студентов, удобнее не разделять компоненты имени.</li>
                    <li>1.2. <strong>Номер студенческого билета</strong>: Можно вводить как цифры, так и буквы.</li>
                    <li>1.3. <strong>Флажок (чекбокс)</strong>: Это инструмент редактирования, а не элемент ввода данных.</li>
                </ul>
                <h3>2. Инструменты редактирования</h3>
                <p>К инструментам редактирования относятся кнопки <strong>Выбрать всё</strong>, <strong>Инвертировать</strong>, <strong>+ Добавить студента</strong> и <strong>- Удалить студентов</strong> на верхней панели, а также флажок на каждой карточке студента.</p>
                <ul>
                    <li>2.1. Кнопка <strong>+ Добавить студента</strong>: Добавляет новую карточку студента в самый конец списка.</li>
                    <li>2.2. Кнопка <strong>- Удалить студентов</strong>: Удаляет карточку студента, которая в данный момент находится в фокусе.</li>
                    <li>2.3. <strong>Флажок</strong>: При нажатии на флажок появляется отметка, указывающая на то, что студент выбран. Повторное нажатие убирает отметку, что означает отмену выбора.</li>
                    <li>2.4. Кнопка <strong>Выбрать всё</strong>: Выбирает все карточки студентов одновременно. Если вам нужно выбрать большинство студентов, кроме нескольких, вы можете выбрать всех, а затем вручную снять отметки с тех, кого хотите исключить.</li>
                    <li>2.5. Кнопка <strong>Инвертировать</strong>: Меняет состояние выбора для всех студентов на противоположное. Если нужно выбрать много студентов, можно сначала отметить тех, кого вы хотите исключить, а затем нажать кнопку <strong>Инвертировать</strong>, чтобы обратить выбор.</li>
                    <li>2.6. <strong>Оптимизация</strong>: Удаляет все пустые карточки студентов.</li>
                </ul>
            `,
            "students-usage": `
                <h3>1. Цель</h3>
                <p>Список студентов предназначен для предотвращения списывания путём предоставления каждому студенту уникального экзаменационного листа.</p>
                <h3>2. Персонализированная печать</h3>
                <p>При печати экзаменационных листов Ф.И.О. и номера студенческих билетов из списка печатаются индивидуально на каждом соответствующем листе.</p>
                <h3>3. Управление пересдачами</h3>
                <p>Для проведения пересдач удобнее выбрать только соответствующих студентов и сохранить их в отдельный файл для управления и печати новых листов.</p>
            `,
            "selfstudy-prep": `
                <h3>1. Цель самостоятельного обучения</h3>
                <ul>
                    <li>1.1. Цель состоит в том, чтобы позволить преподавателю пройти пробный экзамен с позиции студента, ощутить распределение времени, уровень сложности и степень стресса в условиях экзамена, что позволит скорректировать банк вопросов или реалистично настроить количество вопросов.</li>
                    <li>1.2. Другая цель — помочь студентам, у которых нет привычки к учёбе. Преподаватель может раздать файлы банка вопросов, чтобы студенты могли самостоятельно решать задачи, тем самым усваивая учебный материал и вырабатывая привычку к обучению.</li>
                    <li>1.3. Ещё одна цель — помочь студентам в подготовке к экзаменам, когда их учебная мотивация низка.</li>
                </ul>
                <h3>2. Предварительные условия для самостоятельного обучения</h3>
                <ul>
                    <li>2.1. Самостоятельное обучение невозможно начать без загрузки банка вопросов. Поэтому необходимо сначала загрузить банк вопросов.</li>
                    <li>2.2. Только после загрузки банка вопросов активируется настройка области обучения, позволяющая определить диапазон изучаемого материала. Если область не задана, по умолчанию автоматически устанавливается весь диапазон.</li>
                    <li>2.3. Когда банк вопросов загружен и область обучения определена, всё готово к началу самостоятельного обучения.</li>
                </ul>
            `,
            "selfstudy-scoring": `
                <h3>1. Вопросы, исключаемые из самостоятельного обучения</h3>
                <p>В самостоятельном обучении задания с развёрнутым ответом (эссе) не оцениваются.</p>
                <h3>2. Типы систем оценивания</h3>
                <p>Системы оценивания можно разделить на четыре типа в зависимости от наличия штрафных баллов и частичного зачёта.</p>
                <ul>
                    <li>2.1. <strong>Система оценивания со штрафными баллами и частичными баллами</strong>: Штрафные баллы и частичный зачёт применяются только к тестам; задания с кратким ответом не имеют частичного зачёта и не штрафуются за ошибки.
                        <ul>
                            <li>2.1.1. <strong>Тест с одним правильным ответом</strong>
                                <ul>
                                    <li>2.1.1.1. Правильный ответ: Начисляются заданные баллы.</li>
                                    <li>2.1.1.2. Нет ответа или выбрано несколько вариантов: Начисляется 0 баллов.</li>
                                    <li>2.1.1.3. Один неправильный ответ: Вычитается <strong>количество баллов</strong> / (количество вариантов - 1).</li>
                                </ul>
                            </li>
                            <li>2.1.2. <strong>Тест с несколькими правильными ответами</strong>
                                <ul>
                                    <li>2.1.2.1. Количество ответов верно и все они правильные: Начисляются заданные баллы.</li>
                                    <li>2.1.2.2. Количество выбранных ответов не совпадает с количеством правильных: Начисляется 0 баллов.</li>
                                    <li>2.1.2.3. Количество выбранных ответов совпадает с количеством правильных: Начисляется (<strong>число неправильных вариантов</strong> x <strong>число выбранных правильных ответов</strong> - <strong>число правильных вариантов</strong> x <strong>число выбранных неправильных ответов</strong>) x <strong>количество баллов</strong> / <strong>общее число вариантов</strong> баллов.</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>2.2. <strong>Система оценивания со штрафными баллами без частичных баллов</strong>: Штрафные баллы применяются только к тестам; задания с кратким ответом не штрафуются за ошибки.
                        <ul>
                            <li>2.2.1. <strong>Тест с одним правильным ответом</strong>
                                <ul>
                                    <li>2.2.1.1. Правильный ответ: Начисляются заданные баллы.</li>
                                    <li>2.2.1.2. Нет ответа или выбрано несколько вариантов: Получает 0 баллов.</li>
                                    <li>2.2.1.3. Один неправильный ответ: Вычитается <strong>количество баллов</strong> / (количество вариантов - 1).</li>
                                </ul>
                            </li>
                            <li>2.2.2. <strong>Тест с несколькими правильными ответами</strong>
                                <ul>
                                    <li>2.2.2.1. Количество ответов верно и все они правильные: Начисляются заданные баллы.</li>
                                    <li>2.2.2.2. Количество выбранных ответов не совпадает с количеством правильных: Получает 0 баллов.</li>
                                    <li>2.2.2.3. Количество выбранных ответов совпадает с количеством правильных, но есть ошибки или пропуски: Вычитается <strong>количество баллов</strong> / (<strong>общее число вариантов</strong> x (<strong>общее число вариантов</strong> - 1)) баллов.</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>2.3. <strong>Система оценивания без штрафных баллов с частичными баллами</strong>
                        <ul>
                            <li>2.3.1. <strong>Тест с одним правильным ответом</strong>
                                <ul>
                                    <li>2.3.1.1. Правильный ответ: Начисляются заданные баллы.</li>
                                    <li>2.3.1.2. В остальных случаях: Получает 0 баллов.</li>
                                </ul>
                            </li>
                            <li>2.3.2. <strong>Тест с несколькими правильными ответами</strong>
                                <ul>
                                    <li>2.3.2.1. Количество ответов верно и все они правильные: Начисляются заданные баллы.</li>
                                    <li>2.3.2.2. Количество выбранных ответов не совпадает с количеством правильных: Получает 0 баллов.</li>
                                    <li>2.3.2.3. Количество выбранных ответов совпадает с количеством правильных: Начисляется <strong>количество баллов</strong> x <strong>число выбранных правильных ответов</strong> / <strong>общее число правильных вариантов</strong> баллов.</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>2.4. <strong>Система оценивания без штрафных баллов и без частичных баллов</strong>
                        <ul>
                            <li>2.4.1. <strong>Тест с одним правильным ответом</strong>
                                <ul>
                                    <li>2.4.1.1. Правильный ответ: Начисляются заданные баллы.</li>
                                    <li>2.4.1.2. В остальных случаях: Получает 0 баллов.</li>
                                </ul>
                            </li>
                            <li>2.4.2. <strong>Тест с несколькими правильными ответами</strong>
                                <ul>
                                    <li>2.4.2.1. Количество ответов верно и все они правильные: Начисляются заданные баллы.</li>
                                    <li>2.4.2.2. В остальных случаях: Получает 0 баллов.</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
                <h3>3. Совместное использование настроек системы оценивания</h3>
                <p>Поскольку настройки системы оценивания для самостоятельного обучения используют те же значения, что и настройки области экзамена при его создании, изменение настроек области экзамена автоматически обновит настройки системы оценивания для самостоятельного обучения.</p>
            `,
            "selfstudy-usage": `
                <h3>1. Преподаватель</h3>
                <ul>
                    <li>1.1. После создания банка вопросов преподаватели могут использовать самообучение как инструмент для оценки реалистичности вопросов, решая их самостоятельно.</li>
                    <li>1.2. Перед созданием экзамена преподаватели могут использовать самообучение как инструмент для оценки реалистичности экзамена, самостоятельно решая вопросы в рамках области экзамена.</li>
                </ul>
                <h3>2. Студент</h3>
                <p>Эти пункты имеют значение в том случае, если преподаватель открывает доступ к банку вопросов. </p>
                <ul>
                    <li>2.1. Студенты могут использовать самообучение как инструмент для повторения изученного материала, самостоятельно решая экзаменационные вопросы.</li>
                    <li>2.2. Перед экзаменом студенты могут использовать самообучение как инструмент для подготовки к экзамену, самостоятельно решая вопросы в рамках области экзамена.</li>
                    <li>2.3. Если преподаватель не открывает доступ к банку вопросов, студент может самостоятельно создавать вопросы по изученному материалу и решать их для практической тренировки.</li>
                </ul>
            `
        }
    },
    ky: {
        ui: {
            "help-title": "QuizWiz Жардамы",
            "coming-soon": "{title} боюнча толук маалымат жакында пайда болот."
        },
        menus: {
            "about-qbank": "Суроолор банкы жөнүндө",
            "about-exam": "Экзамен коюу жөнүндө",
            "about-students": "Студенттердин тизмеси жөнүндө",
            "about-selfstudy": "Өз алдынча окуу жөнүндө"
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
            "selfstudy-prep": "Өз алдынча окууга даярдык көрүү жөнүндө",
            "selfstudy-scoring": "Баалоо эрежелери жөнүндө",
            "selfstudy-usage": "Өз алдынча окууну колдонуу жөнүндө"
        },
        contents: {
            "qbank-structure": `
                <p>Суроолор банкы баш саптан жана суроолордон турат.</p>
                <h3>1. Баш сап</h3>
                <p>Баш сап экзамен түзүүдө экзамен барагынын башында пайда болгон нерселер жөнүндө маалыматты камтыйт.</p>
                <p>1.1. Баш сапты <strong>Суроолор банкы > Баш сапты түзөтүү</strong> менюсунан түзөтсө болот.</p>
                <p>1.2. Баш сап аталышынан, атынан, ID, суроо түрлөрүнүн аталыштарынан жана эскертүүлөрдөн турат.</p>
                <ul>
                    <li>1.2.1. <strong>Баш сөз</strong>: Экзамендин аталышы, мисалы, «Математика боюнча жыйынтык экзамен» же «Физика боюнча орто мөөнөттүү сынак». Ал экзамен барагында чоң жана калың арип менен басылат.</li>
                    <li>1.2.2. <strong>Аты-жөнү</strong>: Экзамен барагындагы «Аты-жөнү» талаасынын аталышы. Мисалы, «Аты-жөнү» деп киргизсеңиз, ал баракта «Аты-жөнү:» болуп көрүнөт.</li>
                    <li>1.2.3. <strong>ID</strong>: Студенттин уникалдуу идентификатору. «Билет номери» деп киргизсеңиз, ал баракта «Билет номери:» болуп көрүнөт.</li>
                    <li>1.2.4. <strong>Бир жооптуу тест</strong>: Эгер сиз «А варианты» деп киргизсеңиз, ал суроо номеринин алдында «[А варианты]» деп басылып чыгат. Бул студентке суроо А түрүнө кирерин билдирет. Бош калтырсаңыз, жөн гана кашаалар [ ] пайда болот.</li>
                    <li>1.2.5. <strong>Бир нече жооптуу тест</strong>: Эгер сиз «Б варианты» деп киргизсеңиз, ал суроо номеринин алдында «[Б варианты]» деп басылып чыгат. Бул студентке суроо Б түрүнө кирерин билдирет. Бош калтырсаңыз, жөн гана кашаалар [ ] пайда болот.</li>
                    <li>1.2.6. <strong>Кыска жооп</strong>: Эгер сиз «В варианты» деп киргизсеңиз, ал суроо номеринин алдында «[В варианты]» деп басылып чыгат. Бул студентке суроо В түрүнө кирерин билдирет. Бош калтырсаңыз, жөн гана кашаалар [ ] пайда болот.</li>
                    <li>1.2.7. <strong>Кеңири жооп</strong>: Эгер сиз «Г варианты» деп киргизсеңиз, ал суроо номеринин алдында «[Г варианты]» деп басылып чыгат. Бул студентке суроо Г түрүнө кирерин билдирет. Бош калтырсаңыз, жөн гана кашаалар [ ] пайда болот.</li>
                    <li>1.2.8. <strong>Эскертүү</strong>: Сынактын эрежелери. Экзамен өткөрүү эрежелерин киргизиңиз. Аты-жөнү жана ID аталыштын астында көрсөтүлөт, андан кийин эскертүү мазмуну келет, андан соң суроолор башталат. Эгерде өзгөчө эч нерсе кошуунун кереги жок болсо, жөн гана «Ийгилик!» деп жазсаңыз болот.</li>
                </ul>
                <p>1.3. <strong>Демейки мазмун</strong> баскычы: Бул баскычты басуу «Баш сөздөн» тышкары бардык талааларды тандалган «Тилге» жараша алдын ала сакталган мазмун менен автоматтык түрдө толтурат. Колдонуучулар керектүү бөлүктөрүн гана өзгөртө алышат. «Эскертүү» бөлүмү колдонуучу тандаган «Баалоо эрежесине» жана «Тилге» жараша суроо түрлөрүнүн сүрөттөлүшү жана баалоо эрежелери менен автоматтык түрдө толтурулат.</p>
                <h3>2. Суроолор</h3>
                <p>2.1. Суроолордун төрт түрү колдоо алынат: <strong>Бир жооптуу тест</strong>, <strong>Бир нече жооптуу тест</strong>, <strong>Кыска жооп</strong> жана <strong>Кеңири жооп</strong>. Учурда шайкештикти текшерүүчү суроолор колдоо алынбайт. «Туура/Ката» түрүндөгү суроолорду эки варианттуу тест катары ишке ашырса болот.</p>
                <ul>
                    <li>2.1.1. <strong>Бир жооптуу тест</strong>: Бир гана варианты туура болгон тест.</li>
                    <li>2.1.2. <strong>Бир нече жооптуу тест</strong>: Эки же андан көп варианты туура болгон тест.</li>
                    <li>2.1.3. <strong>Кыска жооп</strong>: Жообу бир сөз же кыска сөз айкашы болгон субъективдүү суроо.</li>
                    <li>2.1.4. <strong>Кеңири жооп</strong>: Жообу бир же бир нече абзацтан турган субъективдүү суроо.</li>
                </ul>
                <p>2.2. Массивдеги ар бир суроо суроо номеринен, топ номеринен, суроонун текстинен, жооп варианттарынан жана ар бир вариант үчүн белгиден турат.</p>
                <ul>
                    <li>2.2.1. <strong>Суроо номери</strong>: Массивдеги суроолордун тартибине ылайык келет. Суроо номерлерин окуунун жүрүшүнө жараша көбөйтүү сунушталат, анткени экзамендин чөйрөсү суроо номерлери боюнча аныкталат. Максималдуу 65 534 суроо болушу мүмкүн.</li>
                    <li>2.2.2. <strong>Топ номери</strong>: Бир топко кирген суроолор маңызы боюнча бир эле суроо, бирок ар кандай берилген. Экзамен үчүн топтон бир гана суроо туш келди тандалат. Бул ар бир студентке ар башка, бирок бирдей деңгээлдеги суроолорду берүүгө мүмкүндүк берет. <strong>Оптималдаштыруу</strong> аткарылганда, топтун номери автоматтык түрдө ошол топтун эң кичине суроо номерине барабар болуп белгиленет.</li>
                    <li>2.2.3. <strong>Суроо тексти</strong>: Суроонун өзүнүн тексти. Бир нече сапты киргизүүгө болот, бирок учурда сүрөттөр колдоо алынбайт.</li>
                    <li>2.2.4. <strong>Жооп варианттары</strong>: Бир суроого 0дөн 255ке чейин жооп варианты болушу мүмкүн.</li>
                    <li>2.2.5. <strong>Белги</strong>: Ар бир жооп вариантында бирден белги болот.
                        <ul>
                            <li>Тесттер: Белгиленген варианттар туура жооптор болуп салат.</li>
                            <li>Кыска жооп: Бардык варианттар белгилениши керек; эгерде студенттин жообу алардын бирине дал келсе, ал туура деп эсептелет.</li>
                            <li>Кеңири жооп: Варианттар болбошу керек же бардык белгилер алынып салынышы керек.</li>
                        </ul>
                    </li>
                </ul>
                <p>2.3. <strong>Варианттар жана белгилер боюнча суроо түрүн аныктоо</strong></p>
                <ul>
                    <li>2.3.1. Варианттары жок суроолор: <strong>Кеңири жооп</strong></li>
                    <li>2.3.2. Бардык белгилери коюлган варианттары бар суроолор: <strong>Кыска жооп</strong></li>
                    <li>2.3.3. Бардык белгилери алынган варианттары бар суроолор: <strong>Кеңири жооп</strong></li>
                    <li>2.3.4. 2 же андан көп варианты бар жана бирөө гана белгиленген суроолор: <strong>Бир жооптуу тест</strong></li>
                    <li>2.3.5. Калгандары (2 же андан көп вариант, бир нече белги): <strong>Бир нече жооптуу тест</strong></li>
                </ul>
            `,
            "qbank-editing": `
                <p>Суроолор банкын түзөтүүдө ар бир суроо өзүнүн суроо карточкасында түзүлөт.</p>
                <h3>1. Колдонуучу киргизүүчү элементтер</h3>
                <p>Суроо карточкасында колдонуучулар топ номерин, суроо текстин, жооп вариантын киргизип, белгилерди коюшат.</p>
                <ul>
                    <li>1.1. <strong>Топ номери</strong>: Суроо кирген топту аныктаган сан. 1ден 65 534кө чейинки сандар гана жарамдуу.</li>
                    <li>1.2. <strong>Суроо тексти</strong>: Сиз суроонун текстин бир нече сапта эркин киргизе аласыз.</li>
                    <li>1.3. <strong>Вариант тексти</strong>: Сиз жооп вариантынын текстин бир нече сапта эркин киргизе аласыз.</li>
                    <li>1.4. <strong>Белги</strong>: Белгини коюу же алып салуу үчүн чычкан менен басыңыз.</li>
                </ul>
                <h3>2. Түзөтүү куралдары</h3>
                <p>Жогорудагы тилкедеги түзөтүү куралдарына эки суроо номерин киргизүү талаасы, <strong>->V<- Суроо киргизүү</strong> баскычы, <strong>= Суроону көчүрүү</strong> баскычы, <strong>+ Суроо кошуу</strong> баскычы, <strong>- Суроону өчүрүү</strong> баскычы жана <strong>Которуу</strong> баскычы кирет. <strong>Которуу</strong> баскычын басканда алар эки вариант номерин киргизүү талаасына, <strong>->V<- Вариант киргизүү</strong> баскычына, <strong>= Вариантты көчүрүү</strong> баскычына, <strong>+ Вариант кошуу</strong> баскычына жана <strong>- Вариантты өчүрүү</strong> баскычына алмашат. Биринчи суроо карточкасында <strong>Төмөн</strong> баскычы, акыркысында <strong>Өйдө</strong> баскычы, ал эми калгандарында <strong>Өйдө</strong> жана <strong>Төмөн</strong> баскычтары бар.</p>
                <ul>
                    <li>2.1. <strong>+ Суроо кошуу</strong> баскычы: Аягына жаңы суроо карточкасын кошот. Кошулган карточканын топ номери анын суроо номерине барабар болот.</li>
                    <li>2.2. <strong>- Суроону өчүрүү</strong> баскычы: Учурда фокуста турган суроо карточкасын өчүрөт.</li>
                    <li>2.3. <strong>= Суроону көчүрүү</strong> баскычы: Учурдагы жана кийинки карточканын ортосуна жаңы суроо карточкасын киргизип, учурдагы карточканын бардык мазмунун жаңысына көчүрөт. Бул окшош суроолорду түзүүдө убакытты үнөмдөө үчүн пайдалуу. Жаңы карточка баштапкы карточканын топ номерин алат, аны кийин колдонуучу өзгөртө алат. Бир эле топтун алкагында ар кандай формулировкадагы бирдей суроолорду түзүү үчүн идеалдуу.</li>
                    <li>2.4. <strong>->V<- Суроо киргизүү</strong> баскычы: Анын сол жагындагы эки талаага киргизилген суроо номерлеринин ортосуна жаңы бош суроо карточкасын киргизет. Киргизилген карточканын топ номери анын суроо номерине барабар болот.</li>
                    <li>2.5. <strong>Эки суроо номерин киргизүү талаасы</strong>: Сол жактагы талаага мурунку суроонун номерин, оң жактагы талаага кийинки суроонун номерин киргизиңиз. Бир талаага киргизгенде, экинчиси автоматтык түрдө жаңыланат. <strong>->V<- Суроо киргизүү</strong> баскычын басуу бул эки номердин ортосуна жаңы карточканы жайгаштырат.</li>
                    <li>2.6. <strong>Которуу</strong> баскычы: Суроолорду түзөтүү режими жана варианттарды түзөтүү режиминин ортосунда которуштуруу.</li>
                    <li>2.7. <strong>+ Вариант кошуу</strong> баскычы: Учурдагы суроо карточкасынын аягына жооп вариантын кошот.</li>
                    <li>2.8. <strong>- Вариантты өчүрүү</strong> баскычы: Учурдагы жооп вариантын өчүрөт.</li>
                    <li>2.9. <strong>= Вариантты көчүрүү</strong> баскычы: Учурдагы жана кийинки варианттын ортосуна вариант киргизип, бардык мазмунду көчүрөт. Окшош варианттарды тез түзүү үчүн пайдалуу.</li>
                    <li>2.10. <strong>->V<- Вариант киргизүү</strong> баскычы: Анын сол жагындагы эки талаага киргизилген вариант номерлеринин ортосуна бош вариант киргизет.</li>
                    <li>2.11. <strong>Эки вариант номерин киргизүү талаасы</strong>: Жаңы вариант кайда киргизилиши керектигин аныктап, суроо номерин киргизүү талаалары сыяктуу эле иштейт.</li>
                    <li>2.12. <strong>Өйдө</strong> баскычы: Суроолордун тартиби окуунун жүрүшүнө байланыштуу болгондуктан, алардын тартибин өзгөртүү керек болушу мүмкүн. Бул баскыч учурдагы суроону мурунку суроо менен алмаштырат. Фокус жылдырылган карточкада калат.</li>
                    <li>2.13. <strong>Төмөн</strong> баскычы: Учурдагы суроону кийинки суроо менен алмаштырат. Фокус жылдырылган карточкада калат.</li>
                </ul>
            `,
            "qbank-usage": `
                <p>Суроолор банкын окуунун жүрүшүнө жараша жүргүзүү — студенттерди сапаттуу суроолор менен баалоонун эң сонун жолу.</p>
                <h3>1. Топтор тутумун колдонуу</h3>
                <ul>
                    <li>1.1. Топтор тутумунун максаты — суроолор банкында бир нече эквиваленттүү варианттарына ээ болуу. Бул тапшырмаларды ар тараптуу кылууга мүмкүндүк берет жана студенттер ар башка, бирок тең маанилүү суроолорду алгандыктан, көчүрүүнү кыйындатат. Экзамен алуучу көзөмөлдөп турган чыңалган кырдаалда, студент үчүн досунун баракчасындагы суроо өзүнүн баракчасындагы суроо менен маанилеш экенин, болгону башкача берилгенин байкап калуу өтө кыйынга турат.</li>
                    <li>1.2. Кээде бир суроо башка суроого кокустан ишарат (подсказка) камтышы мүмкүн. Мындай суроолорду бир топко топтоо менен алар эч качан бир экзамен барагында чогуу чыкпасын кепилдейсиз.</li>
                    <li>1.3. Сиздин оюңузча, бир экзаменде чогуу чыкпоого тийиш болгон бардык суроолорду бир топко жайгаштыруу менен алардын чогуу чыгышын алдын алсаңыз болот.</li>
                </ul>
                <h3>2. Суроолор банкынын статистикасын колдонуу</h3>
                <ul>
                    <li>2.1. Белгиленген диапазондон суроолорду туш келди тандоо үчүн псевдо-туш келди сандардын генератору (PRNG) керек. Бул продуктта колдонулган PRNG статистикалык жана криптографиялык жактан коопсуз. Ошентип, суроолор банкында туура жооптордун бөлүштүрүлүшү бир жактуу болсо да, чыныгы экзаменде суроолорду тандоонун жана жоопторду бөлүштүрүүнүн кокустугу кепилденет. Бирок баштапкы банктагы тең салмактуу бөлүштүрүү бул кокустукту ого бетер күчөтөт.</li>
                    <li>2.2. Сиз тесттер үчүн туура жооптордун бөлүштүрүлүшүнүн статистикасын көрүп, суроолор банкын ошого жараша оңдой аласыз.</li>
                    <li>2.3. Суроолордун төрт түрү (<strong>Бир жооптуу тест</strong>, <strong>Бир нече жооптуу тест</strong>, <strong>Кыска жооп</strong> жана <strong>Кеңири жооп</strong>) боюнча статистика суроолор банкын системалуу башкарууга жардам берет.</li>
                </ul>
                <h3>3. Субъективдүү суроолор үчүн жоопторду жана үлгүлүү жоопторду колдонуу</h3>
                <ul>
                    <li>3.1. <strong>Кыска жооптуу тапшырмалар</strong> үчүн студенттин жообу суроолор банкында жазылган бир нече жооптун бирине дал келсе, туура деп эсептелет. Бир эле жооптун ар кандай варианттарын жазып коюу өз алдынча окуу үчүн да, кийинчерээк кол менен текшерүү үчүн да пайдалуу.</li>
                    <li>3.2. <strong>Кеңири жооптуу тапшырмалар</strong> үчүн үлгүлүү жооптор берилет. Мындай тапшырмалар өз алдынча окууну автоматташтырылган баалоодон чыгарылса да, үлгүлүү жооптор окутуучулорго кол менен текшерүүдө ырааттуулукту сактоого жардам берет.</li>
                    <li>3.3. Философиялык жактан алганда, бардык варианттары белгиленген суроо <strong>Кыска жооп</strong> катары чечмеленет, анткени жооп чектелген жана сунушталган варианттардын бирине дал келиши керек.</li>
                    <li>3.4. Варианттары жок же бардык белгилери алынган суроо <strong>Кеңири жооп</strong> катары чечмеленет. Мындай тапшырмалардын жооптору ачык болгондуктан, окутуучу тарабынан берилген жооптор так «туура жооп» эмес, «үлгүлүү жооп» болуп саналат. Үлгүлүү жооптор бир нече болушу мүмкүн жана алар эч качан толук бүткөн болуп эсептелбейт, ошондуктан аларда белгилердин жоктугу философиялык мааниге ээ.</li>
                </ul>
                <h3>4. Суроолор банкынын өсүшү жана өнүгүшү</h3>
                <ul>
                    <li>4.1. Окутуучулар окутуу тажрыйбасынын негизинде жаңы суроолорду кошуп жана сапатсыз суроолорду өчүрүү менен банкты тынымсыз жакшырта алышат.</li>
                    <li>4.2. Окутуучулар бар суроолордун варианттарын түзүп, аларды бир топко топтоо менен банктын ар түрдүүлүгүн кеңейте алышат.</li>
                    <li>4.3. Эгерде студенттер кыйналып жатышса, окутуучу суроолор банкынын файлдарын бөлүшө алат. Андан кийин студенттер өз компьютерлеринде QuizWizдин өз алдынча окуу функциясын колдонуп машыгып, жакшы окуу көндүмдөрүн калыптандыра алышат.</li>
                </ul>
            `,
            "exam-random": `
                <h3>1. Суроолор банкынан экзамен суроолорун алуу</h3>
                <ul>
                    <li>1.1. <strong>Экзамендин чөйрөсү</strong>: Суроолор банкындагы суроо номеринин диапазону менен аныкталат.</li>
                    <li>1.2. <strong>Туш келди тандоо</strong>: Чөйрөнүн ичиндеги суроолор белгиленген санда, статистикалык жана криптографиялык жактан коопсуз ыкма менен туш келди тандалып алынат.</li>
                    <li>1.3. <strong>Суроолордун саны</strong>: Тандалып алынган суроолордун саны чөйрөдөгү топтордун жалпы санынан ашпоого тийиш.</li>
                    <li>1.4. <strong>Топтогу суроолордун саны</strong>: Бир топтон 0 же 1 суроо тандалат; бир эле топтон эки же андан көп суроо эч качан бир экзаменге кирбейт.</li>
                    <li>1.5. <strong>Суроолордун иретин аралаштыруу</strong>: Тандалган суроолордун тартиби статистикалык жана криптографиялык жактан коопсуз ыкма менен туш келди аралаштырылат.</li>
                    <li>1.6. <strong>Варианттардын иретин аралаштыруу</strong>: Ар бир тандалган суроонун жооп варианттарынын тартиби да статистикалык жана криптографиялык жактан коопсуз ыкма менен туш келди аралаштырылат.</li>
                </ul>
                <h3>2. Тандалган суроолордун туура жооптору</h3>
                <ul>
                    <li>2.1. <strong>Жооптордун өзгөрүшү</strong>: Тесттик суроолор үчүн, суроолор туш келди тандалып жана ирети аралаштырылгандыктан, ошондой эле ар бир суроонун жооп варианттарынын тартиби да өзгөртүлгөндүктөн, тандалган суроолордун туура жооптору суроолор банкындагы түпнуска суроолордун жоопторунан айырмаланат.</li>
                    <li>2.2. <strong>Жооптордун топтомун берүү</strong>: Тандалган суроолордун топтому үчүн туура жооптордун топтому да кошо берилет.</li>
                </ul>
            `,
            "exam-scope": `
                <h3>1. Суроолор банкындагы суроолордун тартиби</h3>
                <ul>
                    <li>1.1. Албетте, экзамендин чөйрөсүн аныктоо окуунун жүрүшү менен тыгыз байланыштуу. Ошондуктан, суроолор банкындагы суроолордун тартиби окуунун жүрүшүнө шайкеш келиши керек.</li>
                    <li>1.2. Экзамендин чөйрөсү «суроолор банкында X-суроодон Y-суроого чейин» деген форматта аныкталат.</li>
                    <li>1.3. Эгерде банктагы суроолордун тартиби окуунун жүрүшүнө дал келбесе, экзамендин чөйрөсүн туура тандоо абдан кыйын болуп калат.</li>
                </ul>
                <h3>2. Экзамендин чөйрөсүн орнотуу</h3>
                <ul>
                    <li>2.1. Экзамен барактарын түзүү үчүн экзамендин чөйрөсү жана өз алдынча окуу үчүн окуу чөйрөсү бирдей маалыматты бөлүшөт.</li>
                    <li>2.2. Экзамендин чөйрөсүнүн форматы — суроолор банкында X-суроодон Y-суроого чейин.</li>
                    <li>2.3. Экзамендин чөйрөсү ар дайым башталгыч жана акыркы номерлерди камтыйт. Мисалы, эгер чөйрө 50дөн 100гө чейин деп белгиленсе, 50- жана 100-суроолор тең чөйрөгө киргизилет жана алар экзаменде чыгышы мүмкүн.</li>
                </ul>
                <h3>3. Экзамендеги суроолордун саны</h3>
                <ul>
                    <li>3.1. Экзамендеги суроолордун саны суроолор банкында белгиленген чөйрөдөгү суроолордун жалпы санынан ашпоого тийиш.</li>
                    <li>3.2. Экзамендеги суроолордун саны белгиленген чөйрөдөгү суроолор кирген топтордун санынан ашпоого тийиш.</li>
                    <li>3.3. <strong>Экзамендеги суроолордун саны</strong> &le; <strong>Белгиленген чөйрөдөгү топтордун саны</strong> &le; <strong>Белгиленген чөйрөдөгү суроолордун саны</strong></li>
                </ul>
            `,
            "exam-relationship": `
                <h3>1. Суроолор банкы</h3>
                <ul>
                    <li>1.1. Суроолор банкы — студенттердин санына жараша экзамендик суроолорду түзүүнүн негизги каражаты.</li>
                    <li>1.2. Суроолор банкы — экзамендик суроолорду башкаруунун түздөн-түз каражаты.</li>
                    <li>1.3. Суроолор банкы студенттерге ар кандай уникалдуу экзамен барактарын берүү үчүн булак болуп салат.</li>
                </ul>
                <h3>2. Студенттердин тизмеси</h3>
                <ul>
                    <li>2.1. Студенттердин тизмеси — студенттердин санына жараша экзамендик суроолорду түзүүнүн кошумча каражаты.</li>
                    <li>2.2. Студенттердин тизмеси — студенттерди башкаруу үчүн эмес, экзамен тапшыруучулардын тизмесин башкаруу үчүн каражат.</li>
                    <li>2.3. Студенттердин тизмеси ар бир студентке ар башка уникалдуу экзамен барагын бөлүштүрүү ролун аткарат.</li>
                </ul>
                <h3>3. Экзамен орнотуулары</h3>
                <ul>
                    <li>3.1. Студенттердин тизмесиндеги студенттердин санына жараша суроолор топтому түзүлөт.</li>
                    <li>3.2. Студенттердин тизмесиндеги бардык студенттерге ар башка суроолор топтому берилет.</li>
                    <li>3.3. Экзамен суроолору студенттерге бөлүштүрүлгөндө, алдын ала белгиленген диапазонго жана суроолордун санына ылайык, ар бир студент үчүн суроолор банкынан туш келди жаңыдан тандалып алынган суроолор топтому түзүлөт.</li>
                    <li>3.4. Мисалы, бир студенттин экзамен барагында 1-суроо башка студенттин барагында 1-суроо болоруна кепилдик жок. Ошондой эле, ал 1-суроо башка студенттин барагында 7-суроо болушу мүмкүн же такыр жок болушу мүмкүн.</li>
                </ul>
            `,
            "students-structure": `
                <h3>1. Студенттердин тизмесинин түзүлүшү</h3>
                <ul>
                    <li>1.1. Студенттердин тизмесинин түзүлүшү суроолор банкына салыштырмалуу абдан жөнөкөй.</li>
                    <li>1.2. Студенттердин тизмеси ар бир студенттин жеке маалыматтарының массиви болуп салат.</li>
                    <li>1.3. Ар бир студенттин маалыматы студенттин аты-жөнүнөн жана студенттик билет номеринен турат.</li>
                </ul>
                <h3>2. Студенттин карточкасы</h3>
                <ul>
                    <li>2.1. Бир студенттин маалыматы бир студенттик карточкага жазылат.</li>
                    <li>2.2. Студенттик карточкага студенттин атын жана билет номерин киргизүүгө болот.</li>
                    <li>2.3. Аты-жөнүн фамилияга жана ысымга бөлбөстөн толук киргизиңиз. Бул ар кандай маданияттарда ысымдардын түзүлүшү жана тартиби ар башка болгондугуна байланыштуу.</li>
                    <li>2.4. Студенттик билет номери цифраларды да, тамгаларды да камтышы мүмкүн.</li>
                    <li>2.5. Ар бир студенттик карточкада тизмени түзөтүү үчүн колдонулган белгилөө кутучасы (чекбокс) бар, ал маалыматтын өзүнө кирбейт.</li>
                </ul>
            `,
            "students-editing": `
                <p>Студенттердин тизмесин түзөтүүдө ар бир студенттин маалыматы жеке студенттик карточкага киргизилет.</p>
                <h3>1. Колдонуучу киргизүүчү элементтер</h3>
                <p>Студенттик карточкада колдонуучу аты-жөнүн жана студенттик билетин киргизиши керек.</p>
                <ul>
                    <li>1.1. <strong>Аты-жөнү</strong>: Студенттин толук аты-жөнү. Фамилиясы, аты жана атасынын аты (эгер бар болсо) чогуу киргизилет. Ар кандай маданияттарда и этникалык топтордо ысымдарды коюу салты ар башка болгондуктан, студенттерди башкарууга караганда суроолор банкынын башкаруусу башкы максат болгондуктан, ысымдын бөлүктөрүн бөлүп отурбоо ыңгайлуураак.</li>
                    <li>1.2. <strong>Билет номери</strong>: Цифраларды да, тамгаларды да киргизүүгө болот.</li>
                    <li>1.3. <strong>Белгилөө кутучасы (чекбокс)</strong>: Бул маалымат киргизүүчү элемент эмес, түзөтүү куралы.</li>
                </ul>
                <h3>2. Түзөтүү куралдары</h3>
                <p>Түзөтүү куралдарына жогорудагы тилкедеги <strong>Баарын тандоо</strong>, <strong>Тандоону которуу</strong>, <strong>+ Студент кошуу</strong> жана <strong>- Студенттерди алып салуу</strong> баскычтары, ошондой эле ар бир студенттик карточкадагы белгилөө кутучасы кирет.</p>
                <ul>
                    <li>2.1. <strong>+ Студент кошуу</strong> баскычы: Тизменин эң аягына жаңы студенттик карточканы кошот.</li>
                    <li>2.2. <strong>- Студенттерди алып салуу</strong> баскычы: Учурда фокуста турган студенттик карточканы өчүрөт.</li>
                    <li>2.3. <strong>Белгилөө кутучасы</strong>: Белгилөө кутучасын басканда белги пайда болуп, студент тандалганын билдирет. Аны кайра бассаңыз, белги жоголуп, студент тандалбаганын билдирет.</li>
                    <li>2.4. <strong>Баарын тандоо</strong> баскычы: Бардык студенттик карточкаларды бир убакта тандайт. Эгер сизге саналуу студенттерден башкасынын баарын тандоо керек болсо, анда баарын тандап, андан кийин керексиз студенттердин белгисин кол менен алып салсаңыз болот.</li>
                    <li>2.5. <strong>Тандоону которуу</strong> баскычы: Бардык студенттер үчүн тандоо абалын карама-каршысына өзгөртөт. Эгер көп студентти тандоо керек болсо, адегенде тизмеден чыгаргыңыз келгендерди белгилеп, андан кийин <strong>Тандоону которуу</strong> баскычын басып, тандоону тескери кылып алсаңыз болот.</li>
                    <li>2.6. <strong>Оптималдаштыруу</strong>: Бардык бош студенттик карточкаларды өчүрөт.</li>
                </ul>
            `,
            "students-usage": `
                <h3>1. Максаты</h3>
                <p>Студенттердин тизмеси ар бир студентке ар башка экзамен барагын берүү аркылуу көчүрүүнү (алдоону) алдын алуу үчүн колдонулат.</p>
                <h3>2. Жекелештирилген басып чыгаруу</h3>
                <p>Экзамен барактарын басып чыгарууда тизмедеги студенттердин аты-жөнү жана билет номерлери ар бир тиешелүү баракка жекече басылып чыгат.</p>
                <h3>3. Кайра тапшырууну башкаруу</h3>
                <p>Экзаменди кайра тапшыра турган студенттердин тизмесин өзүнчө файл катары сактап алуу, кайра тапшыруу барактарын даярдоо жана басып чыгаруу үчүн ыңгайлуураак.</p>
            `,
            "selfstudy-prep": `
                <h3>1. Өз алдынча окуунун максаты</h3>
                <ul>
                    <li>1.1. Максаты — окутуучуга студенттин көз карашы менен машыгуу экзаменин тапшырып көрүүгө, убакытты бөлүштүрүүнү, суроолордун татаалдык деңгээлин жана экзамен учурундагы толкунданууну сезүүгө мүмкүнчүлүк берүү. Бул суроолор банкын өзгөртүүгө же суроолордун санын реалдуу түрдө жөнгө салууга жардам берет.</li>
                    <li>1.2. Дагы бир максаты — окууга көнө элек студенттерге жардам берүү. Окутуучу суроолор банкынын файлдарын студенттерге таратып берип, алар суроолорду өз алдынча чечүүсү аркылуу окуу материалын өздөштүрүүгө жана окуу адатын калыптандырууга көмөктөшөт.</li>
                    <li>1.3. Студенттердин окууга болгон умтулуусу төмөн болгон учурда экзамендерге даярданууга жардам берүү — бул дагы бир максат болуп салат.</li>
                </ul>
                <h3>2. Өз алдынча окуу үчүн алдын ала шарттар</h3>
                <ul>
                    <li>2.1. Өз алдынча окууну суроолор банкын жүктөбөстөн баштоо мүмкүн эмес. Ошондуктан, сөзсүз түрдө суроолор банкын жүктөө керек.</li>
                    <li>2.2. Суроолор банкы жүктөлгөндөн кийин гана окуу диапазонун орнотуу функциясы активдешип, окуу чөйрөсүн аныктоого мүмкүндүк берет. Эгерде диапазон белгиленбесе, демейки жөндөө боюнча бардык диапазон автоматтык түрдө окуу чөйрөсү катары белгиленет.</li>
                    <li>2.3. Суроолор банкы жүктөлүп жана окуу диапазону аныкталгандан кийин гана өз алдынча окууну баштоого даярдык бүткөн болуп эсептелет.</li>
                </ul>
            `,
            "selfstudy-scoring": `
                <h3>1. Өз алдынча окуудан чыгарылган суроолор</h3>
                <p>Өз алдынча окууда кеңири жооптуу тапшырмалар (эссе) бааланбайт.</p>
                <h3>2. Баалоо тутумдарының түрлөрү</h3>
                <p>Баалоо тутумдары айып упайларынын жана жарым-жартылай упайлардын болушуна жараша төрт түргө бөлүнөт.</p>
                <ul>
                    <li>2.1. <strong>Айып упайлары жана жарым-жартылай упайлар менен баалоо тутуму</strong>: Айып упайлары жана жарым-жартылай упайлар тесттерге гана колдонулат; кыска жооптуу тапшырмаларда жарым-жартылай упайлар берилбейт жана ката жооп үчүн айып упайлары чегерилбейт.
                        <ul>
                            <li>2.1.1. <strong>Бир жооптуу тест</strong>
                                <ul>
                                    <li>2.1.1.1. Туура жооп: Белгиленген упай берилет.</li>
                                    <li>2.1.1.2. Жооп тандалбаса же эки же андан көп жооп тандалса: 0 упай берилет.</li>
                                    <li>2.1.1.3. Бир туура эмес жооп тандалса: <strong>белгиленген упай</strong> / (варианттардын саны - 1) өлчөмүндө айып упайы чегерилет.</li>
                                </ul>
                            </li>
                            <li>2.1.2. <strong>Бир нече жооптуу тест</strong>
                                <ul>
                                    <li>2.1.2.1. Тандалган жооптордун саны туура жооптордун санына дал келсе жана бардык тандалган жооптор туура болсо: Белгиленген упай берилет.</li>
                                    <li>2.1.2.2. Тандалган жооптордун саны туура жооптордун санынан айырмаланса: 0 упай берилет.</li>
                                    <li>2.1.2.3. Тандалган жооптордун саны туура жооптордун санына дал келсе: (<strong>варианттардагы туура эмес жооптордун саны</strong> x <strong>тандалган туура жооптордун саны</strong> - <strong>варианттардагы туура жооптордун саны</strong> x <strong>тандалган туура эмес жооптордун саны</strong>) x <strong>белгиленген упай</strong> / <strong>варианттардын жалпы саны</strong> упай берилет.</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>2.2. <strong>Айып упайлары бар жана жарым-жартылай упайларсыз баалоо тутуму</strong>: Айып упайлары тесттерге гана колдонулат; кыска жооптуу тапшырмаларда ката жооп үчүн айып упайлары чегерилбейт.
                        <ul>
                            <li>2.2.1. <strong>Бир жооптуу тест</strong>
                                <ul>
                                    <li>2.2.1.1. Туура жооп: Белгиленген упай берилет.</li>
                                    <li>2.2.1.2. Жооп тандалбаса же эки же андан көп жооп тандалса: 0 упай алынат.</li>
                                    <li>2.2.1.3. Бир туура эмес жооп тандалса: <strong>белгиленген упай</strong> / (варианттардын саны - 1) өлчөмүндө айып упайы чегерилет.</li>
                                </ul>
                            </li>
                            <li>2.2.2. <strong>Бир нече жооптуу тест</strong>
                                <ul>
                                    <li>2.2.2.1. Тандалган жооптордун саны туура жооптордун санына дал келсе жана бардык тандалган жооптор туура болсо: Белгиленген упай берилет.</li>
                                    <li>2.2.2.2. Тандалган жооптордун саны туура жооптордун санынан айырмаланса: 0 упай алынат.</li>
                                    <li>2.2.2.3. Тандалган жооптордун саны туура жооптордун санына дал келсе, бирок туура эмес жооп тандалса же туура жооптордун айрымдары калып калса: <strong>белгиленген упай</strong> / (<strong>варианттардын саны</strong> x (<strong>варианттардын саны</strong> - 1)) өлчөмүндө айып упайы чегерилет.</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>2.3. <strong>Айып упайлары жок жана жарым-жартылай упайлар менен баалоо тутуму</strong>
                        <ul>
                            <li>2.3.1. <strong>Бир жооптуу тест</strong>
                                <ul>
                                    <li>2.3.1.1. Туура жооп: Белгиленген упай берилет.</li>
                                    <li>2.3.1.2. Калган учурларда: 0 упай алынат.</li>
                                </ul>
                            </li>
                            <li>2.3.2. <strong>Бир нече жооптуу тест</strong>
                                <ul>
                                    <li>2.3.2.1. Тандалган жооптордун саны туура жооптордун санына дал келсе жана бардык тандалган жооптор туура болсо: Белгиленген упай берилет.</li>
                                    <li>2.3.2.2. Тандалган жооптордун саны туура жооптордун санынан айырмаланса: 0 упай алынат.</li>
                                    <li>2.3.2.3. Тандалган жооптордун саны туура жооптордун санына дал келсе: <strong>белгиленген упай</strong> x <strong>тандалган туура жооптордун саны</strong> / <strong>варианттардагы туура жооптордун саны</strong> упай берилет.</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>2.4. <strong>Айып упайларысыз жана жарым-жартылай упайларсыз баалоо тутуму</strong>
                        <ul>
                            <li>2.4.1. <strong>Бир жооптуу тест</strong>
                                <ul>
                                    <li>2.4.1.1. Туура жооп: Белгиленген упай берилет.</li>
                                    <li>2.4.1.2. Калган учурларда: 0 упай алынат.</li>
                                </ul>
                            </li>
                            <li>2.4.2. <strong>Бир нече жооптуу тест</strong>
                                <ul>
                                    <li>2.4.2.1. Тандалган жооптордун саны туура жооптордун санына дал келсе жана бардык тандалган жооптор туура болсо: Белгиленген упай берилет.</li>
                                    <li>2.4.2.2. Калган учурларда: 0 упай алынат.</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
                <h3>3. Баалоо эрежелеринин жөндөөлөрүн бөлүшүү</h3>
                <p>Өз алдынча окуунун баалоо эрежелеринин жөндөөлөрү экзамен түзүүдөгү экзамендин чөйрөсүнүн жөндөөлөрү менен маанилерди бөлүшөт, ошондуктан экзамендин чөйрөсүнүн жөндөөлөрүн өзгөртүү өз алдынча окуунун баалоо эрежелеринин жөндөөлөрүн автоматтык түрдө жаңылайт.</p>
            `,
            "selfstudy-usage": `
                <h3>1. Окутуучу</h3>
                <ul>
                    <li>1.1. Окутуучу суроолор банкын түзгөндөн кийин, суроолордун реалдуулугун баалоо куралы катары өз алдынча окууну колдонуп, суроолорду өздөрү чечип көрө алышат.</li>
                    <li>1.2. Экзамен суроолорун түзүүдөн мурун, окутуучулар экзамендин реалдуулугун баалоо куралы катары өз алдынча окууну колдонуп, экзамен чөйрөсүндөгү суроолорду өздөрү чечип көрө алышат.</li>
                </ul>
                <h3>2. Студент</h3>
                <p>Бул окутуучу суроолор банкын ачыкка чыгарган учурда маанилүү болгон жагдайлар.</p>
                <ul>
                    <li>2.1. Студент өз алдынча экзамен суроолорун чечүү менен үйрөнгөн материалдарын кайталоо куралы катары өз алдынча окууну колдоно алат.</li>
                    <li>2.2. Экзамендин алдында студент өз алдынча экзамен чөйрөсүндөгү суроолорду чечүү менен экзаменге даярдануу куралы катары өз алдынча окууну колдоно алат.</li>
                    <li>2.3. Эгерде окутуучу суроолор банкын ачыкка чыгарбаса, студент үйрөнгөн мазмуну боюнча өзү суроолорду түзүп, өзү түзгөн суроолорду чечүү менен тажрыйба топтой алат.</li>
                </ul>
            `
        }
    }
};
