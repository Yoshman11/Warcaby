export type Position = {
  row: number;
  col: number;
};

export type PieceType = {
  id: string;
  isKing: boolean;
  player: 1 | 2;
  position: Position;
};

export type BoardState = (PieceType | null)[][];

export type GameState = {
  board: BoardState;
  currentPlayer: 1 | 2;
  selectedPiece: PieceType | null;
  validMoves: Position[];
  gameOver: boolean;
  winner: number | null;
};