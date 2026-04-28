/* @ts-self-types="./qrate_wasm.d.ts" */

export class ChoiceMark {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ChoiceMark.prototype);
        obj.__wbg_ptr = ptr;
        ChoiceMarkFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ChoiceMarkFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_choicemark_free(ptr, 0);
    }
    /**
     * Retrieves the text of the choice answer.
     *
     * # Returns
     * A `String` containing the text of the choice answer.
     *
     * # Examples
     * ```
     * use qrate_wasm::ChoiceAnswer;
     * let choice = ChoiceAnswer::new("Option A".to_string(), true);
     * assert_eq!(choice.get_text(), "Option A");
     * ```
     * @returns {string}
     */
    get_text() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.choicemark_get_text(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Retrieves the correctness flag of the choice answer.
     *
     * # Returns
     * A `bool` indicating whether this choice is the correct answer.
     *
     * # Examples
     * ```
     * use qrate_wasm::ChoiceAnswer;
     * let choice = ChoiceAnswer::new("Option A".to_string(), true);
     * assert!(choice.is_correct());
     * ```
     * @returns {boolean}
     */
    is_correct() {
        const ret = wasm.choicemark_is_correct(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Creates a new `ChoiceAnswer` instance.
     *
     * # Arguments
     * * `text` - The text of the choice answer.
     * * `is_correct` - A boolean indicating whether this choice is the correct answer.
     *
     * # Output
     * `Self` - A new instance of `ChoiceAnswer`.
     *
     * # Examples
     * ```
     * use qrate::ChoiceAnswer;
     * let choice = ChoiceAnswer::new("Option A".to_string(), true);
     * assert_eq!(choice.text, "Option A");
     * assert!(choice.is_correct);
     * ```
     * @param {string} text
     * @param {boolean} is_correct
     */
    constructor(text, is_correct) {
        const ptr0 = passStringToWasm0(text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.choicemark_new(ptr0, len0, is_correct);
        this.__wbg_ptr = ret >>> 0;
        ChoiceMarkFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) ChoiceMark.prototype[Symbol.dispose] = ChoiceMark.prototype.free;

export class ControlTower {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ControlTowerFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_controltower_free(ptr, 0);
    }
    /**
     * Determines the category for a given question number in the QBank.
     *
     * This method uses the `determine_category` function of the QBank to
     * determine the category for the specified question.
     *
     * # Arguments
     * * `question_number` - The 1-based index of the question for which to determine the category.
     *
     * # Returns
     * * `true` if the category was successfully determined and set.
     * * `false` if the question number is out of bounds or the QBank is not loaded.
     *
     * # Examples
     * ```
     * use qrate_wasm::ControlTower;
     * let mut control_tower = ControlTower::new();
     * control_tower.push_an_empty_question();
     * control_tower.determine_category(1);
     * assert!(control_tower.get_category(1), 4);
     * ```
     * @param {number} question_number
     * @returns {boolean}
     */
    determine_category(question_number) {
        const ret = wasm.controltower_determine_category(this.__wbg_ptr, question_number);
        return ret !== 0;
    }
    /**
     * @returns {Uint8Array}
     */
    generate_pdf() {
        const ret = wasm.controltower_generate_pdf(this.__wbg_ptr);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Retrieves the category number for a given question number from the QBank.
     *
     * If the QBank is not loaded or the question number is out of bounds,
     * it returns `0`.
     *
     * # Arguments
     * * `question_number` - The index of the question to retrieve the category for (1-based).
     *
     * # Returns
     * - The category number for the specified question if the QBank is loaded
     *   and the question number is valid.
     * - `0` if the QBank is not loaded or the question number is invalid.
     *
     * # Examples
     * ```
     * use qrate_wasm::ControlTower;
     * let control_tower = ControlTower::new();
     * assert_eq!(control_tower.get_category(1), 0);
     * // After loading a QBank with a question at index 0 that belongs to category
     * // assert_eq!(control_tower.get_category(1), 1);
     * // for single answer of multiple-choice
     * ```
     * @param {number} question_number
     * @returns {number}
     */
    get_category(question_number) {
        const ret = wasm.controltower_get_category(this.__wbg_ptr, question_number);
        return ret;
    }
    /**
     * Retrieves the text of a specific choice for a given question number
     * from the QBank.
     *
     *  If the QBank is not loaded, the question number is out of bounds,
     *  or the choice number is out of bounds, it returns a `ChoiceMark`
     * instance with an empty text and `false` correctness flag.
     *
     * # Arguments
     * * `question_number` - The index of the question to retrieve the choice for (1-based).
     * * `choice_number` - The index of the choice to retrieve (1-based).
     *
     * # Returns
     * A `ChoiceMark` instance containing the text and correctness flag of
     * the specified choice.
     * - If the QBank is not loaded, the question number is invalid,
     *   or the choice number is invalid,
     *   it returns a `ChoiceMark` instance with an empty text and
     *   `false` correctness flag.
     *
     * # Examples
     * ```
     * use qrate_wasm::ControlTower;
     * let control_tower = ControlTower::new();
     * assert_eq!(control_tower.get_choice(1, 1), ChoiceMark::new(String::new(), false));
     * // After loading a QBank with a question at index 0 that has a choice at index 0 with text "4"
     * // assert_eq!(control_tower.get_choice(1, 1), ChoiceMark::new("4".to_string(), true));
     * ```
     * @param {number} question_number
     * @param {number} choice_number
     * @returns {ChoiceMark}
     */
    get_choice(question_number, choice_number) {
        const ret = wasm.controltower_get_choice(this.__wbg_ptr, question_number, choice_number);
        return ChoiceMark.__wrap(ret);
    }
    /**
     * Retrieves the number of choices for a given question number from the QBank.
     *
     * If the QBank is not loaded or the question number is out of bounds,
     * it returns 0.
     *
     * # Arguments
     * * `question_number` - The index of the question to retrieve choices for (1-based).
     *
     * # Returns
     * - The number of choices for the specified question if the QBank is loaded
     *   and the question number is valid.
     * - `0` if the QBank is not loaded or the question number is invalid.
     *
     * # Examples
     * ```
     * use qrate_wasm::ControlTower;
     * let control_tower = ControlTower::new();
     * assert_eq!(control_tower.get_choices_length(1), 0);
     * // After loading a QBank with a question at index 0 that has 4 choices
     * // assert_eq!(control_tower.get_choices_length(1), 4);
     * ```
     * @param {number} question_number
     * @returns {number}
     */
    get_choices_length(question_number) {
        const ret = wasm.controltower_get_choices_length(this.__wbg_ptr, question_number);
        return ret >>> 0;
    }
    /**
     * Retrieves the group number for a given question number from the QBank.
     *
     * If the QBank is not loaded or the question number is out of bounds,
     * it returns `0`.
     *
     * # Arguments
     * * `question_number` - The index of the question to retrieve the group for (1-based).
     *
     * # Returns
     * - The group number for the specified question if the QBank is loaded
     *   and the question number is valid.
     * - `0` if the QBank is not loaded or the question number is invalid.
     *
     * # Examples
     * ```
     * use qrate_wasm::ControlTower;
     * let control_tower = ControlTower::new();
     * assert_eq!(control_tower.get_group(1), 0);
     * // After loading a QBank with a question at index 0 that belongs to group 1
     * // assert_eq!(control_tower.get_group(1), 1);
     * ```
     * @param {number} question_number
     * @returns {number}
     */
    get_group(question_number) {
        const ret = wasm.controltower_get_group(this.__wbg_ptr, question_number);
        return ret;
    }
    /**
     * Retrieves the question text for a given question number from the QBank.
     *
     * If the QBank is not loaded or the question number is out of bounds,
     * it returns an empty string.
     *
     * # Arguments
     * * `question_number` - The index of the question to retrieve (1-based).
     *
     * # Returns
     * - The question text as a `String` if the QBank is loaded
     *   and the question number is valid.
     * - An empty string if the QBank is not loaded or the question number
     *   is invalid.
     *
     * # Examples
     * ```
     * use qrate_wasm::ControlTower;
     * let control_tower = ControlTower::new();
     * assert_eq!(control_tower.get_question(1), "");
     * // After loading a QBank with a question at index 0 with text "What is 2+2?"
     * // assert_eq!(control_tower.get_question(1), "What is 2+2?");
     * ```
     * @param {number} question_number
     * @returns {string}
     */
    get_question(question_number) {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.controltower_get_question(this.__wbg_ptr, question_number);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Returns the number of questions in the question bank (QBank).
     *
     * If the QBank is not loaded, it returns 0.
     *
     * # Returns
     * - The number of questions in the QBank if it is loaded and has questions.
     * - `0` if the QBank has no questions or is not loaded.
     *
     * # Examples
     * ```
     * use qrate_wasm::ControlTower;
     * let control_tower = ControlTower::new();
     * assert_eq!(control_tower.get_question_length(), 0);
     * // After loading a QBank with 10 questions
     * // assert_eq!(control_tower.get_question_length(), 10);
     * ```
     * @returns {number}
     */
    get_question_length() {
        const ret = wasm.controltower_get_question_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Retrieves the name and ID of a student by their 1-based index from the SBank.
     *
     * If the SBank is not loaded or the student number is out of bounds,
     * it returns a tuple of two empty strings.
     *
     * # Arguments
     * * `student_number` - The 1-based index of the student to retrieve.
     *
     * # Returns
     * - A tuple containing the name and ID of the student if the SBank is
     *   loaded and the student number is valid.
     * - A tuple of two empty strings if the SBank is not loaded or the student
     *   number is invalid.
     *
     * # Examples
     * ```
     * use qrate_wasm::ControlTower;
     * let control_tower = ControlTower::new();
     * assert_eq!(control_tower.get_student(1), NameId::new(String::new(), String::new()));
     * // After loading an SBank with a student at index 0 with name "Alice" and ID "s123"
     * // assert_eq!(control_tower.get_student(1), NameId::new("Alice".to_string(), "s123".to_string()));
     * ```
     * @param {number} student_number
     * @returns {NameId}
     */
    get_student(student_number) {
        const ret = wasm.controltower_get_student(this.__wbg_ptr, student_number);
        return NameId.__wrap(ret);
    }
    /**
     * Retrieves the number of students in the student bank (SBank).
     *
     * If the SBank is not loaded, it returns 0.
     *
     * # Returns
     * - The number of students in the SBank if it is loaded and has students.
     * - `0` if the SBank has no students or is not loaded.
     *
     * # Examples
     * ```
     * use qrate_wasm::ControlTower;
     * let control_tower = ControlTower::new();
     * assert_eq!(control_tower.get_student_length(), 0);
     * // After loading an SBank with 30 students
     * // assert_eq!(control_tower.get_student_length(), 30);
     * ```
     * @returns {number}
     */
    get_student_length() {
        const ret = wasm.controltower_get_student_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Creates a new instance of `ControlTower` with default values.
     *
     * The `question_db` and `student_db` fields are initialized
     * to `AbstractDB::None`, and the `qbank`, `sbank`, and `generator`
     * fields are initialized to `None`.
     *
     * # Returns
     * A new `ControlTower` instance with default values.
     * # Examples
     * ```
     * use qrate_wasm::ControlTower;
     * let control_tower = ControlTower::new();
     * assert!(control_tower.question_db.is_none());
     * assert!(control_tower.student_db.is_none());
     * assert!(control_tower.qbank.is_none());
     * assert!(control_tower.sbank.is_none());
     * assert!(control_tower.generator.is_none());
     * ```
     */
    constructor() {
        const ret = wasm.controltower_new();
        this.__wbg_ptr = ret >>> 0;
        ControlTowerFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Optimizes the question bank (QBank) by calling its `optimize` method.
     *
     * If the QBank is not loaded, this method does nothing.
     *
     * # Examples
     * ```
     * use qrate_wasm::ControlTower;
     * let mut control_tower = ControlTower::new();
     * control_tower.optimize_qbank();
     * // After loading a QBank, it will be optimized
     * control_tower.optimize_qbank();
     * ```
     */
    optimize_qbank() {
        wasm.controltower_optimize_qbank(this.__wbg_ptr);
    }
    /**
     * Pushes an empty question to the QBank.
     *
     * # Examples
     * ```
     * use qrate_wasm::ControlTower;
     * let mut control_tower = ControlTower::new();
     * control_tower.push_an_empty_question();
     * assert_eq!(control_tower.get_question_length(), 1);
     * ```
     */
    push_an_empty_question() {
        wasm.controltower_push_an_empty_question(this.__wbg_ptr);
    }
    /**
     * Adds a new choice to a specific question in the QBank.
     *
     * If the QBank is not loaded or the question number is out of bounds,
     * it returns `false`. Otherwise, it adds the choice and returns `true`.
     *
     * # Arguments
     * * `question_number` - The index of the question to add the choice to (1-based).
     * * `choice` - The text of the new choice.
     * * `answer` - The correctness flag for the new choice.
     *
     * # Returns
     * - `true` if the choice was successfully added.
     * - `false` if the QBank is not loaded or the question number is invalid.
     *
     * # Examples
     * ```
     * use qrate_wasm::ControlTower;
     * let control_tower = ControlTower::new();
     * assert_eq!(control_tower.push_choice(1, "4".to_string(), true), false);
     * // After loading a QBank with a question at index 0
     * // assert_eq!(control_tower.push_choice(1, "4".to_string(), true), true);
     * ```
     * @param {number} question_number
     * @param {string} choice
     * @param {boolean} answer
     * @returns {boolean}
     */
    push_choice(question_number, choice, answer) {
        const ptr0 = passStringToWasm0(choice, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.controltower_push_choice(this.__wbg_ptr, question_number, ptr0, len0, answer);
        return ret !== 0;
    }
    /**
     * Adds a new student to the end of the SBank using the provided `NameId`.
     *
     * If the SBank is not loaded, this method does nothing.
     *
     * # Arguments
     * * `name_id` - A `NameId` containing the name and ID of the student to add.
     *
     * # Examples
     * ```
     * use qrate_wasm::ControlTower;
     * let mut control_tower = ControlTower::new();
     * control_tower.push_student(NameId::new("Alice".to_string(), "s123".to_string()));
     * // After loading an SBank, the student "Alice" with ID "s123" should be added to the end of the SBank.
     * ```
     * @param {NameId} name_id
     */
    push_student(name_id) {
        _assertClass(name_id, NameId);
        var ptr0 = name_id.__destroy_into_raw();
        wasm.controltower_push_student(this.__wbg_ptr, ptr0);
    }
    /**
     * Removes a question from the QBank by its 1-based index.
     *
     * If the QBank is not loaded or the question number is out of bounds,
     * it returns `false`. Otherwise, it removes the question and returns `true`.
     *
     * # Arguments
     * * `question_number` - The 1-based index of the question to remove.
     *
     * # Returns
     * - `true` if the question was successfully removed.
     * - `false` if the QBank is not loaded or the question number is invalid.
     *
     * # Examples
     * ```
     * use qrate_wasm::ControlTower;
     * let control_tower = ControlTower::new();
     * assert_eq!(control_tower.remove_question(1), false);
     * // After loading a QBank with a question at index 0
     * // assert_eq!(control_tower.remove_question(1), true);
     * ```
     * @param {number} question_number
     * @returns {boolean}
     */
    remove_question(question_number) {
        const ret = wasm.controltower_remove_question(this.__wbg_ptr, question_number);
        return ret !== 0;
    }
    /**
     * Removes a student from the SBank by their 1-based index.
     *
     * If the SBank is not loaded or the student number is out of bounds,
     * it returns `false`. Otherwise, it removes the student and returns `true`.
     *
     * # Arguments
     * * `student_number` - The 1-based index of the student to remove.
     *
     * # Returns
     * - `true` if the student was successfully removed.
     * - `false` if the SBank is not loaded or the student number is invalid.
     *
     * # Examples
     * ```
     * use qrate_wasm::ControlTower;
     * let mut control_tower = ControlTower::new();
     * assert_eq!(control_tower.remove_student(1), false);
     * // After loading an SBank with a student at index 0
     * // assert_eq!(control_tower.remove_student(1), true);
     * ```
     * @param {number} student_number
     * @returns {boolean}
     */
    remove_student(student_number) {
        const ret = wasm.controltower_remove_student(this.__wbg_ptr, student_number);
        return ret !== 0;
    }
    /**
     * Sets the category number for a given question number in the QBank.
     *
     * If the QBank is not loaded or the question number is out of bounds,
     * it returns `false`. Otherwise, it updates the category number and returns `true`.
     *
     * # Arguments
     * * `question_number` - The index of the question to set the category for (1-based).
     * * `category` - The new category number to set for the specified question.
     *
     * # Returns
     * - `true` if the category number was successfully updated.
     * - `false` if the QBank is not loaded or the question number is invalid.
     *
     * # Examples
     * ```
     * use qrate_wasm::ControlTower;
     * let control_tower = ControlTower::new();
     * assert_eq!(control_tower.set_category(1, 1), false);
     * // After loading a QBank with a question at index 0
     * // assert_eq!(control_tower.set_category(1, 1), true);
     * ```
     * @param {number} question_number
     * @param {number} category
     * @returns {boolean}
     */
    set_category(question_number, category) {
        const ret = wasm.controltower_set_category(this.__wbg_ptr, question_number, category);
        return ret !== 0;
    }
    /**
     * Sets the text and correctness flag of a specific choice for a given question number
     * in the QBank.
     *
     * If the QBank is not loaded, the question number is out of bounds,
     * or the choice number is out of bounds, it returns `false`. Otherwise,
     * it updates the choice and returns `true`.
     *
     * # Arguments
     * * `question_number` - The index of the question to set the choice for (1-based).
     * * `choice_number` - The index of the choice to set (1-based).
     * * `choice_answer` - A `ChoiceMark` instance containing the new text
     *   and correctness flag for the specified choice.
     *
     * # Returns
     * - `true` if the choice was successfully updated.
     * - `false` if the QBank is not loaded, the question number is invalid,
     *   or the choice number is invalid.
     *
     * # Examples
     * ```
     * use qrate_wasm::ControlTower;
     * let control_tower = ControlTower::new();
     * assert_eq!(control_tower.set_choice(1, 1, ChoiceMark::new("4".to_string(), true)), false);
     * // After loading a QBank with a question at index 0 that has a choice at index 0
     * // assert_eq!(control_tower.set_choice(1, 1, ChoiceMark::new("4".to_string(), true)), true);
     * ```
     * @param {number} question_number
     * @param {number} choice_number
     * @param {ChoiceMark} choice_answer
     * @returns {boolean}
     */
    set_choice(question_number, choice_number, choice_answer) {
        _assertClass(choice_answer, ChoiceMark);
        var ptr0 = choice_answer.__destroy_into_raw();
        const ret = wasm.controltower_set_choice(this.__wbg_ptr, question_number, choice_number, ptr0);
        return ret !== 0;
    }
    /**
     * Sets the group number for a given question number in the QBank.
     *
     * If the QBank is not loaded or the question number is out of bounds,
     * it returns `false`. Otherwise, it updates the group number and returns `true`.
     *
     * # Arguments
     * * `question_number` - The index of the question to set the group for (1-based).
     * * `group` - The new group number to set for the specified question.
     *
     * # Returns
     * - `true` if the group number was successfully updated.
     * - `false` if the QBank is not loaded or the question number is invalid.
     *
     * # Examples
     * ```
     * use qrate_wasm::ControlTower;
     * let control_tower = ControlTower::new();
     * assert_eq!(control_tower.set_group(1, 1), false);
     * // After loading a QBank with a question at index 0
     * // assert_eq!(control_tower.set_group(1, 1), true);
     * ```
     * @param {number} question_number
     * @param {number} group
     * @returns {boolean}
     */
    set_group(question_number, group) {
        const ret = wasm.controltower_set_group(this.__wbg_ptr, question_number, group);
        return ret !== 0;
    }
    /**
     * Loads the question bank (QBank) from a byte slice
     * containing SQLite database data.
     *
     * This method attempts to create an in-memory SQLite database
     * from the provided byte data and read the QBank from it.
     *
     * If successful, it sets the `question_db` field to the new SQLite
     * database and returns `Ok(())`.
     * If it fails at any point, it returns an `Err` with an appropriate error.
     *
     * # Arguments
     * * `data` - A byte slice containing the SQLite database data
     *  for the question bank
     *
     * # Returns
     * - `Ok(())` on success
     * - `Err(ErrorMessage)` describing the failure on error.
     *
     * # Examples
     * ```
     * use qrate_wasm::ControlTower;
     * use qrate::SQLiteDB;
     * use std::fs;
     *
     * let mut control_tower = ControlTower::new();
     * let data = fs::read("path_to_qbank.sqlite").expect("Failed to read file");
     * match control_tower.set_qbank_from_bytes_in_sqlite(&data)
     * {
     *     Ok(()) => println!("QBank loaded successfully"),
     *     Err(e) => println!("Failed to load QBank: {:?}", e),
     * }
     * ```
     * @param {Uint8Array} data
     */
    set_qbank_from_bytes_in_sqlite(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.controltower_set_qbank_from_bytes_in_sqlite(this.__wbg_ptr, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * Sets the question text for a given question number in the QBank.
     * If the QBank is not loaded or the question number is out of bounds,
     * it returns `false`. Otherwise, it updates the question text and returns `true`.
     *
     * # Arguments
     * * `question_number` - The index of the question to set (1-based).
     * * `txt` - The new question text to set for the specified question.
     *
     * # Returns
     * - `true` if the question text was successfully updated.
     * - `false` if the QBank is not loaded or the question number is invalid.
     *
     * # Examples
     * ```
     * use qrate_wasm::ControlTower;
     * let control_tower = ControlTower::new();
     * assert_eq!(control_tower.set_question(1, "What is 2+2?".to_string()), false);
     * // After loading a QBank with a question at index 0
     * // assert_eq!(control_tower.set_question(1, "What is 2+2?".to_string()), true);
     * ```
     * @param {number} question_number
     * @param {string} txt
     * @returns {boolean}
     */
    set_question(question_number, txt) {
        const ptr0 = passStringToWasm0(txt, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.controltower_set_question(this.__wbg_ptr, question_number, ptr0, len0);
        return ret !== 0;
    }
    /**
     * Loads the student bank (SBank) from a byte slice
     * containing SQLite database data.
     *
     * This method attempts to create an in-memory SQLite database
     * from the provided byte data and read the SBank from it.
     *
     * If successful, it sets the `student_db` field to the new SQLite
     * database and returns `Ok(())`.
     * If it fails at any point, it returns an `Err` with an appropriate error.
     *
     * # Arguments
     * * `data` - A byte slice containing the SQLite database data
     *   for the student bank
     *
     * # Returns
     * - `Ok(())` on success
     * - `Err(ErrorMessage)` describing the failure on error.
     *
     * # Examples
     * ```
     * use qrate_wasm::ControlTower;
     * use qrate::SQLiteDB;
     * use std::fs;
     *
     * let mut control_tower = ControlTower::new();
     * let data = fs::read("path_to_sbank.sqlite").expect("Failed to read file");
     * match control_tower.set_sbank_from_bytes_in_sqlite(&data)
     * {
     *     Ok(()) => println!("SBank loaded successfully"),
     *     Err(e) => println!("Failed to load SBank: {:?}", e),
     * }
     * ```
     * @param {Uint8Array} data
     */
    set_sbank_from_bytes_in_sqlite(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.controltower_set_sbank_from_bytes_in_sqlite(this.__wbg_ptr, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * Sets the name and ID of a student by their 1-based index in the SBank.
     *
     * If the SBank is not loaded or the student number is out of bounds,
     * it returns `false`. Otherwise, it updates the student's name and ID and returns `true`.
     *
     * # Arguments
     * * `student_number` - The 1-based index of the student to set.
     * * `name_id` - A `NameId` containing the new name and ID for the student.
     *
     * # Returns
     * - `true` if the student's name and ID were successfully updated.
     * - `false` if the SBank is not loaded or the student number is invalid.
     *
     * # Examples
     * ```
     * use qrate_wasm::ControlTower;
     * let control_tower = ControlTower::new();
     * assert_eq!(control_tower.set_student(1, NameId::new("Alice".to_string(), "s123".to_string())), false);
     * // After loading an SBank with a student at index 0
     * // assert_eq!(control_tower.set_student(1, NameId::new("Alice".to_string(), "s123".to_string())), true);
     * ```
     * @param {number} student_number
     * @param {NameId} name_id
     * @returns {boolean}
     */
    set_student(student_number, name_id) {
        _assertClass(name_id, NameId);
        var ptr0 = name_id.__destroy_into_raw();
        const ret = wasm.controltower_set_student(this.__wbg_ptr, student_number, ptr0);
        return ret !== 0;
    }
    /**
     * Writes the question bank (QBank) to a byte vector containing SQLite
     * database data.
     *
     * This method creates an in-memory SQLite database, writes the QBank to it,
     * and then saves the database to a byte vector.
     *
     * # Returns
     * - `Ok(Vec<u8>)` containing the SQLite database data on success
     * - `Err(ErrorMessage)` describing the failure on error.
     *
     * # Examples
     * ```
     * use qrate_wasm::ControlTower;
     * let control_tower = ControlTower::new();
     * match control_tower.write_qbank_to_bytes_in_sqlite()
     * {
     *     Ok(data) => println!("QBank written to bytes successfully, size: {}", data.len()),
     *     Err(e) => println!("Failed to write QBank to bytes: {:?}", e),
     * }
     * ```
     * @returns {Uint8Array}
     */
    write_qbank_to_bytes_in_sqlite() {
        const ret = wasm.controltower_write_qbank_to_bytes_in_sqlite(this.__wbg_ptr);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Writes the student bank (SBank) to a byte vector containing SQLite
     * database data.
     *
     * This method creates an in-memory SQLite database, writes the SBank to it,
     * and then saves the database to a byte vector.
     *
     * # Returns
     * - `Ok(Vec<u8>)` containing the SQLite database data on success
     * - `Err(ErrorMessage)` describing the failure on error.
     *
     * # Examples
     * ```
     * use qrate_wasm::ControlTower;
     * let control_tower = ControlTower::new();
     * match control_tower.write_sbank_to_bytes_in_sqlite()
     * {
     *     Ok(data) => println!("SBank written to bytes successfully, size: {}", data.len()),
     *     Err(e) => println!("Failed to write SBank to bytes: {:?}", e),
     * }
     * ```
     * @returns {Uint8Array}
     */
    write_sbank_to_bytes_in_sqlite() {
        const ret = wasm.controltower_write_sbank_to_bytes_in_sqlite(this.__wbg_ptr);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
}
if (Symbol.dispose) ControlTower.prototype[Symbol.dispose] = ControlTower.prototype.free;

/**
 * @enum {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7}
 */
export const ErrorMessage = Object.freeze({
    FailedToOpenQBank: 0, "0": "FailedToOpenQBank",
    FailedToOpenSBank: 1, "1": "FailedToOpenSBank",
    FailedToOpenQExcel: 2, "2": "FailedToOpenQExcel",
    FailedToOpenSExcel: 3, "3": "FailedToOpenSExcel",
    FailedToRecevieQBankFromMemory: 4, "4": "FailedToRecevieQBankFromMemory",
    FailedToRecevieSBankFromMemory: 5, "5": "FailedToRecevieSBankFromMemory",
    FailedToWriteQBankToMemory: 6, "6": "FailedToWriteQBankToMemory",
    FailedToWriteSBankToMemory: 7, "7": "FailedToWriteSBankToMemory",
});

export class NameId {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(NameId.prototype);
        obj.__wbg_ptr = ptr;
        NameIdFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        NameIdFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_nameid_free(ptr, 0);
    }
    /**
     * Retrieves the ID from the `NameId` instance.
     *
     * # Returns
     * A `String` containing the ID.
     *
     * # Examples
     * ```
     * use qrate_wasm::NameId;
     * let name_id = NameId::new("Alice".to_string(), "s123".to_string());
     * assert_eq!(name_id.get_id(), "s123");
     * ```
     * @returns {string}
     */
    get_id() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.nameid_get_id(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Retrieves the name from the `NameId` instance.
     *
     * # Returns
     * A `String` containing the name.
     *
     * # Examples
     * ```
     * use qrate_wasm::NameId;
     * let name_id = NameId::new("Alice".to_string(), "s123".to_string());
     * assert_eq!(name_id.get_name(), "Alice");
     * ```
     * @returns {string}
     */
    get_name() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.nameid_get_name(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Creates a new `NameId` instance.
     *
     * # Arguments
     * * `name` - The name associated with the ID.
     * * `id` - The ID associated with the name.
     *
     * # Output
     * `Self` - A new instance of `NameId`.
     *
     * # Examples
     * ```
     * use qrate_wasm::NameId;
     * let name_id = NameId::new("Alice".to_string(), "s123".to_string());
     * assert_eq!(name_id.get_name(), "Alice");
     * assert_eq!(name_id.get_id(), "s123");
     * ```
     * @param {string} name
     * @param {string} id
     */
    constructor(name, id) {
        const ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.nameid_new(ptr0, len0, ptr1, len1);
        this.__wbg_ptr = ret >>> 0;
        NameIdFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Creates a new empty `NameId` instance.
     *
     * # Arguments
     * * `name` - The name associated with the ID.
     * * `id` - The ID associated with the name.
     *
     * # Output
     * `Self` - A new instance of `NameId`.
     *
     * # Examples
     * ```
     * use qrate_wasm::NameId;
     * let name_id = NameId::new_empty();
     * assert_eq!(name_id.get_name(), "");
     * assert_eq!(name_id.get_id(), "");
     * ```
     * @returns {NameId}
     */
    static new_empty() {
        const ret = wasm.nameid_new_empty();
        return NameId.__wrap(ret);
    }
}
if (Symbol.dispose) NameId.prototype[Symbol.dispose] = NameId.prototype.free;

/**
 * @param {string} input_data
 * @returns {string}
 */
export function generate_exam_wasm(input_data) {
    let deferred2_0;
    let deferred2_1;
    try {
        const ptr0 = passStringToWasm0(input_data, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.generate_exam_wasm(ptr0, len0);
        deferred2_0 = ret[0];
        deferred2_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}
function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg___wbindgen_throw_6b64449b9b9ed33c: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbg_getDate_a6d29e0195e2b922: function(arg0) {
            const ret = arg0.getDate();
            return ret;
        },
        __wbg_getDay_d40b1e1b4ed9ae92: function(arg0) {
            const ret = arg0.getDay();
            return ret;
        },
        __wbg_getFullYear_87c6d68ce4941f16: function(arg0) {
            const ret = arg0.getFullYear();
            return ret;
        },
        __wbg_getHours_bba0ffaba65cf3f1: function(arg0) {
            const ret = arg0.getHours();
            return ret;
        },
        __wbg_getMinutes_240bbdd69fb6e5d0: function(arg0) {
            const ret = arg0.getMinutes();
            return ret;
        },
        __wbg_getMonth_774597931909564c: function(arg0) {
            const ret = arg0.getMonth();
            return ret;
        },
        __wbg_getRandomValues_477b66419bbb968d: function() { return handleError(function (arg0, arg1) {
            globalThis.crypto.getRandomValues(getArrayU8FromWasm0(arg0, arg1));
        }, arguments); },
        __wbg_getSeconds_95f730540087b3b6: function(arg0) {
            const ret = arg0.getSeconds();
            return ret;
        },
        __wbg_getTime_da7c55f52b71e8c6: function(arg0) {
            const ret = arg0.getTime();
            return ret;
        },
        __wbg_getTimezoneOffset_31f57a5389d0d57c: function(arg0) {
            const ret = arg0.getTimezoneOffset();
            return ret;
        },
        __wbg_new_0_4d657201ced14de3: function() {
            const ret = new Date();
            return ret;
        },
        __wbg_new_7913666fe5070684: function(arg0) {
            const ret = new Date(arg0);
            return ret;
        },
        __wbg_new_with_year_month_day_c5da92578bfcdd66: function(arg0, arg1, arg2) {
            const ret = new Date(arg0 >>> 0, arg1, arg2);
            return ret;
        },
        __wbg_random_ce7f6871aed001dd: function() {
            const ret = Math.random();
            return ret;
        },
        __wbindgen_cast_0000000000000001: function(arg0) {
            // Cast intrinsic for `F64 -> Externref`.
            const ret = arg0;
            return ret;
        },
        __wbindgen_cast_0000000000000002: function(arg0, arg1) {
            // Cast intrinsic for `Ref(String) -> Externref`.
            const ret = getStringFromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            const offset = table.grow(4);
            table.set(0, undefined);
            table.set(offset + 0, undefined);
            table.set(offset + 1, null);
            table.set(offset + 2, true);
            table.set(offset + 3, false);
        },
    };
    return {
        __proto__: null,
        "./qrate_wasm_bg.js": import0,
    };
}

const ChoiceMarkFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_choicemark_free(ptr >>> 0, 1));
const ControlTowerFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_controltower_free(ptr >>> 0, 1));
const NameIdFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_nameid_free(ptr >>> 0, 1));

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_externrefs.set(idx, obj);
    return idx;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return decodeText(ptr, len);
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_externrefs.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    };
}

let WASM_VECTOR_LEN = 0;

let wasmModule, wasm;
function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    wasmModule = module;
    cachedUint8ArrayMemory0 = null;
    wasm.__wbindgen_start();
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = module.ok && expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (module !== undefined) {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL('qrate_wasm_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
