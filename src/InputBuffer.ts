/**
 * 数値入力中の文字列を管理するクラス
 *
 * 数字入力、小数点入力、桁数制限の判定を担当する。
 */
export class InputBuffer {
    private value: string;
    private maxDigits: number;

    /**
   * @param value 初期値
   * @param maxDigits 入力可能な最大桁数
   */
    constructor(value: string, maxDigits: number) {
        this.value = value;
        this.maxDigits = maxDigits;
    }

    /**
    * 数字を末尾に追加する
    * @param d 入力された数字
    */
    pushDigit(d: number): void {
        // 最大桁数に達している場合は入力を無視する
        if (this.digitCount() >= this.maxDigits) {
            return;
        }

        // "0" の状態では数字を置き換える
        if (this.value === "0") {
            this.value = d.toString();
            return;
        }

        // それ以外は末尾に数字を追加する
        this.value += d.toString();

    }

    /**
    * 小数点を追加する
    */
    pushDecimal(): void {
        // 小数点がすでにある場合は処理終了
        if (this.value.includes(".")) {
            return;
        }
        // 空の状態で小数点が押された場合は "0." にする
        if (this.isEmpty()) {
            this.value = "0.";
            return;
        }

        // 末尾に小数点を追加する
        this.value += ".";

    }

    /**
    * 入力内容をクリアする
    */
    clear(): void {
        this.value = "";

    }

    /**
    * 現在の入力値を数値として取得する
    * @returns 入力中の数値
    */
    toNumber(): number {
         // 空文字列は 0 として扱う
        if (this.isEmpty()) {
            return 0;
        }

        // 入力文字列を数値へ変換する
        return Number(this.value);

    }

    /**
    * バッファが空か判定する
    * @returns 空の場合はtrue
    */
    isEmpty(): boolean {
        return this.value === "";
    }

    /**
    * 入力されている数字の桁数を取得する
    * @returns 桁数
    */
    digitCount(): number {
        // 小数点と負号は桁数に含めない
        const digits = this.value
            .replace(".", "")
            .replace("-", "");

        return digits.length;

    }

    /**
     * 現在の入力値を取得する
     * @returns 入力値。空の場合は "0"
     */
    getValue(): string {
        if (this.isEmpty()) {
            return "0";
        }
        
        return this.value;

    }

    /**
    * 負数入力のために負号を追加する
    */
    pushNegative(): void {
        if (this.value === "") {
            this.value = "-";
        }

    }

}