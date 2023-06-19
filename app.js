import { gameBoard } from "./gameboard.js";
import { knightsTravails } from "./search-algo.js";

// DOM for chess board module
const appController = (function () {
  gameBoard();
  knightsTravails([3, 3], [4, 3]);
})();
