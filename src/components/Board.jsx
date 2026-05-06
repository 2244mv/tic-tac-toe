import React from "react";
import Cell from "./Cell";

const Board = ({ squares, onClick, winningLine }) => {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3 p-3 sm:p-4 
    bg-gray-800 rounded-xl shadow-lg w-full">
      {squares.map((value, i) => (
        <Cell
          key={i}
          value={value}
          onClick={() => onClick(i)}
          isWinning={winningLine.includes(i)}
        />
      ))}
    </div>
  );
};

export default Board;