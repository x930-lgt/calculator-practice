import { CalcState } from "./Enums";
import { Operation } from "./Enums";
import { operationToSymbol } from "./Enums";
import { InputBuffer } from "./InputBuffer";
import { Evaluator } from "./Evaluator";
import { NumberFormatter } from "./NumberFormatter";
import type { IDisplay } from "./IDisplay";
import { Config } from "./Config";


/**
 * 電卓の状態管理と計算処理を行うクラス
 *
 * 入力されたキーに応じて内部状態を更新し、
 * 計算結果をディスプレイへ反映する。
 */

export class Calculator {
    private state: CalcState;
    private left: number | null;
    private operator: Operation | null;
    private buffer: InputBuffer;
    private evaluator: Evaluator;
    private formatter: NumberFormatter;
    private display: IDisplay;


    /**
    * @param buffer 数値入力を管理するバッファ
    * @param evaluator 四則演算を実行するオブジェクト
    * @param formatter 表示用の数値整形を行うオブジェクト
    * @param display 表示先
    */

    constructor(
        buffer: InputBuffer,
        evaluator: Evaluator,
        formatter: NumberFormatter,
        display: IDisplay
    ) {
        this.state = CalcState.Ready;
        this.left = null;
        this.operator = null;
        this.buffer = buffer;
        this.evaluator = evaluator;
        this.formatter = formatter;
        this.display = display;
    }


    /**
    * 数字キー入力を処理する
    *
    * @param d 入力された数字
    */

    handleDigit(d: number): void {
        // エラー状態の場合は初期化して入力を再開する
        if (this.state === CalcState.Error) {
            this.handleClear();
        }

        // 計算結果表示後に数字が押された場合は新しい計算を開始する
        if (this.state === CalcState.ResultShown) {
            this.handleClear();
        }

        // 入力された数字をバッファへ追加
        this.buffer.pushDigit(d);

        // 現在の入力値を表示する
        this.display.render(this.buffer.getValue());
    }




    /**
    * 小数点入力を処理する
    */

    handleDecimalPoint(): void {
        // 小数点をバッファへ追加する
        this.buffer.pushDecimal();

        // 現在の入力値を表示する
        this.display.render(this.buffer.getValue());
    }


    /**
    * 演算子入力を処理する
    *
    * @param op 入力された演算子
    */

    handleOperator(op: Operation): void {

        //数値未入力時に「-」が押下された場合は負数入力を開始する
        if (this.state === CalcState.Ready &&
            op === Operation.Subtract &&
            this.buffer.isEmpty()
        ) {
            this.buffer.pushNegative();

            this.display.render(this.buffer.getValue());

            return;
        }

        // 負数入力中に「-」が再度押された場合は無視する
        if (
            this.buffer.getValue() === "-" &&
            op === Operation.Subtract
        ) {
            return;
        }

        // 「-」だけが入力されている状態では、他の演算子を無視する
        if (
            this.buffer.getValue() === "-"
        ) {
            return;
        }

        // 数値未入力時は「-」以外の演算子を無視する
        if (this.state === CalcState.Ready &&
            this.buffer.isEmpty()
        ) {
            return;
        }

        // 「=」の直後に演算子が押された場合
        if (this.state === CalcState.ResultShown) {
            console.log("＝後の左の数字", this.left);


            // 計算結果を左辺として使うので演算子だけ更新する
            this.operator = op;

            // 次の数字入力に備えてバッファをクリア
            this.buffer.clear();

            // 演算子入力済み状態へ遷移
            this.state = CalcState.OperatorEntered;

            return;
        }

        // 現在入力中の値を右辺として取得
        const right = this.buffer.toNumber();

        // 初回の演算子入力の場合
        if (this.left === null || this.state === CalcState.Ready) {

            // 現在の値を左辺として保存
            this.left = right;
            console.log("初回左の数字", this.left);

            // 入力された演算子を保存
            this.operator = op;

            // 次の数値入力に備えてバッファをクリア
            this.buffer.clear();

            // 演算子入力済み状態へ遷移
            this.state = CalcState.OperatorEntered;

            return;
        }

        try {

            // 左辺 演算子 右辺で計算を実行
            const result = this.evaluator.compute(
                this.left,
                this.operator!,
                right
            );

            // 計算結果を次回計算の左辺として保持
            this.left = result;

            // 計算結果を表示
            this.display.render(
                this.formatter.formatForDisplay(result)
            );

        } catch (e: unknown) {

            // エラー状態へ遷移
            this.state = CalcState.Error;

            // エラーメッセージを表示
            this.display.renderError(Config.ERROR_MESSAGE);

            return;
        }

        // 新しく入力された演算子を保存
        this.operator = op;

        // 次の数値入力に備えてバッファをクリア
        this.buffer.clear();

        // 演算子入力済み状態へ遷移
        this.state = CalcState.OperatorEntered;
    }


    /**
    * イコール入力を処理し計算を実行する
    */

    handleEqual(): void {

        // 左辺または演算子が未設定の場合は計算できない
        if (this.left === null || this.operator === null) {
            return;
        }

        // 現在入力中の値を右辺として取得
        const right: number = this.buffer.toNumber();
        console.log(right);
        try {
            // 左辺 演算子 右辺 で計算を実行
            const result: number = this.evaluator.compute(
                this.left,
                this.operator,
                right
            );
            // 演算子を表示用の記号へ変換
            const symbol = operationToSymbol(this.operator);
            
            // 計算式を履歴エリアへ表示
            this.display.renderHistory(
                `${this.left} ${symbol} ${right} =`
            );

            // 表示用の文字列へ変換
            const formatted = this.formatter.formatForDisplay(result);

            // 計算結果を表示
            this.display.render(formatted);

            // 結果表示状態へ遷移
            this.state = CalcState.ResultShown;

            // 継続計算に備えて結果を左辺として保持
            this.left = result;

            // 演算子はクリアする
            this.operator = null;
            console.log("左の数字", this.left);

            // 次回入力に備えてバッファをクリア
            this.buffer.clear();
        } catch (e: unknown) {

            // エラー状態へ遷移
            this.state = CalcState.Error;

            // エラーメッセージを表示
            this.display.renderError(Config.ERROR_MESSAGE);

        }
    }



    /**
    * 電卓を初期状態へ戻す
    */

    handleClear(): void {
        // 入力中の数値をクリア
        this.buffer.clear();

        // 保存している左辺をリセット
        this.left = null;

        // 保存している演算子をリセット
        this.operator = null;

        // 初期待機状態へ戻す
        this.state = CalcState.Ready;

        // ディスプレイを初期表示に戻す
        this.display.render("0");
    }
}
