
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "./atoms/Title";
import SelectBox from "./atoms/SelectBox";
import PrimaryButton from "./atoms/PrimaryButton";

//

export default function HomePage() {
  const [wordLength, setWordLength] = useState(5);
  const navigate = useNavigate();

  return (
    <div className="container">
      <Title>🧩 Wordle Game</Title>

      <SelectBox
        value={wordLength}
        onChange={(e) => setWordLength(parseInt(e.target.value))}
      />

      <PrimaryButton onClick={() => navigate(`/game/${wordLength}`)}>
        Start Game
      </PrimaryButton>
    </div>
  );
}
