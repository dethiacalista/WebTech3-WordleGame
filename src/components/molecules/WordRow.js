import WordBox from "../WordBox";

export default function WordRow({ row, rowIdx, wordLength, getStatus }) {
  return (
    <div className="row">
      {Array.from({ length: wordLength }).map((_, i) => (
        <WordBox
          key={i}
          letter={row[i] || ""}
          status={getStatus(row[i], i, rowIdx)}
        />
      ))}
    </div>
  );
}
