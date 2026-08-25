import { Operation } from "./Enums";
import type{ KeyToken } from "./KeyToken";
/**
 * DOM要素の data-key を KeyToken に変換するクラス
 */
export class KeyMapper {

    /**
    * data-key と KeyToken の対応表
    */
    private keyMap: Map<string, KeyToken>;

    constructor() {
        this.keyMap = new Map();

        // 数字キー(0～9)を登録する
        for (let i = 0; i <= 9; i++) {
            this.keyMap.set(
                i.toString(),
                {
                    kind: "digit",
                    value: i
                }
             );
        }

        // 小数点キー
        this.keyMap.set(".",{
            kind: "decimal"
        });

        // 加算キー
        this.keyMap.set("+",{
            kind:"op",
            value:Operation.Add
        });

        // 減算キー
        this.keyMap.set("-",{
            kind:"op",
            value:Operation.Subtract
        });

        // 乗算キー
        this.keyMap.set("*",{
            kind:"op",
            value:Operation.Multiply
        });

        // 除算キー
        this.keyMap.set("/",{
            kind:"op",
            value:Operation.Divide
        });

        // イコールキー
        this.keyMap.set("=",{
            kind:"equal"
        });

        // クリアキー
        this.keyMap.set("c",{
            kind:"clear"
        });
    }

    /**
    * イベント発生元の要素から KeyToken を取得する
    *
    * @param target クリックされた要素
    * @returns 対応する KeyToken。取得できない場合は null
    */

    resolve(target: EventTarget): KeyToken | null {

         // HTMLElement以外は処理対象外
        if(!(target instanceof HTMLElement)){
            return null;
        }

        // data-key属性を取得する
        const value = target.dataset.key;

        // data-keyが存在しない場合は変換できない
        if(!value){
            return null;
        }

        // 対応するKeyTokenを返す
        return this.keyMap.get(value)??null;

    }
}