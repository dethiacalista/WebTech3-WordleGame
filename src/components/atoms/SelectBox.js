export default function SelectBox({ value, onChange }) {
  return (
    <label>
      Select Word Length:
      <select value={value} onChange={onChange}>
        <option value={4}>4 Letters</option>
        <option value={5}>5 Letters</option>
        <option value={6}>6 Letters</option>
      </select>
    </label>
  );
}
