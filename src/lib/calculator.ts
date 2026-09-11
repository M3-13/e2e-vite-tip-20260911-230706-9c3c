export type TipResult =
  | { ok: true; tip: number; total: number; perPerson: number }
  | { ok: false; error: string };

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

function parseNumber(raw: string): number | null {
  const trimmed = raw.trim();
  if (trimmed === "") {
    return null;
  }
  const value = Number(trimmed);
  if (!Number.isFinite(value)) {
    return null;
  }
  return value;
}

export function calculateTip(
  amountRaw: string,
  tipPercentRaw: string,
  peopleRaw: string,
): TipResult {
  const amount = parseNumber(amountRaw);
  if (amount === null) {
    return { ok: false, error: "Bitte einen gültigen Betrag eingeben." };
  }
  if (amount < 0) {
    return { ok: false, error: "Der Betrag darf nicht negativ sein." };
  }

  const tipPercent = parseNumber(tipPercentRaw);
  if (tipPercent === null) {
    return { ok: false, error: "Bitte ein gültiges Trinkgeld-Prozent eingeben." };
  }
  if (tipPercent < 0) {
    return { ok: false, error: "Das Trinkgeld-Prozent darf nicht negativ sein." };
  }

  const people = parseNumber(peopleRaw);
  if (people === null) {
    return { ok: false, error: "Bitte eine gültige Personenzahl eingeben." };
  }
  if (!Number.isInteger(people)) {
    return { ok: false, error: "Die Personenzahl muss eine ganze Zahl sein." };
  }
  if (people < 1) {
    return { ok: false, error: "Die Personenzahl muss mindestens 1 sein." };
  }

  const tip = round2((amount * tipPercent) / 100);
  const total = round2(amount + tip);
  const perPerson = round2(total / people);

  return { ok: true, tip, total, perPerson };
}
