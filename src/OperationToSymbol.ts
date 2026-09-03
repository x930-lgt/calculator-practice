import { Operation } from "./Enums";

/**
 * 演算子を表示用の記号へ変換する
 *
 * @param operation 演算子
 * @returns 表示用の演算子記号
 */
export function OperationToSymbol(operation:Operation):string{
    switch(operation){
        case Operation.Add:
            return "+";
        
        case Operation.Subtract:
            return "-";

        case Operation.Multiply:
            return "×";

        case Operation.Divide:
            return "÷";

        default:
            throw new Error("不正な演算子");
    }

}