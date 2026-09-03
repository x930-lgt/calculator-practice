import { describe, expect, it } from "vitest";
import { OperationToSymbol } from "../src/OperationToSymbol";
import { Operation } from "../src/Enums";

describe("OperationToSymbolのテスト", () => {
    it("加算を表示用の記号に変換する", () => {
        expect(OperationToSymbol(Operation.Add)).toBe("+");
    });
    
    it("減算を表示用の記号に変換する", () => {
        expect(OperationToSymbol(Operation.Subtract)).toBe("-");
    });
    
    it("乗算を表示用の記号に変換する", () => {
        expect(OperationToSymbol(Operation.Multiply)).toBe("×");
    });
    
    it("除算を表示用の記号に変換する", () => {
        expect(OperationToSymbol(Operation.Divide)).toBe("÷");
    });
});