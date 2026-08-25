import { DivisionByZeroError } from "./DivisionByZeroError";
import { Operation } from "./Enums";
/**
 * 四則演算の計算処理を担当するクラス
 */
export class Evaluator{

    /**
     * 指定された演算子に応じて計算を行う
     *
     * @param a 左辺
     * @param op 演算子
     * @param b 右辺
     * @returns 計算結果
     * @throws {DivisionByZeroError} 0除算が発生した場合
     * @throws {Error} 不正な演算子が渡された場合
     */
    compute(a: number, op: Operation, b: number): number{
        switch(op) {
            case Operation.Add:
                return a + b;

            case Operation.Subtract:
                return a - b;
            
            case Operation.Multiply:
                return a * b;
            
            case Operation.Divide:
                // 0除算の場合は専用の例外を投げる
                if (b === 0) {
                     throw new DivisionByZeroError();
                }
                return a / b;
                
            default:
                throw new Error("不正な演算子");
        }
    }
}