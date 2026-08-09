/**
 * 電卓の表示機能を抽象化するインターフェース
 */
export interface  IDisplay{
    /**
     * 指定された文字列を表示する
     * @param text 表示する文字列
     */
    render(text: string): void;
    
    /**
     * エラーメッセージを表示する
     * @param message 表示するエラーメッセージ
     */
    renderError(message: string): void;
}