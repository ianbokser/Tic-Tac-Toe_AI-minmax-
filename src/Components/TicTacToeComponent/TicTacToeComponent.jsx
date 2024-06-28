import React, { useState } from 'react';
import '../TicTacToeComponent/T';

const TicTacToeComponent = () => {
    const [board, setBoard] = useState(Array(9).fill(''));
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] === '' && !winner) {
      const newBoard = board.slice();
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      checkWinner(newBoard);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const checkWinner = (newBoard) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        setWinner(newBoard[a]);
        return;
      }
    }

    if (newBoard.every(cell => cell !== '')) {
      setWinner('Draw');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setCurrentPlayer('X');
    setWinner(null);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Tic Tac Toe</h1>
        <div className="grid grid-cols-3 gap-2">
          {board.map((cell, index) => (
            <div
              key={index}
              className="cell w-24 h-24 flex items-center justify-center bg-gray-100 text-2xl cursor-pointer"
              onClick={() => handleClick(index)}
            >
              {cell}
            </div>
          ))}
        </div>
        {winner && (
          <div className="mt-4 text-center">
            {winner === 'Draw' ? 'Es un empate!' : `${winner} gana!`}
          </div>
        )}
        <button
          onClick={resetGame}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
};

export default TicTacToeComponent;
