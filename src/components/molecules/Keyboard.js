import KeyboardLayout from "../KeyboardLayout";

// modifikasi komponen = warna tile, key colors & disabled keyboard

export default function Keyboard({ keyColors, onKeyPress, disabled }) {
  return (
    <div className="keyboard">
      {KeyboardLayout.map((row, i) => (
        <div key={i} className="key-row">
          {row.map((k) => (
            <button
              key={k}
              className={`key ${keyColors[k] || ""}`}
              onClick={() => onKeyPress(k)}
              disabled={disabled}
            >
              {k}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
