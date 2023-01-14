// This is a solver for sudoku boards. It uses a backtracking algorithm to find a solution.
class SSolver {
    constructor(square_size) { 
        this.square_size = square_size;
        this.board_size = square_size*square_size;
    }

    getClone(board){
        return board.map(row => [...row]);
    }

    getNextPosition(col, row){
        col++;
        if (col === this.board_size){
            col = 0;
            row++;
        }

        return [col, row];
    }

    hasInvalidRepetitions(vals){
        // create an array of repetitions, where the index is the value and the value is the number of repetitions
        // use board_size + 1 to allow for zero
        const reps = new Array(this.board_size + 1);
        reps.fill(0);
        vals.forEach(element => reps[element]++);
        // check if there are any repetitions (except for zero, which is allowed)
        return reps.slice(1).some(r => r > 1);
    }

    isValidByCols(board){
        for(let i = 0; i<this.board_size; i++){
            const vals = board.map(row => row[i]);
            if (this.hasInvalidRepetitions(vals))
                return false;
        }

        return true;
    }

    isValidByRows(board){
        return board.every(row => !this.hasInvalidRepetitions(row));
    }

    isValidBySquares(board){
        // Can't use fill with an array, so we need to fill each element with an empty array
        const valsBySquare = [];
        for (let i = 0; i < this.board_size; i++)
            valsBySquare.push([]);

        for (let row = 0; row < this.board_size; row++)
            for (let col = 0; col < this.board_size; col++){
                // map col, row to square index
                const squareIndex = Math.floor(row / this.square_size) * this.square_size + Math.floor(col / this.square_size);
                valsBySquare[squareIndex].push(board[row][col]);
            }

        return valsBySquare.every(vals => !this.hasInvalidRepetitions(vals));
    }

    isValidBoard(board){
        const byCols = this.isValidByCols(board);
        const byRows = this.isValidByRows(board);
        const bySquares = this.isValidBySquares(board);
        
        return byCols && byRows && bySquares;
    }

    tryOption(board, col, row){
        const current_board = board;

        // we got to the end of the board and some, so we have a solution 
        if (row === this.board_size){
            return current_board;
        }

        // if this position is already set, move to the next one
        if (board[row][col] !== 0){
            const [next_col, next_row] = this.getNextPosition(col, row);
            
            return this.tryOption(current_board, next_col, next_row);
        }
        
        for (let attempted = 1; attempted < 10; attempted++){
            const attempted_board = this.getClone(current_board);
            attempted_board[row][col] = attempted;
            if (!this.isValidBoard(attempted_board))
                continue;
            
            const [next_col, next_row] = this.getNextPosition(col, row);
            const res = this.tryOption(attempted_board, next_col, next_row);
            
            // if a solutin found, return it
            if (res !== null)
                return res;
        }

        return null;
    }

    // board is a 2 dimentional array with numbers for a known value or 0 for an unknown value
    solve(board) { 
        // Step 1 - implement the backtrack algorithm   
        let result = this.tryOption(board, 0, 0);

        return result;
    }
}

export default SSolver