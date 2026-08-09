import type { IDisplay } from "./IDisplay";

/**
 * DOM要素への表示を担当するクラス
 */
export class DomDisplay implements IDisplay{
    private el:HTMLElement;

    constructor(el:HTMLElement){
        this.el = el;
    }
    /**
     * 指定された文字列を表示する
     * @param text 表示する文字列
     */
    render(text: string): void{
        this.el.textContent = text;

    }
    
    /**
     * エラーメッセージを表示する
     * @param message 表示するエラーメッセージ
     */
    renderError(message: string): void{
        this.el.textContent = message;

    }
}