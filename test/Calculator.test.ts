import { describe, it, expect } from "vitest";
import { Calculator } from "../src/Calculator";
import { InputBuffer } from "../src/InputBuffer";
import { Evaluator } from "../src/Evaluator";
import { NumberFormatter } from "../src/NumberFormatter";
import type { IDisplay } from "../src/IDisplay";
import { Operation } from "../src/Enums";

class TestDisplay implements IDisplay {
    text = "";
    history = "";
    error = "";

    render(text: string): void {
        this.text = text;
    }

    renderHistory(text: string): void {
        this.history = text;
    }

    renderError(message: string): void {
        this.error = message;
    }
}

describe("Calculatorのテスト", () => {

    // ====================
    // handleDigitのテスト
    // ====================
    it("数字を入力すると表示される", () => {
        const buffer = new InputBuffer("", 8);
        const evaluator = new Evaluator();
        const formatter = new NumberFormatter(8);
        const display = new TestDisplay();

        const calculator = new Calculator(
            buffer,
            evaluator,
            formatter,
            display
        );

        calculator.handleDigit(5);

        expect(display.text).toBe("5");
    });

    it("複数の数字を入力すると連結して表示される", () => {
        const buffer = new InputBuffer("", 8);
        const evaluator = new Evaluator();
        const formatter = new NumberFormatter(8);
        const display = new TestDisplay();

        const calculator = new Calculator(
            buffer,
            evaluator,
            formatter,
            display
        );

        calculator.handleDigit(1);
        calculator.handleDigit(2);
        calculator.handleDigit(3);

        expect(display.text).toBe("123");
    });

    it("計算結果表示後に数字を押すと新しい入力が開始される", () => {
        const buffer = new InputBuffer("", 8);
        const evaluator = new Evaluator();
        const formatter = new NumberFormatter(8);
        const display = new TestDisplay();

        const calculator = new Calculator(
            buffer,
            evaluator,
            formatter,
            display
        );

        calculator.handleDigit(5);
        calculator.handleOperator(Operation.Add);
        calculator.handleDigit(3);
        calculator.handleEqual();

        calculator.handleDigit(2);

        expect(display.text).toBe("2");
        expect(display.history).toBe("");
    });

    it("エラー表示後に数字を入力すると新しい入力が開始される", () => {
        const buffer = new InputBuffer("", 8);
        const evaluator = new Evaluator();
        const formatter = new NumberFormatter(8);
        const display = new TestDisplay();

        const calculator = new Calculator(
            buffer,
            evaluator,
            formatter,
            display
        );

        calculator.handleDigit(5);
        calculator.handleOperator(Operation.Divide);
        calculator.handleDigit(0);
        calculator.handleEqual();

        calculator.handleDigit(2);

        expect(display.text).toBe("2");
        expect(display.history).toBe("");
    });

    // ====================
    // handleDecimalPointのテスト
    // ====================
    it("小数点を入力すると表示される", () => {
        const buffer = new InputBuffer("", 8);
        const evaluator = new Evaluator();
        const formatter = new NumberFormatter(8);
        const display = new TestDisplay();

        const calculator = new Calculator(
            buffer,
            evaluator,
            formatter,
            display
        );

        calculator.handleDecimalPoint();

        expect(display.text).toBe("0.");
    });

    it("数字が入力されている状態で小数点を入力すると数字の後ろに小数点が表示される", () => {
        const buffer = new InputBuffer("", 8);
        const evaluator = new Evaluator();
        const formatter = new NumberFormatter(8);
        const display = new TestDisplay();

        const calculator = new Calculator(
            buffer,
            evaluator,
            formatter,
            display
        );

        calculator.handleDigit(5);
        calculator.handleDecimalPoint();

        expect(display.text).toBe("5.");
    });

    it("計算結果表示後に小数点を押すと0.から入力が開始される", () => {
        const buffer = new InputBuffer("", 8);
        const evaluator = new Evaluator();
        const formatter = new NumberFormatter(8);
        const display = new TestDisplay();

        const calculator = new Calculator(
            buffer,
            evaluator,
            formatter,
            display
        );

        calculator.handleDigit(5);
        calculator.handleOperator(Operation.Add);
        calculator.handleDigit(5);
        calculator.handleEqual();

        calculator.handleDecimalPoint();
        calculator.handleDigit(2);

        expect(display.text).toBe("0.2");
    });

    // ====================
    // handleOperatorのテスト
    // ====================
    it("数字入力後に演算子を入力すると履歴エリアに表示される", () => {
        const buffer = new InputBuffer("", 8);
        const evaluator = new Evaluator();
        const formatter = new NumberFormatter(8);
        const display = new TestDisplay();

        const calculator = new Calculator(
            buffer,
            evaluator,
            formatter,
            display
        );

        calculator.handleDigit(5);
        calculator.handleOperator(Operation.Add);

        expect(display.history).toBe("5 +");
    });

    it("演算子入力後に別の演算子を入力すると履歴エリアが切り替わる", () => {
        const buffer = new InputBuffer("", 8);
        const evaluator = new Evaluator();
        const formatter = new NumberFormatter(8);
        const display = new TestDisplay();

        const calculator = new Calculator(
            buffer,
            evaluator,
            formatter,
            display
        );

        calculator.handleDigit(5);
        calculator.handleOperator(Operation.Add);
        calculator.handleOperator(Operation.Multiply);

        expect(display.history).toBe("5 ×");
    });

    it("何も入力されていない状態で-の演算子が入力された場合は負数入力が開始される", () => {
        const buffer = new InputBuffer("", 8);
        const evaluator = new Evaluator();
        const formatter = new NumberFormatter(8);
        const display = new TestDisplay();

        const calculator = new Calculator(
            buffer,
            evaluator,
            formatter,
            display
        );

        calculator.handleOperator(Operation.Subtract);
        calculator.handleDigit(5);

        expect(display.text).toBe("-5");
    });

    it("負号だけが入力されている場合は他の演算子は無視される", () => {
        const buffer = new InputBuffer("", 8);
        const evaluator = new Evaluator();
        const formatter = new NumberFormatter(8);
        const display = new TestDisplay();

        const calculator = new Calculator(
            buffer,
            evaluator,
            formatter,
            display
        );

        calculator.handleOperator(Operation.Subtract);
        calculator.handleOperator(Operation.Add);

        expect(display.text).toBe("-");
    });

    it("数値未入力時に(+,×,÷)演算子を入力しても何もしない", () => {
        const buffer = new InputBuffer("", 8);
        const evaluator = new Evaluator();
        const formatter = new NumberFormatter(8);
        const display = new TestDisplay();

        const calculator = new Calculator(
            buffer,
            evaluator,
            formatter,
            display
        );

        calculator.handleOperator(Operation.Add);
        calculator.handleOperator(Operation.Multiply);
        calculator.handleOperator(Operation.Divide);

        expect(display.text).toBe("");
        expect(display.history).toBe("");
    });

    it("負数入力後に計算する", () => {
        const buffer = new InputBuffer("", 8);
        const evaluator = new Evaluator();
        const formatter = new NumberFormatter(8);
        const display = new TestDisplay();

        const calculator = new Calculator(
            buffer,
            evaluator,
            formatter,
            display
        );

        calculator.handleOperator(Operation.Subtract);
        calculator.handleDigit(5);
        calculator.handleOperator(Operation.Add);
        calculator.handleDigit(2);
        calculator.handleEqual();

        expect(display.text).toBe("-3");
        expect(display.history).toBe("-5 + 2 =");
    });

    it("=の後に演算子を押したら、計算結果を左辺として次の計算を開始できる", () => {
        const buffer = new InputBuffer("", 8);
        const evaluator = new Evaluator();
        const formatter = new NumberFormatter(8);
        const display = new TestDisplay();

        const calculator = new Calculator(
            buffer,
            evaluator,
            formatter,
            display
        );

        calculator.handleDigit(5);
        calculator.handleOperator(Operation.Add);
        calculator.handleDigit(3);
        calculator.handleEqual();

        calculator.handleOperator(Operation.Multiply);

        expect(display.text).toBe("8");
        expect(display.history).toBe("8 ×");
    });

    it("数値入力後に別の演算子を入力すると計算結果で連続計算を開始する", () => {
        const buffer = new InputBuffer("", 8);
        const evaluator = new Evaluator();
        const formatter = new NumberFormatter(8);
        const display = new TestDisplay();

        const calculator = new Calculator(
            buffer,
            evaluator,
            formatter,
            display
        );

        calculator.handleDigit(3);
        calculator.handleOperator(Operation.Add);
        calculator.handleDigit(3);

        calculator.handleOperator(Operation.Multiply);

        expect(display.text).toBe("6");
        expect(display.history).toBe("6 ×");
    });

    it("別の演算子を入力して連続計算を実行できる", () => {
        const buffer = new InputBuffer("", 8);
        const evaluator = new Evaluator();
        const formatter = new NumberFormatter(8);
        const display = new TestDisplay();

        const calculator = new Calculator(
            buffer,
            evaluator,
            formatter,
            display
        );

        calculator.handleDigit(3);
        calculator.handleOperator(Operation.Add);
        calculator.handleDigit(3);
        calculator.handleOperator(Operation.Multiply);
        calculator.handleDigit(2);
        calculator.handleEqual();

        expect(display.text).toBe("12");
        expect(display.history).toBe("6 × 2 =");
    });

    it("連続計算時に0除算が発生した場合はErrorを表示する", () => {
        const buffer = new InputBuffer("", 8);
        const evaluator = new Evaluator();
        const formatter = new NumberFormatter(8);
        const display = new TestDisplay();

        const calculator = new Calculator(
            buffer,
            evaluator,
            formatter,
            display
        );

        calculator.handleDigit(5);
        calculator.handleOperator(Operation.Divide);
        calculator.handleDigit(0);
        calculator.handleOperator(Operation.Add);

        expect(display.error).toBe("Error");
    });

    // ====================
    // handleEqualのテスト
    // ====================
    it("イコールボタン入力時に計算する", () => {
        const buffer = new InputBuffer("", 8);
        const evaluator = new Evaluator();
        const formatter = new NumberFormatter(8);
        const display = new TestDisplay();

        const calculator = new Calculator(
            buffer,
            evaluator,
            formatter,
            display
        );

        calculator.handleDigit(5);
        calculator.handleOperator(Operation.Add);
        calculator.handleDigit(3);
        calculator.handleEqual();

        expect(display.text).toBe("8");
        expect(display.history).toBe("5 + 3 =");
    });

    it("イコールボタン入力時に小数の計算をする", () => {
        const buffer = new InputBuffer("", 8);
        const evaluator = new Evaluator();
        const formatter = new NumberFormatter(8);
        const display = new TestDisplay();

        const calculator = new Calculator(
            buffer,
            evaluator,
            formatter,
            display
        );

        calculator.handleDigit(1);
        calculator.handleDecimalPoint();
        calculator.handleDigit(5);
        calculator.handleOperator(Operation.Add);
        calculator.handleDigit(3);
        calculator.handleDecimalPoint();
        calculator.handleDigit(5);
        calculator.handleEqual();

        expect(display.text).toBe("5");
        expect(display.history).toBe("1.5 + 3.5 =");
    });

    it("イコールボタン入力時に負数の計算をする", () => {
        const buffer = new InputBuffer("", 8);
        const evaluator = new Evaluator();
        const formatter = new NumberFormatter(8);
        const display = new TestDisplay();

        const calculator = new Calculator(
            buffer,
            evaluator,
            formatter,
            display
        );


        calculator.handleOperator(Operation.Subtract);
        calculator.handleDigit(5);
        calculator.handleOperator(Operation.Add);
        calculator.handleDigit(3);
        calculator.handleEqual();

        expect(display.text).toBe("-2");
        expect(display.history).toBe("-5 + 3 =");
    });

    it("イコールボタン入力時に小数・負数の計算をする", () => {
        const buffer = new InputBuffer("", 8);
        const evaluator = new Evaluator();
        const formatter = new NumberFormatter(8);
        const display = new TestDisplay();

        const calculator = new Calculator(
            buffer,
            evaluator,
            formatter,
            display
        );

        calculator.handleOperator(Operation.Subtract);
        calculator.handleDigit(1);
        calculator.handleDecimalPoint();
        calculator.handleDigit(5);
        calculator.handleOperator(Operation.Add);
        calculator.handleDigit(3);
        calculator.handleDecimalPoint();
        calculator.handleDigit(5);
        calculator.handleEqual();

        expect(display.text).toBe("2");
        expect(display.history).toBe("-1.5 + 3.5 =");
    });

    it("桁数オーバー時は指数表記になる", () => {
        const buffer = new InputBuffer("", 8);
        const evaluator = new Evaluator();
        const formatter = new NumberFormatter(8);
        const display = new TestDisplay();

        const calculator = new Calculator(
            buffer,
            evaluator,
            formatter,
            display
        );

        calculator.handleDigit(9);
        calculator.handleDigit(9);
        calculator.handleDigit(9);
        calculator.handleDigit(9);
        calculator.handleDigit(9);
        calculator.handleDigit(9);
        calculator.handleDigit(9);
        calculator.handleDigit(9);
        calculator.handleOperator(Operation.Add);
        calculator.handleDigit(1);
        calculator.handleEqual();

        expect(display.text).toBe("1.0000000e+8");
        expect(display.history).toBe("99999999 + 1 =");
    });


    it("演算子未入力でイコールボタンを入力しても何もしない", () => {
        const buffer = new InputBuffer("", 8);
        const evaluator = new Evaluator();
        const formatter = new NumberFormatter(8);
        const display = new TestDisplay();

        const calculator = new Calculator(
            buffer,
            evaluator,
            formatter,
            display
        );

        calculator.handleDigit(5);
        calculator.handleEqual();

        expect(display.text).toBe("5");
        expect(display.history).toBe("");
    });

    it("左辺未入力の状態でイコールボタンを入力しても何もしない", () => {
        const buffer = new InputBuffer("", 8);
        const evaluator = new Evaluator();
        const formatter = new NumberFormatter(8);
        const display = new TestDisplay();

        const calculator = new Calculator(
            buffer,
            evaluator,
            formatter,
            display
        );

        calculator.handleEqual();

        expect(display.text).toBe("");
        expect(display.history).toBe("");
    });

    it("0で除算するとErrorを表示する", () => {
        const buffer = new InputBuffer("", 8);
        const evaluator = new Evaluator();
        const formatter = new NumberFormatter(8);
        const display = new TestDisplay();

        const calculator = new Calculator(
            buffer,
            evaluator,
            formatter,
            display
        );
        
        calculator.handleDigit(5);
        calculator.handleOperator(Operation.Divide);
        calculator.handleDigit(0);
        calculator.handleEqual();

        expect(display.error).toBe("Error");
        expect(display.history).toBe("5 ÷ 0 =");
    });

    // ====================
    // handleClearのテスト
    // ====================
    it("クリアボタン入力時は表示エリアと履歴エリアを初期化する", () => {
        const buffer = new InputBuffer("", 8);
        const evaluator = new Evaluator();
        const formatter = new NumberFormatter(8);
        const display = new TestDisplay();

        const calculator = new Calculator(
            buffer,
            evaluator,
            formatter,
            display
        );

        calculator.handleDigit(5);
        calculator.handleOperator(Operation.Add);
        calculator.handleDigit(3);

        calculator.handleClear();

        expect(display.text).toBe("0");
        expect(display.history).toBe("");
    });

    it("クリアボタン入力後に新しい計算ができる", () => {
        const buffer = new InputBuffer("", 8);
        const evaluator = new Evaluator();
        const formatter = new NumberFormatter(8);
        const display = new TestDisplay();

        const calculator = new Calculator(
            buffer,
            evaluator,
            formatter,
            display
        );

        calculator.handleDigit(5);
        calculator.handleOperator(Operation.Add);
        calculator.handleDigit(3);

        calculator.handleClear();

        calculator.handleDigit(6);
        calculator.handleOperator(Operation.Add);
        calculator.handleDigit(2);
        calculator.handleEqual();

        expect(display.text).toBe("8");
        expect(display.history).toBe("6 + 2 =");
    });








})