The Question Bank consists of a header and questions.

### 1. Header
The header contains information about items that appear at the beginning of the exam paper when creating an exam.

1.1. You can edit the header in **Question Bank > Edit Header**.

1.2. The header consists of the title, name, ID, names of question types, and notices.

- 1.2.1. **Title:** The name of the exam, such as Math Final Exam or Science Midterm Exam. It is printed in a large, bold font on the exam paper.
- 1.2.2. **Name:** The word for 'Name' displayed on the exam paper. For example, if you enter 'Full Name', it will appear as 'Full Name:' on the paper.
- 1.2.3. **ID:** The unique identifier for the examinee. If you enter 'Student ID', it will appear as 'Student ID:' on the paper.
- 1.2.4. **Single-choice question:** If you enter 'Type A', it will be printed as '[Type A]' before the question number on the exam paper. This informs the examinee that the question is 'Type A'. If left blank, only empty brackets [ ] will appear.
- 1.2.5. **Multiple-choice question:** If you enter 'Type B', it will be printed as '[Type B]' before the question number. This informs the examinee that the question is 'Type B'. If left blank, only empty brackets [ ] will appear.
- 1.2.6. **Short answer question:** If you enter 'Type C', it will be printed as '[Type C]' before the question number. This informs the examinee that the question is 'Type C'. If left blank, only empty brackets [ ] will appear.
- 1.2.7. **Essay question:** If you enter 'Type D', it will be printed as '[Type D]' before the question number. This informs the examinee that the question is 'Type D'. If left blank, only empty brackets [ ] will appear.
- 1.2.8. **Notice:** Exam instructions. Enter the guidelines for the exam. The name and ID appear below the title, followed by the notice content, and then the questions begin. If there's nothing specific to include, you can add a simple message like 'Good luck!'.

1.3. **Default Header Content button:** Clicking this button automatically fills all fields except the 'Title' with pre-saved default content based on the selected 'Language'. Users can then modify only the necessary parts. The 'Notice' section will be automatically populated with descriptions of question types and scoring rules based on the user's selected 'Scoring Rule' and 'Language'.

### 2. Questions
2.1. Four types of questions are supported: **Single-choice question**, **Multiple-choice question**, **Short answer question**, and **Essay question**. Matching questions are not currently supported. True/False questions can be implemented as two-choice objective questions.

- 2.1.1. **Single-choice question:** A multiple-choice question where only one option is correct.
- 2.1.2. **Multiple-choice question:** A multiple-choice question where two or more options are correct.
- 2.1.3. **Short answer question:** A subjective question where the answer is a single word or a short phrase.
- 2.1.4. **Essay question:** A subjective question where the answer consists of one or more paragraphs.

2.2. Each question in the question array consists of a question number, group number, question text, choices, and a check mark for each choice.

- 2.2.1. **Question Number:** Follows the order of questions in the array. It is recommended to increase question numbers according to the progress of the class, as exam scopes are determined by question numbers. Up to 65,534 questions are possible.
- 2.2.2. **Group Number:** Questions in the same group are essentially the same question with different expressions. Only one question from a group is randomly selected for an exam. This allows for assigning different but equivalent questions to each student. Running **Optimize** automatically adjusts the group number to the smallest question number within that group.
- 2.2.3. **Question Text:** The text of the question. Multiple lines are supported, but images are currently not supported.
- 2.2.4. **Choices:** Between 0 and 255 choices are allowed per question.
- 2.2.5. **Check Mark:** Each choice has one check mark.
    + Objective: Checked choices are the correct answers.
    + Short Answer: All choices must be checked; if the student's response matches any of them, it is correct.
    + Essay: There should be no choices, or all check marks should be unchecked.

2.3. Determining Question Type by Choices and Check Marks

- 2.3.1. Questions with no choices: **Essay question**
- 2.3.2. Questions with choices where all check marks are checked: S**hort answer question**
- 2.3.3. Questions with choices where all check marks are unchecked: **Essay question**
- 2.3.4. Questions with 2 or more choices where only one is checked: Single-choice question
- 2.3.5. Others (2 or more choices, multiple checks): **Multiple-choice question**