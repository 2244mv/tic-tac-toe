import React, { useState, useEffect } from "react";
import Board from "./components/Board";

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0 });

  const result = calculateWinner(squares);
  const winner = result?.player;
  const winningLine = result?.line || [];

  const handleClick = (index) => {
    if (squares[index] || winner) return;

    const newSquares = [...squares];
    newSquares[index] = isXTurn ? "X" : "O";

    setSquares(newSquares);
    setIsXTurn(!isXTurn);
  };

  // update score when winner changes
  useEffect(() => {
    if (winner) {
      setScore((prev) => ({
        ...prev,
        [winner]: prev[winner] + 1,
      }));
    }
  }, [winner]);

  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setIsXTurn(true);
  };

  const resetScore = () => {
    setScore({ X: 0, O: 0 });
    restartGame();
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gray-900 text-gray-100 px-3 sm:px-4">

      <div className="w-full max-w-md">

        <h1 className="text-2xl sm:text-3xl font-semibold mb-4 text-center">
          Tic Tac Toe
        </h1>

        {/* 🏆 Scoreboard */}
        <div className="flex items-center justify-between w-full mb-5">

          <div className={`flex-1 mx-1 p-2 sm:p-3 rounded-xl text-center 
          ${isXTurn ? "bg-blue-600 text-white shadow-md" : "bg-gray-800 text-gray-300"}`}>
            <p className="text-xs sm:text-sm">Player X</p>
            <p className="text-lg sm:text-xl font-bold">{score.X}</p>
          </div>

          <div className="px-2 text-gray-500 text-sm">vs</div>

          <div className={`flex-1 mx-1 p-2 sm:p-3 rounded-xl text-center 
          ${!isXTurn ? "bg-purple-600 text-white shadow-md" : "bg-gray-800 text-gray-300"}`}>
            <p className="text-xs sm:text-sm">Player O</p>
            <p className="text-lg sm:text-xl font-bold">{score.O}</p>
          </div>

        </div>

        <Board 
          squares={squares} 
          onClick={handleClick} 
          winningLine={winningLine}
        />

        <p className="mt-4 text-center text-sm sm:text-base text-gray-300">
          {winner
            ? `Winner: ${winner}`
            : `Turn: ${isXTurn ? "X" : "O"}`}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 mt-5">
          <button
            onClick={restartGame}
            className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-500"
          >
            Restart
          </button>

          <button
            onClick={resetScore}
            className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-500"
          >
            Reset
          </button>
        </div>

      </div>
    </div>
  );
};

// 🧠 Winner Logic (returns player + winning cells)
const calculateWinner = (squares) => {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let [a, b, c] of lines) {
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return { player: squares[a], line: [a, b, c] };
    }
  }

  return null;
};

export default App;