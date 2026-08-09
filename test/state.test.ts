import { describe, it, expect } from "vitest";
import { createInitialState, inputDigit, inputOperator, calculateResult } from "../src/state";


/* テスト内容　「状態管理のテスト」
 * 1.currentValue が入力どおりに更新されるか
 * 2.演算子入力で leftValue・operator・waitingForNext が正しく設定されるか
 * 3. = 入力で計算結果・状態・履歴が正しく更新されるか
 * 4. = のあとに数字を押したら、前の結果に連結されず、上書きされるか
 * */


describe("calculator state", () => {

  // 1.currentValue が入力どおりに更新されるか
  it("入力した数字が currentValue に反映される", () => {
    const state = createInitialState();
    inputDigit(state, "1");
    inputDigit(state, "0");
    expect(state.currentValue).toBe("10");
  });

  // 2.演算子入力で leftValue・operator・waitingForNext が正しく設定されるか
  it("演算子入力で leftValue がセットされる", () => {
    const state = createInitialState();
    inputDigit(state, "7");
    inputOperator(state, "+");
    expect(state.leftValue).toBe(7);
    expect(state.operator).toBe("+");
    expect(state.waitingForNext).toBe(true);
  });

  // 3. = 入力で計算結果・状態・履歴が正しく更新されるか
  it("= で計算して履歴に追加される", () => {
    const state = createInitialState();
    inputDigit(state, "2");
    inputOperator(state, "*");
    inputDigit(state, "3");
    calculateResult(state);
    expect(state.currentValue).toBe("6");
    expect(state.leftValue).toBe(6);
    expect(state.operator).toBeNull();
    expect(state.waitingForNext).toBe(true);
    expect(state.history.length).toBe(1);
    expect(state.history[0]).toBe("2 * 3 = 6");
  });
});

// 4.= のあとに数字を押したら、前の結果に連結されず、上書きされるか
it("計算後に次の数字入力で currentValue が上書きされる", () => {
    const state = createInitialState();
    inputDigit(state, "2");
    inputOperator(state, "+");
    inputDigit(state, "3");
    calculateResult(state);
  
    inputDigit(state, "9");
    expect(state.currentValue).toBe("9");
  });