import { describe, it, expect } from 'vitest';
import { calculateExpression,checkDivisionByZero } from "../src/math";


/* テスト内容　「計算ロジックのテスト」
 * 1.足し算、引き算、掛け算、割り算が正しく計算されるか
 * 2.0除算が行われた際にtrueが返るか
 * 3.0除算ではない場合にfalseが返るか
 * 4.無効な演算子を渡した場合に NaN が返るか
*/

// 1.足し算、引き算、掛け算、割り算が正しく計算されるか
describe("calculateExpression",() => {
    it(" 5 + 5 = 10 ",() =>{
        expect(calculateExpression(5,5,"+")).toBe(10);
    });

    it(" 10 - 5 = 5",() =>{
        expect(calculateExpression(10,5,"-")).toBe(5);
    })

    it(" 20 * 5 = 100",() =>{
        expect(calculateExpression(20,5,"*")).toBe(100);
    })

    it(" 100 / 10 = 10",() =>{
        expect(calculateExpression(100,10,"/")).toBe(10);
    })

    // 2.0除算が行われた際にtrueが返るか
    it("returns true for division by zero", () => {
        expect(checkDivisionByZero("/", 0)).toBe(true);
    });
    // 3.0除算ではない場合にfalseが返るか
    it("returns false for non-zero division or other operators", () => {
        expect(checkDivisionByZero("/", 5)).toBe(false);
        expect(checkDivisionByZero("+", 0)).toBe(false);
    });

    // 4.無効な演算子を渡した場合に NaN が返るか
    it("unsupported operator return NaN", () => {
        expect(calculateExpression(2, 2, "%" as any)).toBeNaN();
      });
});