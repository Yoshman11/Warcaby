import React from 'react';
import { GameState, Position } from '../types';
import Square from './Square';
import Piece from './Piece';

interface BoardProps {
  gameState: GameState;
  onSquareClick: (position: Position) => void;
}

export default function Board({ gameState, onSquareClick }: BoardProps) {
  const { board, selectedPiece, validMoves } = gameState;

  return (
    <div className="grid grid-cols-8 gap-0 border-4 border-brown-800 w-[600px] h-[600px]">
      {board.map((row, rowIndex) =>
        row.map((piece, colIndex) => {
          const position = { row: rowIndex, col: colIndex };
          const isSelected = selectedPiece?.position.row === rowIndex && 
                           selectedPiece?.position.col === colIndex;
          const isValidMove = validMoves.some(
            move => move.row === rowIndex && move.col === colIndex
          );

          return (
            <Square
              key={`${rowIndex}-${colIndex}`}
              position={position}
              isSelected={isSelected}
              isValidMove={isValidMove}
              onClick={() => onSquareClick(position)}
            >
              {piece && <Piece piece={piece} />}
            </Square>
          );
        })
      )}
    </div>
  );
}