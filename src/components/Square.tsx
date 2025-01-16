import React from 'react';
import { Position } from '../types';

interface SquareProps {
  position: Position;
  isSelected: boolean;
  isValidMove: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}

export default function Square({
  position,
  isSelected,
  isValidMove,
  onClick,
  children
}: SquareProps) {
  const isDark = (position.row + position.col) % 2 === 1;
  
  const baseClasses = "w-full h-full flex items-center justify-center";
  const colorClasses = isDark ? "bg-gray-800" : "bg-gray-200";
  const stateClasses = isSelected ? "ring-4 ring-blue-400" : 
                      isValidMove ? "ring-4 ring-green-400" : "";

  return (
    <div
      className={`${baseClasses} ${colorClasses} ${stateClasses}`}
      onClick={onClick}
      data-testid={`square-${position.row}-${position.col}${isValidMove ? ' valid-move' : ''}`}
    >
      {children}
    </div>
  );
}