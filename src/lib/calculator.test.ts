import { describe, expect, it } from "vitest";
import { calculateTip } from "./calculator";

describe("calculateTip", () => {
  it("computes tip, total and per-person amount for valid input", () => {
    const result = calculateTip("50", "10", "2");
    expect(result).toEqual({ ok: true, tip: 5, total: 55, perPerson: 27.5 });
  });

  it("rounds results to two decimal places (commercial rounding)", () => {
    const result = calculateTip("100", "15", "7");
    expect(result).toEqual({ ok: true, tip: 15, total: 115, perPerson: 16.43 });
  });

  it("accepts a zero tip percentage", () => {
    const result = calculateTip("100", "0", "1");
    expect(result).toEqual({ ok: true, tip: 0, total: 100, perPerson: 100 });
  });

  it("accepts a zero amount", () => {
    const result = calculateTip("0", "10", "2");
    expect(result).toEqual({ ok: true, tip: 0, total: 0, perPerson: 0 });
  });

  it("accepts decimal amount and percentage", () => {
    const result = calculateTip("10.50", "12.5", "3");
    expect(result).toEqual({ ok: true, tip: 1.31, total: 11.81, perPerson: 3.94 });
  });

  describe("invalid input returns an error and never throws", () => {
    const invalidCases: Array<[string, string, string]> = [
      // empty fields
      ["", "10", "2"],
      ["50", "", "2"],
      ["50", "10", ""],
      // non-numeric values
      ["abc", "10", "2"],
      ["50", "abc", "2"],
      ["50", "10", "abc"],
      // negative amount
      ["-5", "10", "2"],
      // negative tip percentage
      ["50", "-10", "2"],
      // zero people
      ["50", "10", "0"],
      // non-integer people
      ["50", "10", "2.5"],
      // negative people
      ["50", "10", "-2"],
    ];

    it.each(invalidCases)(
      "rejects amount=%s tipPercent=%s people=%s",
      (amount, tipPercent, people) => {
        const result = calculateTip(amount, tipPercent, people);
        expect(result.ok).toBe(false);
        if (!result.ok) {
          // Exact wording is owned by the calculator ticket; the contract
          // guarantees a non-empty error string, never an exception.
          expect(typeof result.error).toBe("string");
          expect(result.error.length).toBeGreaterThan(0);
        }
      },
    );
  });
});
