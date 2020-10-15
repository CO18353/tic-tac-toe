# tic-tac-toe using minimax algorithm

function minimax(board,maximizingPlayer)
1. Check for terminal states and accordingly return a value
   1. If it is the winning move and maximizing player’s turn
      1. Then return score positive.
  1. Else if it is the winning move and minimizing player’s turn
    1. Then return score negative.
  1. Else if no one is winning and no empty spots are left
    1. Then return score zero.
2. Go through the available spots on the board
  a. Call the minimax function at each available spot.
  b. Store the score at each position.
3. Reset the board
4. Evaluate the returning values from the function calls.
  a. Choose the highest score when maximizingPlayer is playing.
  b. Else choose the lowest score.
5. Return the best value
