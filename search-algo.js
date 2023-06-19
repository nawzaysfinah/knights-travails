//  Employing a Graph Breadth-First-Search algo for the moves!

const squareRegistry = new Map();

// Get/set current coords to the board
const chessSquare = (x, y) => {
  const xPosition = x;
  const yPosition = y;
  let predecessor;

  //   Define array for hardcorded possible moves of Knight
  const KNIGHT_MOVES = [
    [1, 2],
    [1, -2],
    [2, 1],
    [2, -1],
    [-1, 2],
    [-1, -2],
    [-2, 1],
    [-2, -1],
  ];

  const getPredecessor = () => predecessor;
  const setPredecessor = (newPredecessor) => {
    predecessor = predecessor || newPredecessor;
  };

  const name = () => `${x}, ${y}`;

  // Evaluate current possible knight moves against offsets
  const possibleKnightMoves = () => {
    return KNIGHT_MOVES.map((offset) =>
      newSquareForm(offset[0], offset[1])
    ).filter((square) => square !== undefined);
  };

  // Calculate new set of square coords against the offsets
  const newSquareForm = (xOffset, yOffset) => {
    const [newX, newY] = [xPosition + xOffset, yPosition + yOffset];
    if (0 <= newX && newX < 8 && 0 <= newY && y < 8) {
      /* check newX, X, newY, Y are correct */ return chessSquare(newX, newY);
    }
  };

  // Get/set map constructor object name(s)
  if (squareRegistry.has(name())) {
    return squareRegistry.get(name());
  } else {
    const newSquare = {
      name,
      getPredecessor,
      setPredecessor,
      possibleKnightMoves,
    };
    squareRegistry.set(name(), newSquare);
    return newSquare;
  }
};

// IntAke the click coords from user and run the search algo
const knightsTravails = (start, finish) => {
  squareRegistry.clear();

  const origin = chessSquare(...start);
  const target = chessSquare(...finish);

  const queue = [origin];
  while (!queue.includes(target)) {
    const currentSquare = queue.shift();

    const enqueueList = currentSquare.possibleKnightMoves();
    enqueueList.forEach((square) => square.setPredecessor(currentSquare));
    queue.push(...enqueueList);
  }

  const path = [target];
  while (!path.includes(origin)) {
    const prevSquare = path[0].getPredecessor();
    path.unshift(prevSquare);
  }
  console.log(`the shortest path was ${path.length - 1} moves!`);
  console.log("the moves were:");
  path.forEach((square) => console.log(square.name()));
};

export { knightsTravails };
