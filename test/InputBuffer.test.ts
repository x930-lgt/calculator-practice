import { describe, it, expect } from 'vitest';
import { InputBuffer } from '../src/InputBuffer';

describe("InputBufferのテスト", () => {

    // pushDigitのテスト
    it("数字を入力できる", () => {
        const buffer = new InputBuffer("", 8);

        buffer.pushDigit(5);

        expect(buffer.getValue()).toBe("5");
    });

    it("複数の数字を入力できる", () => {
        const buffer = new InputBuffer("", 8);

        buffer.pushDigit(3);
        buffer.pushDigit(4);

        expect(buffer.getValue()).toBe("34");
    });

    it("0の状態では数字を置き換える", () => {
        const buffer = new InputBuffer("0", 8);

        buffer.pushDigit(4);

        expect(buffer.getValue()).toBe("4");
    });

    it("最大桁数（８桁）を入力できる", () => {
        const buffer = new InputBuffer("", 8);

        buffer.pushDigit(1);
        buffer.pushDigit(2);
        buffer.pushDigit(3);
        buffer.pushDigit(4);
        buffer.pushDigit(5);
        buffer.pushDigit(6);
        buffer.pushDigit(7);
        buffer.pushDigit(8);

        expect(buffer.getValue()).toBe("12345678");
    });

    it("最大桁数（８桁）を超える場合は入力できない", () => {
        const buffer = new InputBuffer("", 8);

        buffer.pushDigit(1);
        buffer.pushDigit(2);
        buffer.pushDigit(3);
        buffer.pushDigit(4);
        buffer.pushDigit(5);
        buffer.pushDigit(6);
        buffer.pushDigit(7);
        buffer.pushDigit(8);
        buffer.pushDigit(9);

        expect(buffer.getValue()).toBe("12345678");
    });


    // pushDecimal
    it("小数点がすでにある場合は小数点を追加しない", () => {
        const buffer = new InputBuffer("", 8);

        buffer.pushDigit(5);
        buffer.pushDecimal();
        buffer.pushDecimal();

        expect(buffer.getValue()).toBe("5.");
    });

    it("空の場合で小数点が押下された場合は0.と入力される", () => {
        const buffer = new InputBuffer("", 8);

        buffer.pushDecimal();

        expect(buffer.getValue()).toBe("0.");
    });

    it("数値の末尾に小数点を追加できる", () => {
        const buffer = new InputBuffer("", 8);
    
        buffer.pushDigit(9);
        buffer.pushDecimal();
    
        expect(buffer.getValue()).toBe("9.");
    });


    // clearのテスト
    it("数値をクリアできる", () => {
        const buffer = new InputBuffer("5", 8);
    
        buffer.clear();
    
        expect(buffer.getValue()).toBe("0");
    });


    // toNumberのテスト
    it("空文字列は0として扱う", () => {
        const buffer = new InputBuffer("", 8);

        expect(buffer.toNumber()).toBe(0);
    });

    it("文字列を数値に変換する", () => {
        const buffer = new InputBuffer("", 8);

        buffer.pushDigit(5);
    
        expect(buffer.toNumber()).toBe(5);
    });


    // isEmptyのテスト
    it("空の場合はtrueを返す", () => {
        const buffer = new InputBuffer("", 8);
    
        expect(buffer.isEmpty()).toBe(true);
    });

    it("値が入力されている場合はfalseを返す", () => {
        const buffer = new InputBuffer("3", 8);
    
        expect(buffer.isEmpty()).toBe(false);
    });

    
    // digitCountのテスト
    it("入力された桁数を取得する", () => {
        const buffer = new InputBuffer("", 8);

        buffer.pushDigit(1);
        buffer.pushDigit(2);
        buffer.pushDigit(3);

        expect(buffer.digitCount()).toBe(3);
    });

    it("小数点は桁数に含めない", () => {
        const buffer = new InputBuffer("", 8);

        buffer.pushDigit(2);
        buffer.pushDecimal();

        expect(buffer.digitCount()).toBe(1);
    });

    it("負号は桁数に含めない", () => {
        const buffer = new InputBuffer("", 8);

        buffer.pushNegative();
        buffer.pushDigit(5);

        expect(buffer.digitCount()).toBe(1);
    });

   
    // getValueのテスト
    it("現在の入力値を取得できる", () => {
        const buffer = new InputBuffer("", 8);

        buffer.pushDigit(1);

        expect(buffer.getValue()).toBe("1");
    });

    it("空の場合は0を返す", () => {
        const buffer = new InputBuffer("", 8);

        expect(buffer.getValue()).toBe("0");
    });


    // pushNegativeのテスト
    it("空の場合は負号を追加する", () => {
        const buffer = new InputBuffer("", 8);

        buffer.pushNegative();

        expect(buffer.getValue()).toBe("-");
    });

    it("値が入力されている場合は負号を追加しない", () => {
        const buffer = new InputBuffer("5", 8);

        buffer.pushNegative();

        expect(buffer.getValue()).toBe("5");
    });

})