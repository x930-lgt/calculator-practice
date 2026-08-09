/**
 * 0除算が発生したことを表す例外クラス
 */
export class DivisionByZeroError extends Error{
    

    // Errorクラスのコンストラクタを呼び出して
        // エラーメッセージを設定する
    constructor(message: string = "0除算エラー") {
        super(message);

        // エラー名を独自の名前に設定する
        // (ErrorではなくDivisionByZeroErrorとして識別できる)
        this.name = "DivisionByZeroError";
    }
}