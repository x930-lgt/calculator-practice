/**
 * 電卓の状態を表す列挙型
 */
export enum CalcState {
    //初期状態・クリア直後。まだ計算を開始していない状態。
    Ready,

    //最初の数値（左辺）を入力している状態。
    inputtingFirst,

    //演算子を押し終え、2つ目の数値（右辺）の入力待ち状態。
    OperatorEntered,

    //2つ目の数値（右辺）を入力している状態。
    InputtingSecond,

    //=を押して計算結果を表示している状態。
    ResultShown,

    //エラーが発生し、エラーメッセージを表示している状態。
    Error
}
/**
 * 四則演算の種類を表す列挙型
 */
export enum Operation{
    Add,
    Subtract,
    Multiply,
    Divide,
}