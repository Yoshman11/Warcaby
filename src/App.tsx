import React, { useState, useCallback } from 'react';
import { GameState, Position } from './types';
import { createInitialGameState, getValidMoves } from './utils/gameLogic';
import Board from './components/Board';
import { RotateCcw } from 'lucide-react';

export default function App() {
  const [gameState, setGameState] = useState<GameState>(createInitialGameState());

  const handleRestart = () => {
    setGameState(createInitialGameState());
  };

  const getPieceCounts = () => {
    let player1Count = 0;
    let player2Count = 0;
    
    gameState.board.forEach(row => {
      row.forEach(piece => {
        if (piece?.player === 1) player1Count++;
        if (piece?.player === 2) player2Count++;
      });
    });
    
    return { player1Count, player2Count };
  };

  const checkGameOver = (board: GameState['board']) => {
    let player1Count = 0;
    let player2Count = 0;
    
    board.forEach(row => {
      row.forEach(piece => {
        if (piece?.player === 1) player1Count++;
        if (piece?.player === 2) player2Count++;
      });
    });

    if (player1Count === 0) {
      return { gameOver: true, winner: 2 };
    } else if (player2Count === 0) {
      return { gameOver: true, winner: 1 };
    }

    return { gameOver: false, winner: null };
  };

  const handleSquareClick = useCallback((position: Position) => {
    setGameState(prevState => {
      if (prevState.gameOver) {
        return prevState;
      }

      const piece = prevState.board[position.row][position.col];

      if (!piece && !prevState.selectedPiece) {
        return prevState;
      }

      if (!piece && prevState.selectedPiece) {
        const isValidMove = prevState.validMoves.some(
          move => move.row === position.row && move.col === position.col
        );

        if (isValidMove) {
          const newBoard = [...prevState.board.map(row => [...row])];
          const { row: fromRow, col: fromCol } = prevState.selectedPiece.position;
          
          newBoard[position.row][position.col] = {
            ...prevState.selectedPiece,
            position,
            isKing: prevState.selectedPiece.isKing || 
                    position.row === 0 || 
                    position.row === 7
          };
          newBoard[fromRow][fromCol] = null;

          if (Math.abs(position.row - fromRow) > 1) {
            const rowStep = Math.sign(position.row - fromRow);
            const colStep = Math.sign(position.col - fromCol);
            let currentRow = fromRow + rowStep;
            let currentCol = fromCol + colStep;
            
            while (currentRow !== position.row && currentCol !== position.col) {
              if (newBoard[currentRow][currentCol]) {
                newBoard[currentRow][currentCol] = null;
                break;
              }
              currentRow += rowStep;
              currentCol += colStep;
            }
          }

          const { gameOver, winner } = checkGameOver(newBoard);

          return {
            ...prevState,
            board: newBoard,
            currentPlayer: prevState.currentPlayer === 1 ? 2 : 1,
            selectedPiece: null,
            validMoves: [],
            gameOver,
            winner
          };
        } else {
          return {
            ...prevState,
            selectedPiece: null,
            validMoves: []
          };
        }
      }

      if (piece?.player === prevState.currentPlayer) {
        return {
          ...prevState,
          selectedPiece: piece,
          validMoves: getValidMoves(piece, prevState.board)
        };
      }

      return prevState;
    });
  }, []);

  const { player1Count, player2Count } = getPieceCounts();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Checkers Game</h1>
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <div className="flex justify-between mb-4">
          <div className="text-red-600 font-semibold" data-testid="player1-count">
            Red Pieces: {player1Count}
          </div>
          <div className="text-gray-700 font-semibold" data-testid="player2-count">
            White Pieces: {player2Count}
          </div>
        </div>
        <Board gameState={gameState} onSquareClick={handleSquareClick} />
        <div className="mt-4 flex justify-between items-center">
          {gameState.gameOver ? (
            <div className="flex items-center gap-4">
              <div className="text-xl font-bold text-green-600" data-testid="winner">
                Player {gameState.winner} Wins!
              </div>
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                data-testid="restart-button"
              >
                <RotateCcw className="w-4 h-4" />
                Play Again
              </button>
            </div>
          ) : (
            <div className="text-xl" data-testid="game-state">
              Current Player: {gameState.currentPlayer}
            </div>
          )}
          {gameState.selectedPiece && (
            <div className="text-sm text-gray-600" data-testid="valid-moves-count">
              Valid Moves: {gameState.validMoves.length}
            </div>
          )}
        </div>
      </div>
      {gameState.selectedPiece && !gameState.gameOver && (
        <div className="mt-2 text-sm text-gray-600" data-testid="selected-piece">
          Selected Piece at: {gameState.selectedPiece.position.row}, {gameState.selectedPiece.position.col}
        </div>
      )}
    </div>
  );
}