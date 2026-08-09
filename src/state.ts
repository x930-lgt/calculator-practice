import { calculateExpression } from "./math";

/**オブジェクトの型指定*/
export interface CalcState{
  leftValue: number | null;
  rightValue: number | null;
  operator: string | null;
  waitingForNext: boolean;
  currentValue: string;
  history: string[];
}

/**
 * 計算機の初期状態を生成する関数
 *
 * この関数は、計算機の状態を表す CalcState 型のオブジェクトを返します。
 * 全ての値は初期化されており、計算開始前の状態として使用できます。
 * @returns {CalcState} 初期状態の計算機オブジェクト
 *
 */
export function createInitialState(): CalcState {
    return {
      leftValue: null,
      rightValue: null,
      operator: null,
      // false：数字を連結して入力中の状態（通常モード）
      // true：次の数字入力で currentValue を置き換える準備ができている状態（置き換えモード）
      waitingForNext: false,
      currentValue: "0",
      history: [],
    };
  }


  /**
 * 数字ボタン入力を状態に反映する関数
 *
 * 現在の入力状態 `CalcState` に対して、押された数字 `digit` を反映します。
 * @param {CalcState} state - 現在の計算機状態
 * @param {string} digit - 入力された数字（"0"〜"9"）
 * @returns {CalcState} 更新後の計算機状態
 */
  export function inputDigit(state: CalcState, digit: string): CalcState {
    if (state.waitingForNext) {
      // currentValue を押された数字で上書き。
      state.currentValue = digit;
      // 数字を連結して入力中の状態（通常モード）
      state.waitingForNext = false;
    } else {
      // 現在の表示が "0" だけのときは、先頭の "0" を消して入力数字に置き換える。それ以外は現在の値に入力数字を末尾に追加。
      state.currentValue = state.currentValue === "0" ? digit : state.currentValue + digit;
    }
    return state;
  }


/**
 * 演算子入力を処理する関数
 *
 * ユーザーが電卓で演算子ボタン（"+", "-", "*", "/"）を押したときに呼ばれます。
 * @param {CalcState} state - 現在の計算機状態
 * @param {string} op - 押された演算子 ("+", "-", "*", "/")
 * @returns {CalcState} 更新後の計算機状態
 */
export function inputOperator(state: CalcState, op: string): CalcState {

    // 左の値がまだなければ、currentValue の値を左の値にセット
    if (state.leftValue === null) {
      state.leftValue = Number(state.currentValue);
      // すでに左の値と演算子がある場合、前回の計算を実行して左の値を更新
    } else if (state.operator) {
      state.leftValue = calculateExpression(state.leftValue, Number(state.currentValue), state.operator as "+"|"-"|"*"|"/");
    }
    // 押された演算子を保存
    state.operator = op;
    // true：次の数字入力で currentValue を置き換える準備ができている状態（置き換えモード）
    state.waitingForNext = true;
    return state;
  }

/**
 * = ボタンが押されたときに、計算を確定して電卓の状態を整理する関数（= ボタンの処理）
 *
 * @param {CalcState} state - 現在の計算機状態
 * @returns {CalcState} 更新後の計算機状態
 */
export function calculateResult(state: CalcState): CalcState {
    if (state.leftValue !== null && state.operator) {
      // 計算前の左辺の値を一時的に保存
      const leftBeforeCalc = state.leftValue;     
      // 右の値を数値に変換
      const rightValue = Number(state.currentValue);
      
      // 計算を実行
      const result = calculateExpression(
        leftBeforeCalc,
        rightValue,
        state.operator as "+"|"-"|"*"|"/"
      );
  
      state.leftValue = result;
  
      // 履歴を「計算前の左の値」で追加
      state.history.push(
        `${leftBeforeCalc} ${state.operator} ${rightValue} = ${result}`
      );
      // 計算結果を画面に表示
      state.currentValue = String(result);
      // 演算子をリセット
      state.operator = null;
      // true：次の数字入力で currentValue を置き換える準備ができている状態（置き換えモード）
      state.waitingForNext = true;
    }
    return state;
  }