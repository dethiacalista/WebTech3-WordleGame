import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Title from "./atoms/Title";
import LoadingText from "./atoms/LoadingText";
import MessageText from "./atoms/MessageText";
import BackButton from "./molecules/BackButton";
import Keyboard from "./molecules/Keyboard";
import GameBoard from "./organisms/GameBoard";
import Confetti from "react-confetti";

export default function GamePage() {
  const { length } = useParams();
  const navigate = useNavigate();
  const wordLength = parseInt(length);

  const [targetWord, setTargetWord] = useState("");
  const [board, setBoard] = useState(Array(6).fill(""));
  const [currentRow, setCurrentRow] = useState(0);
  const [message, setMessage] = useState("");
  const [keyColors, setKeyColors] = useState({});
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showConfetti, setShowConfetti] = useState(false);
  const confettiPlayedRef = useRef(false);



  const validateWordAPI = async (word) => {
    try {
      const res = await fetch(
        "https://api.dictionaryapi.dev/api/v2/entries/en/" + word
      );
      return res.status === 200;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const fetchWord = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://random-word-api.vercel.app/api?words=1&length=${wordLength}`
        );
        const d = await res.json();
        const word = d[0].toUpperCase();

        const isValid = await validateWordAPI(word);
        setTargetWord(isValid ? word : "APPLE");
      } catch {
        setTargetWord("APPLE");
      } finally {
        setLoading(false);
      }
    };

    fetchWord();
  }, [wordLength]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver || loading) return;

      const key = e.key.toUpperCase();
      if (/^[A-Z]$/.test(key)) handleKeyPress(key);
      else if (key === "BACKSPACE") handleKeyPress("DEL");
      else if (key === "ENTER") handleKeyPress("ENTER");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameOver, loading, currentRow, board, keyColors, targetWord]);

  const getLetterStatus = (letter, idx, rowIdx) => {
    if (!targetWord || rowIdx >= currentRow) return "";
    if (letter === targetWord[idx]) return "correct";
    if (targetWord.includes(letter)) return "present";
    return "absent";
  };

  const handleKeyPress = async (key) => {
    if (gameOver) return;

    const newBoard = [...board];
    let word = newBoard[currentRow];

    if (key === "DEL") {
      word = word.slice(0, -1);
    } else if (key === "ENTER") {
      if (word.length !== wordLength) {
        setMessage(`Word must be ${wordLength} letters`);
        return;
      }

      setLoading(true);
      const isValid = await validateWordAPI(word.toLowerCase());
      setLoading(false);

      if (!isValid) {
        setMessage("❌ Not a valid English word");
        return;
      }

      const newKeyColors = { ...keyColors };

      word.split("").forEach((ltr, i) => {
        let status = "absent";
        if (ltr === targetWord[i]) status = "correct";
        else if (targetWord.includes(ltr)) status = "present";

        const prev = newKeyColors[ltr];
        if (!prev || prev === "absent" || (prev === "present" && status === "correct")) {
          newKeyColors[ltr] = status;
        }
      });

      if (word === targetWord) {
        word.split("").forEach((ltr) => {
          newKeyColors[ltr] = "correct";
        });
        setKeyColors(newKeyColors);
        if (!confettiPlayedRef.current) {
          confettiPlayedRef.current = true;
          setShowConfetti(true);

          setTimeout(() => {
            setShowConfetti(false);
          }, 6000);
        }
        setMessage("🎉 Correct!");
        setGameOver(true);
        return;
      }

      if (currentRow === 5) {
        setKeyColors(newKeyColors);
        setMessage(`The word was: ${targetWord}`);
        setGameOver(true);
        return;
      }

      setBoard(newBoard);
      setCurrentRow(currentRow + 1);
      setKeyColors(newKeyColors);
      setMessage("");
      return;
    } else if (word.length < wordLength) {
      word += key;
    }

    newBoard[currentRow] = word;
    setBoard(newBoard);
  };

  return (
    <div className="game-container">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={300}
          recycle={false}
          gravity={0.3}
        />
      )}
      <Title>Wordle Game</Title>
      <BackButton onBack={() => navigate("/")} />

      {loading && <LoadingText />}

      <GameBoard
        board={board}
        wordLength={wordLength}
        getStatus={getLetterStatus}
      />

      <Keyboard
        keyColors={keyColors}
        onKeyPress={handleKeyPress}
        disabled={loading}
      />

      <MessageText message={message} />
    </div>
  );
}
