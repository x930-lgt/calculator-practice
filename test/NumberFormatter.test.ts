import { describe, it, expect } from 'vitest';
import { NumberFormatter } from '../src/NumberFormatter';

describe("NumberFormatterのテスト", () => {

    // ====================
    // formatForDisplayのテスト
    // ====================
    it("表示可能な桁数の場合はそのまま文字列に変換する", () => {
        const formatter = new NumberFormatter(8);

        expect(formatter.formatForDisplay(123)).toBe("123");
    });

    it("表示可能桁数を超える場合は指数表記に変換する", () => {
        const formatter = new NumberFormatter(8);

        expect(formatter.formatForDisplay(123456789)).toBe("1.2345679e+8");
    });

    // ====================
    // fitsのテスト
    // ====================
    it("表示可能桁数に収まる場合はtrueを返す", () => {
        const formatter = new NumberFormatter(8);

        expect(formatter.fits(123)).toBe(true);
    });

    it("最大桁数ちょうどの場合はtrueを返す", () => {
        const formatter = new NumberFormatter(8);
    
        expect(formatter.fits(12345678)).toBe(true);
    });

    it("表示可能桁数に収まらない場合はfalseを返す", () => {
        const formatter = new NumberFormatter(8);

        expect(formatter.fits(123456789)).toBe(false);
    });

    it("小数点は桁数として数えない", () => {
        const formatter = new NumberFormatter(8);

        expect(formatter.fits(1.2345678)).toBe(true);
    });

    it("負号は桁数として数えない", () => {
        const formatter = new NumberFormatter(8);

        expect(formatter.fits(-12345678)).toBe(true);
    });

});