import { describe, it, expect } from 'vitest';
import { getValidMoves, isValidPosition, createInitialGameState, createInitialBoard, BOARD_SIZE } from '../../utils/gameLogic';
import { PieceType, BoardState } from '../../types';

describe('Game Logic Unit Tests', () => {
  describe('Board Initialization', () => {
    it('should create a board of correct size', () => {
      const board = createInitialBoard();
      expect(board.length).toBe(BOARD_SIZE);
      expect(board[0].length).toBe(BOARD_SIZE);
    });

    it('should place correct number of pieces for each player', () => {
      const board = createInitialBoard();
      let player1Count = 0;
      let player2Count = 0;

      board.forEach(row => {
        row.forEach(piece => {
          if (piece?.player === 1) player1Count++;
          if (piece?.player === 2) player2Count++;
        });
      });

      expect(player1Count).toBe(12);
      expect(player2Count).toBe(12);
    });

    it('should place pieces only on dark squares', () => {
      const board = createInitialBoard();
      board.forEach((row, rowIndex) => {
        row.forEach((piece, colIndex) => {
          if (piece) {
            expect((rowIndex + colIndex) % 2).toBe(1);
          }
        });
      });
    });

    it('should not have any kings at start', () => {
      const board = createInitialBoard();
      let kingsCount = 0;
      board.forEach(row => {
        row.forEach(piece => {
          if (piece?.isKing) kingsCount++;
        });
      });
      expect(kingsCount).toBe(0);
    });

    it('should create initial game state with correct properties', () => {
      const gameState = createInitialGameState();
      expect(gameState.currentPlayer).toBe(1);
      expect(gameState.selectedPiece).toBeNull();
      expect(gameState.validMoves).toEqual([]);
      expect(gameState.gameOver).toBe(false);
      expect(gameState.winner).toBeNull();
    });
  });

  describe('Move Validation', () => {
    it('should validate board positions correctly', () => {
      expect(isValidPosition(0, 0)).toBe(true);
      expect(isValidPosition(7, 7)).toBe(true);
      expect(isValidPosition(-1, 0)).toBe(false);
      expect(isValidPosition(8, 0)).toBe(false);
      expect(isValidPosition(0, -1)).toBe(false);
      expect(isValidPosition(0, 8)).toBe(false);
    });

    it('should return valid moves for a regular piece', () => {
      const emptyBoard: BoardState = Array(8).fill(null).map(() => Array(8).fill(null));
      const piece: PieceType = {
        id: 'test',
        isKing: false,
        player: 1,
        position: { row: 2, col: 2 }
      };

      const moves = getValidMoves(piece, emptyBoard);
      expect(moves).toContainEqual({ row: 3, col: 1 });
      expect(moves).toContainEqual({ row: 3, col: 3 });
    });

    it('should return valid capture moves', () => {
      const board: BoardState = Array(8).fill(null).map(() => Array(8).fill(null));
      const piece: PieceType = {
        id: 'test',
        isKing: false,
        player: 1,
        position: { row: 2, col: 2 }
      };

      board[3][3] = {
        id: 'enemy',
        isKing: false,
        player: 2,
        position: { row: 3, col: 3 }
      };

      const moves = getValidMoves(piece, board);
      expect(moves).toContainEqual({ row: 4, col: 4 });
    });

    it('should return valid moves for king pieces', () => {
      const emptyBoard: BoardState = Array(8).fill(null).map(() => Array(8).fill(null));
      const piece: PieceType = {
        id: 'test',
        isKing: true,
        player: 1,
        position: { row: 3, col: 3 }
      };

      const moves = getValidMoves(piece, emptyBoard);
      expect(moves).toContainEqual({ row: 2, col: 2 });
      expect(moves).toContainEqual({ row: 4, col: 4 });
      expect(moves).toContainEqual({ row: 2, col: 4 });
      expect(moves).toContainEqual({ row: 4, col: 2 });
    });

    it('should handle edge cases for move validation', () => {
      const board: BoardState = Array(8).fill(null).map(() => Array(8).fill(null));
      const piece: PieceType = {
        id: 'test',
        isKing: false,
        player: 1,
        position: { row: 0, col: 0 }
      };

      const moves = getValidMoves(piece, board);
      expect(moves).toContainEqual({ row: 1, col: 1 });
      expect(moves).not.toContainEqual({ row: -1, col: -1 });
    });
  });
});