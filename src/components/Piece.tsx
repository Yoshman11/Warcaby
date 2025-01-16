import React from 'react';
import { PieceType } from '../types';
import { Crown } from 'lucide-react';

interface PieceProps {
  piece: PieceType;
}

export default function Piece({ piece }: PieceProps) {
  const pieceClasses = `
    w-3/5 h-3/5 rounded-full 
    ${piece.player === 1 ? 'bg-red-600' : 'bg-white'}
    ${piece.player === 1 ? 'border-red-800' : 'border-gray-300'}
    border-4 shadow-lg
    flex items-center justify-center
  `;

  return (
    <div 
      className={pieceClasses}
      data-testid={`piece${piece.isKing ? ' king-piece' : ''}`}
    >
      {piece.isKing && (
        <Crown 
          data-testid="crown-icon"
          className={`w-3/5 h-3/5 ${piece.player === 1 ? 'text-red-300' : 'text-gray-400'}`}
        />
      )}
    </div>
  );
}