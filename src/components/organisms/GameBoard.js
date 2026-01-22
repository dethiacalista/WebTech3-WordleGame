import WordRow from "../molecules/WordRow";

export default function GameBoard({ board, wordLength, getStatus }) {
  return (
    <div className="board">
      {board.map((row, rIdx) => (
        <WordRow
          key={rIdx}
          row={row}
          rowIdx={rIdx}
          wordLength={wordLength}
          getStatus={getStatus}
        />
      ))}
    </div>
  );
}
