import { Config } from "./Config";
import { InputBuffer } from "./InputBuffer";
import { Evaluator } from "./Evaluator";
import { NumberFormatter } from "./NumberFormatter";
import { DomDisplay } from "./DomDisplay";
import { Calculator } from "./Calculator";
import { KeyMapper } from "./KeyMapper";

/**
 * アプリケーションのエントリーポイント
 *
 * 各オブジェクトを生成し、
 * ボタン入力を Calculator へ連携する。
 */


// 表示先となるDOM要素を取得する
const displayElement = document.getElementById("current");

if(!displayElement){
    throw new Error("display not found");
}

// 画面表示を担当するオブジェクトを生成
const display = new DomDisplay(displayElement);

// 数値入力を管理するオブジェクトを生成
const buffer = new InputBuffer("",Config.MAX_DIGITS);


// 計算処理を担当するオブジェクトを生成
const evaluator = new Evaluator();

// 計算結果の表示形式を管理するオブジェクトを生成
const formatter = new NumberFormatter(Config.MAX_DIGITS);

// 電卓本体を生成
const calculator = new Calculator(
    buffer,
    evaluator,
    formatter,
    display
);

// ボタン入力をKeyTokenへ変換するオブジェクトを生成
const mapper = new KeyMapper();

// すべてのボタンを取得
const buttons = document.querySelectorAll<HTMLButtonElement>(".btn");

// 各ボタンにクリックイベントを登録
buttons.forEach((button) => {

    button.addEventListener("click", () => {

        // ボタン情報をKeyTokenへ変換
        const token = mapper.resolve(button);

        if (token === null) {
            return;
        }

        // KeyTokenの種類に応じてCalculatorへ処理を委譲する
        switch (token.kind) {
            case "digit":
                calculator.handleDigit(token.value);
                break;

            case "decimal":
                calculator.handleDecimalPoint();
                break;

            case "op":
                calculator.handleOperator(token.value);
                break;

            case "equal":
                calculator.handleEqual();
                break;

            case "clear":
                calculator.handleClear();
                break;
        }
    });

});