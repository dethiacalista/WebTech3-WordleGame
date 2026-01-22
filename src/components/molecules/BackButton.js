export default function BackButton({ onBack }) {
  return (
    <button className="back-btn" onClick={onBack}>
      ← Back
    </button>
  );
}
