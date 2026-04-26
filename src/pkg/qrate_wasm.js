/* @ts-self-types="./qrate_wasm.d.ts" */

export class ChoiceAnswer {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ChoiceAnswer.prototype);
        obj.__wbg_ptr = ptr;
        ChoiceAnswerFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ChoiceAnswerFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_choiceanswer_free(ptr, 0);
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
            const ret = wasm.choiceanswer_get_text(this.__wbg_ptr);
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
        const ret = wasm.choiceanswer_is_correct(this.__wbg_ptr);
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
     * @returns {ChoiceAnswer}
     */
    static new(text, is_correct) {
        const ptr0 = passStringToWasm0(text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.choiceanswer_new(ptr0, len0, is_correct);
        return ChoiceAnswer.__wrap(ret);
    }
}
if (Symbol.dispose) ChoiceAnswer.prototype[Symbol.dispose] = ChoiceAnswer.prototype.free;

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
     * Retrieves the text of a specific choice for a given question number
     * from the QBank.
     *
     *  If the QBank is not loaded, the question number is out of bounds,
     *  or the choice number is out of bounds, it returns a `ChoiceAnswer`
     * instance with an empty text and `false` correctness flag.
     *
     * # Arguments
     * * `question_number` - The index of the question to retrieve the choice for (1-based).
     * * `choice_number` - The index of the choice to retrieve (1-based).
     *
     * # Returns
     * A `ChoiceAnswer` instance containing the text and correctness flag of
     * the specified choice.
     * - If the QBank is not loaded, the question number is invalid,
     *   or the choice number is invalid,
     *   it returns a `ChoiceAnswer` instance with an empty text and
     *   `false` correctness flag.
     *
     * # Examples
     * ```
     * use qrate_wasm::ControlTower;
     * let control_tower = ControlTower::new();
     * assert_eq!(control_tower.get_choice(1, 1), ChoiceAnswer::new(String::new(), false));
     * // After loading a QBank with a question at index 0 that has a choice at index 0 with text "4"
     * // assert_eq!(control_tower.get_choice(1, 1), ChoiceAnswer::new("4".to_string(), true));
     * ```
     * @param {number} question_number
     * @param {number} choice_number
     * @returns {ChoiceAnswer}
     */
    get_choice(question_number, choice_number) {
        const ret = wasm.controltower_get_choice(this.__wbg_ptr, question_number, choice_number);
        return ChoiceAnswer.__wrap(ret);
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
     *  for the student bank
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
}
if (Symbol.dispose) ControlTower.prototype[Symbol.dispose] = ControlTower.prototype.free;

/**
 * @enum {0 | 1 | 2 | 3 | 4 | 5}
 */
export const ErrorMessage = Object.freeze({
    FailedToOpenQBank: 0, "0": "FailedToOpenQBank",
    FailedToOpenSBank: 1, "1": "FailedToOpenSBank",
    FailedToOpenQExcel: 2, "2": "FailedToOpenQExcel",
    FailedToOpenSExcel: 3, "3": "FailedToOpenSExcel",
    FailedToRecevieQBankFromMemory: 4, "4": "FailedToRecevieQBankFromMemory",
    FailedToRecevieSBankFromMemory: 5, "5": "FailedToRecevieSBankFromMemory",
});

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

const ChoiceAnswerFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_choiceanswer_free(ptr >>> 0, 1));
const ControlTowerFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_controltower_free(ptr >>> 0, 1));

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_externrefs.set(idx, obj);
    return idx;
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
