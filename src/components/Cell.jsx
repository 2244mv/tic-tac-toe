import React from "react";

const Cell = ({ value, onClick, isWinning }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full aspect-square flex items-center justify-center 
      text-xl sm:text-2xl md:text-3xl font-bold rounded-lg 
      transition duration-200

      ${isWinning 
        ? "bg-green-500 text-white animate-pulse" 
        : "bg-gray-700 hover:bg-gray-600"}
      `}
    >
      {value}
    </button>
  );
};

export default Cell;