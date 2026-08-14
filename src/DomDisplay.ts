import type { IDisplay } from "./IDisplay";

/**
 * DOM要素への表示を担当するクラス
 */
export class DomDisplay implements IDisplay {
    private displayElement: HTMLElement;
    private historyElement: HTMLElement;

    constructor(
        displayElement: HTMLElement,
        historyElement: HTMLElement
    ) {
        this.displayElement = displayElement;
        this.historyElement = historyElement;
    }

    /**
     * 指定された文字列を表示する
     * @param text 表示する文字列
     */
    render(text: string): void {
        this.displayElement.textContent = text;
    }

    /**
     * 入力済みの計算式を履歴エリアに表示する
     * @param text 表示する計算式
     */
    renderHistory(text: string): void {
        this.historyElement.textContent = text;
    }

    /**
     * エラーメッセージを表示する
     * @param message 表示するエラーメッセージ
     */
    renderError(message: string): void {
        this.displayElement.textContent = message;
    }
}