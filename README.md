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
   2. Call the minimax function at each available spot.
   2. Store the score at each position.
3. Reset the board
4. Evaluate the returning values from the function calls.
   4. Choose the highest score when maximizingPlayer is playing.
   4. Else choose the lowest score.
5. Return the best value
