export type TipResult =
  | { ok: true; tip: number; total: number; perPerson: number }
  | { ok: false; error: string };

export function calculateTip(
  amountRaw: string,
  tipPercentRaw: string,
  peopleRaw: string,
): TipResult {
  void amountRaw;
  void tipPercentRaw;
  void peopleRaw;
  return { ok: false, error: "" };
}
