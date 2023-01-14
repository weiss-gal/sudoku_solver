import { equal, deepEqual } from 'assert';
import SSolver from './ssolver.js';

// copied some examples from https://www.kaggle.com/datasets/bryanpark/sudoku
const RawPuzzles = [
    [
        "004300209005009001070060043006002087190007400050083000600000105003508690042910300", // puzzle
        "864371259325849761971265843436192587198657432257483916689734125713528694542916378"  // solution
    ],
    [
        "040100050107003960520008000000000017000906800803050620090060543600080700250097100", // puzzle
        "346179258187523964529648371965832417472916835813754629798261543631485792254397186"  // solution
    ],
    [
        "600120384008459072000006005000264030070080006940003000310000050089700000502000190", // puzzle
        "695127384138459672724836915851264739273981546946573821317692458489715263562348197" // solution
    ]
]



// This functions takes a string representing a board and returns a two dimentional array of integers (0 for empty spot)
const str2Board = boardAsString => {
    const boardSize = Math.sqrt(boardAsString.length);
    equal(boardSize*boardSize, boardAsString.length, "Invalid board size, should be a perfect square")
    const board = new Array(boardSize);
    for (let i = 0; i < boardSize; i++){
        board[i] = new Array(boardSize);
        for (let j = 0; j < boardSize; j++){
            board[i][j] = Number(boardAsString[i*boardSize + j]);
        }
    }
    return board;
}

// Accepts a two dimentional array of integers (0 for empty spot) and prints it to the console as a sudoku board
const printBoard = board => {
    const boardSize = board.length;
    const squareSize = Math.sqrt(boardSize);
    if (boardSize > 9){
        console.log("Board is too large to print");
        return;
    }

    for (let i = 0; i < boardSize; i++){
        if (i % squareSize === 0){
            console.log("".padStart(boardSize + Math.floor(boardSize/squareSize) -1, "-"));
        }
        let line = "";
        for (let j = 0; j < boardSize; j++){
            if (j !== 0 && j % squareSize === 0){
                line = line + "|";
            }
            line = line + board[i][j];
        }
        console.log(line);        
    }
    console.log("");
}

// Return an array of the form:
// {
//   squareSize: the square size    
//   board: a two dimentional array of integers (0 for empty spot)   
//   expectedResult: like 'board', representing the expected solution
// }
const getPuzzles = (rawPuzzles) => {
    const result = rawPuzzles.map(rawPuzzlePair => {
        const boardSize = Math.sqrt(rawPuzzlePair[0].length);
        const squareSize = Math.sqrt(boardSize);
        
        equal(squareSize*squareSize, boardSize, "Invalid board size, should be a perfect square")
        equal(rawPuzzlePair[0].length, rawPuzzlePair[1].length, "Puzzle and solution should be equal")
        
        return {
            squareSize: squareSize,
            board: str2Board(rawPuzzlePair[0]),
            expectedResult: str2Board(rawPuzzlePair[1])
        }; 
    });

    return result;
}

/*
 * Finally - Test the solver
 */

const puzzles = getPuzzles(RawPuzzles);
puzzles.forEach(element => {
    console.log("Attepmting to solve puzzle :");
    console.log(`Square size: ${element.squareSize}`);
    printBoard(element.board);
    const solver = new SSolver(element.squareSize);
    const result = solver.solve(element.board);
    if (result === null){
        console.log("No Solution found");
    } else {
        console.log("Solution found:");
        printBoard(result);
        deepEqual(result, element.expectedResult, "Solution is not correct");
    }
});
