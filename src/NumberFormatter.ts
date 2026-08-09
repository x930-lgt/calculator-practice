/**
 * 数値を表示用の文字列へ変換するクラス
 *
 * 桁数制限を超える場合は指数表記へ変換する。
 */
export class NumberFormatter{
    private maxDigits:number;

    constructor(maxDigits:number){
        this.maxDigits = maxDigits;
    }
    
    /**
     * 数値を表示用文字列へ変換する
     *
     * @param n 表示対象の数値
     * @returns 表示用文字列
     */
    formatForDisplay(n: number): string{
        //桁数に収まるならそのまま表示
        if(this.fits(n)){
            return n.toString();
        }
        //桁数に収まらない場合は指数表記
        return n.toExponential(this.maxDigits - 1);

    }
    
    /**
     * 数値が表示可能桁数に収まるか判定する
     *
     * @param n 判定対象の数値
     * @returns 桁数に収まる場合は true
     */
    fits(n: number): boolean{
        const digits = n
        .toString()
        .replace(".", "")
        .replace("-", "");

        return digits.length <= this.maxDigits;
    }
}