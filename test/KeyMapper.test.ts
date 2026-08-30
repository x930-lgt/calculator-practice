import { describe, it, expect } from "vitest";
import { KeyMapper } from "../src/KeyMapper";
import { Operation } from "../src/Enums";

describe("KeyMapperのテスト", () => {

    

    // resolveのテスト
    it("数字キーをKeyTokenに変換できる", () => {
        
        const mapper = new KeyMapper();
    
        const button = document.createElement("button");
        button.dataset.key = "5";
    
        expect(mapper.resolve(button)).toEqual({
            kind: "digit",
            value: 5
        });
    });

    it("小数点をKeyTokenに変換できる", () => {
        
        const mapper = new KeyMapper();
    
        const button = document.createElement("button");
        button.dataset.key = ".";
    
        expect(mapper.resolve(button)).toEqual({
            kind: "decimal"
        });
    });

    it("演算子(+)をKeyTokenに変換できる", () => {
        
        const mapper = new KeyMapper();
    
        const button = document.createElement("button");
        button.dataset.key = "+";
    
        expect(mapper.resolve(button)).toEqual({
            kind: "op",
            value: Operation.Add
        });
    });

    it("演算子(-)をKeyTokenに変換できる", () => {
        
        const mapper = new KeyMapper();
    
        const button = document.createElement("button");
        button.dataset.key = "-";
    
        expect(mapper.resolve(button)).toEqual({
            kind: "op",
            value: Operation.Subtract
        });
    });

    it("演算子(*)をKeyTokenに変換できる", () => {
        
        const mapper = new KeyMapper();
    
        const button = document.createElement("button");
        button.dataset.key = "*";
    
        expect(mapper.resolve(button)).toEqual({
            kind: "op",
            value: Operation.Multiply
        });
    });

    it("演算子(/)をKeyTokenに変換できる", () => {
        
        const mapper = new KeyMapper();
    
        const button = document.createElement("button");
        button.dataset.key = "/";
    
        expect(mapper.resolve(button)).toEqual({
            kind: "op",
            value: Operation.Divide
        });
    });

    it("イコールキーをKeyTokenに変換できる", () => {
        
        const mapper = new KeyMapper();
    
        const button = document.createElement("button");
        button.dataset.key = "=";
    
        expect(mapper.resolve(button)).toEqual({
            kind: "equal"
        });
    });

    it("クリアキーをKeyTokenに変換できる", () => {
        
        const mapper = new KeyMapper();
    
        const button = document.createElement("button");
        button.dataset.key = "c";
    
        expect(mapper.resolve(button)).toEqual({
            kind: "clear"
        });
    });

    it("HTMLElement以外の場合はnullを返す", () => {
        
        const mapper = new KeyMapper();
        const target = new EventTarget();

        expect(mapper.resolve(target)).toBe(null);
    });

    it("未登録のdata-keyの場合はnullを返す", () => {
        
        const mapper = new KeyMapper();
    
        const button = document.createElement("button");
        button.dataset.key = "k";
    
        expect(mapper.resolve(button)).toBe(null);
    });

    it("data-keyが存在しない場合はnullを返す", () => {
        const mapper = new KeyMapper();
    
        const button = document.createElement("button");
    
        expect(mapper.resolve(button)).toBe(null);
    });

});