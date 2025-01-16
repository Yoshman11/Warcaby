import { Position, PieceType, BoardState, GameState } from '../types';

export const BOARD_SIZE = 8;

export function createInitialBoard(): BoardState {
  const board: BoardState = Array(BOARD_SIZE).fill(null)
    .map(() => Array(BOARD_SIZE).fill(null));

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if ((row + col) % 2 === 1) {
        board[row][col] = {
          id: `p1-${row}-${col}`,
          isKing: false,
          player: 1,
          position: { row, col }
        };
      }
    }
  }

  for (let row = BOARD_SIZE - 3; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if ((row + col) % 2 === 1) {
        board[row][col] = {
          id: `p2-${row}-${col}`,
          isKing: false,
          player: 2,
          position: { row, col }
        };
      }
    }
  }

  return board;
}

export function getValidMoves(
  piece: PieceType,
  board: BoardState
): Position[] {
  const moves: Position[] = [];
  const directions = piece.isKing ? [-1, 1] : piece.player === 1 ? [1] : [-1];

  for (const rowDir of directions) {
    for (const colDir of [-1, 1]) {
      if (piece.isKing) {
        let distance = 1;
        while (distance < BOARD_SIZE) {
          const newRow = piece.position.row + rowDir * distance;
          const newCol = piece.position.col + colDir * distance;
          
          if (!isValidPosition(newRow, newCol)) break;
          
          const targetSquare = board[newRow][newCol];
          if (!targetSquare) {
            moves.push({ row: newRow, col: newCol });
            distance++;
          } else if (targetSquare.player !== piece.player) {
            const jumpRow = newRow + rowDir;
            const jumpCol = newCol + colDir;
            if (isValidPosition(jumpRow, jumpCol) && !board[jumpRow][jumpCol]) {
              moves.push({ row: jumpRow, col: jumpCol });
            }
            break;
          } else {
            break;
          }
        }
      } else {
        const newRow = piece.position.row + rowDir;
        const newCol = piece.position.col + colDir;
        if (isValidPosition(newRow, newCol) && !board[newRow][newCol]) {
          moves.push({ row: newRow, col: newCol });
        }

        const jumpRow = piece.position.row + rowDir * 2;
        const jumpCol = piece.position.col + colDir * 2;
        if (
          isValidPosition(jumpRow, jumpCol) &&
          !board[jumpRow][jumpCol] &&
          board[newRow][newCol]?.player !== piece.player &&
          board[newRow][newCol] !== null
        ) {
          moves.push({ row: jumpRow, col: jumpCol });
        }
      }
    }
  }

  return moves;
}

export function isValidPosition(row: number, col: number): boolean {
  return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
}

export function createInitialGameState(): GameState {
  return {
    board: createInitialBoard(),
    currentPlayer: 1,
    selectedPiece: null,
    validMoves: [],
    gameOver: false,
    winner: null
  };
}