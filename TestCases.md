# Checkers Game Test Cases

## 1. Game Initialization
- **Precondition**: Fresh game load
- **Action**: Start new game
- **Expected**: 
  - Board displays 8x8 grid
  - 12 red pieces for Player 1 positioned in top three rows
  - 12 white pieces for Player 2 positioned in bottom three rows
  - Player 1 (red) starts first
  - All pieces are regular (not kings)

## 2. Basic Movement
- **Precondition**: Player 1's turn
- **Action**: Click valid piece and move diagonally forward
- **Expected**: 
  - Piece moves to new position
  - Turn switches to Player 2
  - Previous position becomes empty

## 3. Invalid Movement Detection
- **Precondition**: Player 1's turn
- **Action**: Attempt to move piece backwards (non-king)
- **Expected**: 
  - Move is not allowed
  - Piece stays in original position
  - Turn remains with Player 1

## 4. Piece Capture
- **Precondition**: Enemy piece available for capture
- **Action**: Jump over enemy piece
- **Expected**: 
  - Enemy piece is removed from board
  - Capturing piece lands in correct position
  - Captured piece count updates

## 5. Multiple Captures
- **Precondition**: Multiple enemy pieces available for consecutive captures
- **Action**: Perform chain of captures
- **Expected**: 
  - All jumped pieces are removed
  - Capturing piece ends in final position
  - Turn only changes after all captures complete

## 6. King Piece Creation
- **Precondition**: Piece reaches opposite end of board
- **Action**: Move piece to last row
- **Expected**: 
  - Piece becomes king (crown appears)
  - King status persists in subsequent moves
  - Turn changes to other player

## 7. King Movement
- **Precondition**: Have a king piece
- **Action**: Move king piece diagonally (forward and backward)
- **Expected**: 
  - King can move in all diagonal directions
  - Movement rules for distance still apply
  - Turn changes after valid move

## 8. Game Win Condition
- **Precondition**: One player has only one piece remaining
- **Action**: Capture last piece
- **Expected**: 
  - Game ends
  - Winner is declared
  - Board becomes inactive

## 9. Turn Management
- **Precondition**: Player 2's turn
- **Action**: Player 1 attempts to move their piece
- **Expected**: 
  - Move is not allowed
  - No pieces move
  - Turn remains with Player 2

## 10. Forced Capture Rule
- **Precondition**: Capture move available
- **Action**: Attempt to make non-capture move
- **Expected**: 
  - Non-capture move is prevented
  - Player must make available capture move
  - Turn doesn't change until capture is made