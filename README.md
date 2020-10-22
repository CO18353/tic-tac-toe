# tic-tac-toe using minimax algorithm

In a competitive multiplayer game like Tic-Tac-Toe, a search algorithm cannot just take a
sequence of steps to achieve the goal state as for each step towards the goal, there is an opposing
factor which tries to alter the current state in an unfavourable manner.
Minimax Algorithm is a tactic which works upon the fact that 2 players are working towards
opposite goals and makes prediction which future state will be reached as the game is being
played. That is, there will be an opposing factor that will try to minimize whatever value the
player is maximizing.
Tic-Tac-Toe is a game for two players, X and O, who take turns marking the spaces in a 3×3
grid. The player who succeeds in placing three of their marks in a horizontal, vertical, or
diagonal row is the winner. X always gets the first move. It can have only 3 outcomes- win,
lose or draw.
The 2 players take turns one after the other. Considering we are maximizing the winning
possibility of X, after he plays his turn, O would try to play such that he wins the game or X
does not win the game. So for each step, if the current player is maximizing his win, the next
player would be minimizing the previous player’s win. The algorithm will analyse every
possible outcome from the current state and assign them some values, for example +1 for win,
-1 for loss and 0 for draw. It is assumed that the opponent (O) will play optimally and always
tries to make the best move for himself (and worse for X). Thus, the algorithm knows what the
opponent will do and so accordingly picks the move with the highest value.


function minimax(board,maximizingPlayer)
1. Check for terminal states and accordingly return a value
   1. If it is the winning move and maximizing player’s turn
      1. Then return score positive.
   1. Else if it is the winning move and minimizing player’s turn
      1. Then return score negative.
   1. Else if no one is winning and no empty spots are left
      1. Then return score zero.
2. Go through the available spots on the board
   1. Call the minimax function at each available spot.
   1. Store the score at each position.
3. Reset the board
4. Evaluate the returning values from the function calls.
   1. Choose the highest score when maximizingPlayer is playing.
   1. Else choose the lowest score.
5. Return the best value
