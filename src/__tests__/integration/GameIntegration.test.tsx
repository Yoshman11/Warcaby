import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import App from '../../App';

describe('Game Integration Tests', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('should initialize game with correct starting state', () => {
    const gameState = screen.getByTestId('game-state');
    const pieces = screen.getAllByTestId(/^piece/);
    
    expect(gameState).toHaveTextContent('Current Player: 1');
    expect(pieces).toHaveLength(24);
    
    const player1Pieces = pieces.filter(piece => piece.className.includes('bg-red-600'));
    const player2Pieces = pieces.filter(piece => piece.className.includes('bg-white'));
    expect(player1Pieces).toHaveLength(12);
    expect(player2Pieces).toHaveLength(12);
  });

  it('should handle basic piece movement correctly', () => {
    const squares = screen.getAllByTestId(/^square/);
    const initialBoard = screen.getAllByTestId(/^piece/);
    

    fireEvent.click(squares[2 * 8 + 1]);
    const validMoves = screen.getAllByTestId(/square.*valid-move/);
    expect(validMoves).toHaveLength(2);
    
    fireEvent.click(squares[3 * 8 + 2]);
    expect(screen.getByTestId('game-state')).toHaveTextContent('Current Player: 2');
    

    const newBoard = screen.getAllByTestId(/^piece/);
    expect(newBoard).toHaveLength(initialBoard.length);
  });

  it('should handle piece selection and deselection', () => {
    const squares = screen.getAllByTestId(/^square/);
    

    fireEvent.click(squares[2 * 8 + 1]);
    expect(screen.getByTestId('selected-piece')).toBeInTheDocument();
    expect(screen.getAllByTestId(/square.*valid-move/)).not.toHaveLength(0);
    

    fireEvent.click(squares[0 * 8 + 0]);
    expect(screen.queryByTestId('selected-piece')).not.toBeInTheDocument();
    expect(screen.queryAllByTestId(/square.*valid-move/)).toHaveLength(0);
  });

  it('should prevent moves to invalid squares', () => {
    const squares = screen.getAllByTestId(/^square/);
    const initialPieces = screen.getAllByTestId(/^piece/);
    const initialPositions = initialPieces.map(piece => piece.parentElement?.dataset.testid);
    

    fireEvent.click(squares[2 * 8 + 1]);
    fireEvent.click(squares[2 * 8 + 2]);
    
    const newPieces = screen.getAllByTestId(/^piece/);
    const newPositions = newPieces.map(piece => piece.parentElement?.dataset.testid);
    
    expect(newPositions).toEqual(initialPositions);
    expect(screen.getByTestId('game-state')).toHaveTextContent('Current Player: 1');
  });

  it('should handle piece capture correctly', () => {
    const squares = screen.getAllByTestId(/^square/);
    
    fireEvent.click(squares[2 * 8 + 3]);
    fireEvent.click(squares[3 * 8 + 4]);
    
    fireEvent.click(squares[5 * 8 + 6]);
    fireEvent.click(squares[4 * 8 + 5]);
    
    fireEvent.click(squares[3 * 8 + 4]);
    fireEvent.click(squares[5 * 8 + 6]);
    
    const remainingPieces = screen.getAllByTestId(/^piece/);
    expect(remainingPieces).toHaveLength(23);
  });

  it('should enforce turn-based gameplay', () => {
    const squares = screen.getAllByTestId(/^square/);
    

    fireEvent.click(squares[2 * 8 + 1]);
    fireEvent.click(squares[3 * 8 + 2]);
    expect(screen.getByTestId('game-state')).toHaveTextContent('Current Player: 2');
    
    fireEvent.click(squares[2 * 8 + 3]);
    const validMoves = screen.queryAllByTestId(/square.*valid-move/);
    expect(validMoves).toHaveLength(0);
  });

  it('should highlight valid moves when selecting a piece', () => {
    const squares = screen.getAllByTestId(/^square/);

    fireEvent.click(squares[2 * 8 + 1]);
    
    const validMoves = screen.getAllByTestId(/square.*valid-move/);
    expect(validMoves.length).toBeGreaterThan(0);
    

    validMoves.forEach(move => {
      const testId = move.getAttribute('data-testid') || '';
      const [_, row, col] = testId.split('-');
      expect((parseInt(row) + parseInt(col)) % 2).toBe(1);
    });
  });

  it('should maintain game state consistency', () => {
    const squares = screen.getAllByTestId(/^square/);
    const initialPieces = screen.getAllByTestId(/^piece/);
    

    fireEvent.click(squares[2 * 8 + 1]);
    fireEvent.click(squares[3 * 8 + 2]);
    fireEvent.click(squares[5 * 8 + 2]);
    fireEvent.click(squares[4 * 8 + 3]);
    
    const currentPieces = screen.getAllByTestId(/^piece/);
    expect(currentPieces).toHaveLength(initialPieces.length);
    expect(screen.getByTestId('game-state')).toBeInTheDocument();
  });

  it('should handle consecutive turns properly', () => {
    const squares = screen.getAllByTestId(/^square/);
    

    fireEvent.click(squares[2 * 8 + 1]);
    fireEvent.click(squares[3 * 8 + 2]);
    expect(screen.getByTestId('game-state')).toHaveTextContent('Current Player: 2');
    

    fireEvent.click(squares[5 * 8 + 2]);
    fireEvent.click(squares[4 * 8 + 3]);
    expect(screen.getByTestId('game-state')).toHaveTextContent('Current Player: 1');
  });

  it('should maintain piece ownership after moves', () => {
    const squares = screen.getAllByTestId(/^square/);
    

    fireEvent.click(squares[2 * 8 + 1]);
    fireEvent.click(squares[3 * 8 + 2]);
    

    const movedPiece = squares[3 * 8 + 2].querySelector('[data-testid^="piece"]');
    expect(movedPiece?.className).toContain('bg-red-600');
    
    fireEvent.click(squares[5 * 8 + 2]);
    fireEvent.click(squares[4 * 8 + 3]);
    
    const movedPiece2 = squares[4 * 8 + 3].querySelector('[data-testid^="piece"]');
    expect(movedPiece2?.className).toContain('bg-white');
  });
});