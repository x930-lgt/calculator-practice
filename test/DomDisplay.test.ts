import { describe, it, expect } from "vitest";
import { DomDisplay } from "../src/DomDisplay";

describe("DomDisplayのテスト", () => {

    // ====================
    // renderのテスト
    // ====================
    it("表示エリアに文字列を表示する", () => {
        const displayElement = document.createElement("div");
        const historyElement = document.createElement("div");

        const display = new DomDisplay(
            displayElement,
            historyElement
        );

        display.render("123");

        expect(displayElement.textContent).toBe("123");
    });

    // ====================
    // renderHistoryのテスト
    // ====================
    it("履歴エリアに文字列を表示する", () => {
        const displayElement = document.createElement("div");
        const historyElement = document.createElement("div");

        const display = new DomDisplay(
            displayElement,
            historyElement
        );

        display.renderHistory("1 + 2 =");

        expect(historyElement.textContent).toBe("1 + 2 =");
    });

    // ====================
    // renderErrorのテスト
    // ====================
    it("表示エリアにエラーメッセージを表示する", () => {
        const displayElement = document.createElement("div");
        const historyElement = document.createElement("div");

        const display = new DomDisplay(
            displayElement,
            historyElement
        );

        display.renderError("Error");

        expect(displayElement.textContent).toBe("Error");
    });
    
});