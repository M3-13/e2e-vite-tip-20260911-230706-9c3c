import { useState } from "react";
import { calculateTip } from "./lib/calculator";
import "./App.css";

function App() {
  const [amount, setAmount] = useState("");
  const [tipPercent, setTipPercent] = useState("");
  const [people, setPeople] = useState("");

  const result = calculateTip(amount, tipPercent, people);

  const tip = result.ok ? result.tip.toFixed(2) : "";
  const total = result.ok ? result.total.toFixed(2) : "";
  const perPerson = result.ok ? result.perPerson.toFixed(2) : "";
  const error = result.ok ? "" : result.error;

  return (
    <div className="page">
      <main className="card">
        <h1 className="title">Trinkgeld-Rechner</h1>

        <div className="input-group">
          <div className="field">
            <label htmlFor="amount">Betrag</label>
            <input
              id="amount"
              type="number"
              inputMode="decimal"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="0.00"
            />
          </div>

          <div className="field">
            <label htmlFor="tipPercent">Trinkgeld-Prozent</label>
            <input
              id="tipPercent"
              type="number"
              inputMode="decimal"
              value={tipPercent}
              onChange={(event) => setTipPercent(event.target.value)}
              placeholder="10"
            />
          </div>

          <div className="field">
            <label htmlFor="people">Personenzahl</label>
            <input
              id="people"
              type="number"
              inputMode="numeric"
              value={people}
              onChange={(event) => setPeople(event.target.value)}
              placeholder="1"
            />
          </div>
        </div>

        <div className="results">
          <div className="result-row">
            <span className="result-label">Trinkgeld</span>
            <span className="result-value">{tip}</span>
          </div>
          <div className="result-row">
            <span className="result-label">Gesamtbetrag</span>
            <span className="result-value">{total}</span>
          </div>
          <div className="result-row result-row--highlight">
            <span className="result-label">Betrag pro Person</span>
            <span className="result-value">{perPerson}</span>
          </div>
        </div>

        {error !== "" ? (
          <div className="error" role="alert">
            {error}
          </div>
        ) : null}
      </main>
    </div>
  );
}

export default App;
