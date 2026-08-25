/**
 * 電卓の表示処理に必要な機能を定義するインターフェース
 */
export interface  IDisplay{
    /**
     * 表示エリアに指定された文字列を表示する
     * @param text 表示エリアに表示する文字列
     */
    render(text: string): void;

    /**
     * 履歴エリアに指定された文字列を表示する
     * @param text 履歴エリアに表示する文字列
     */
    renderHistory(text: string): void;
    
    /**
     * 表示エリアにエラーメッセージを表示する
     * @param message 表示エリアに表示するエラーメッセージ
     */
    renderError(message: string): void;
}