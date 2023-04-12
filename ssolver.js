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

    isValidAssignment(board, col, row){
        let val = board[row][col];
        // check row and col
        for (let i = 0; i < this.board_size; i++){
            if (i !== col && board[row][i] === val)
                return false;
            if (i !== row && board[i][col] === val)
                return false;
        } 

        // check square
        const squareRow = Math.floor(row / this.square_size) * this.square_size ;
        const squareCol = Math.floor(col / this.square_size) * this.square_size ;

        for (let i = 0; i < this.square_size; i++){
            for (let j = 0; j < this.square_size; j++){
                if ((squareRow + i !== row || squareCol + j !== col) && board[squareRow + i][squareCol + j] === val)
                    return false;
            }
        }   

        return true;
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
            if (!this.isValidAssignment(attempted_board, col, row))
                continue;
            
            const [next_col, next_row] = this.getNextPosition(col, row);
            const res = this.tryOption(attempted_board, next_col, next_row);
            
            // if a solution found, return it
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