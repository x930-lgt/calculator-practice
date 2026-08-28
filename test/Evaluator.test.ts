import { describe, it, expect } from 'vitest';
import { Evaluator } from '../src/Evaluator';
import { Operation } from '../src/Enums';
import { DivisionByZeroError } from '../src/DivisionByZeroError';

describe("計算のテスト" , () => {

    const evaluator = new Evaluator();

    it ("1 + 3 = 4 になる", () => {
        expect(evaluator.compute(1, Operation.Add, 3)).toBe(4);
    });

    it ("5 - 3 = 2 になる" , () => {
        expect(evaluator.compute(5, Operation.Subtract, 3)).toBe(2);
    });

    it ("2 * 3 = 6 になる", () => {
        expect(evaluator.compute(2, Operation.Multiply, 3)).toBe(6);
    });

    it ("10 / 2 = 5 になる", ()=> {
        expect(evaluator.compute(10, Operation.Divide, 2)).toBe(5);
    });

    it ("10 / 0 = DivisionByZeroError になる",() =>{
        expect(() => {
             evaluator.compute(10, Operation.Divide, 0);
            }).toThrow(DivisionByZeroError);
    });

 });