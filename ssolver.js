class SSolver {

    constructor(square_size) { 
        this.square_size = square_size;
        this.board_size = square_size*square_size;
    }

    // // PBoard is a two dimentional array where each element is an object of the following form:
    // // {
    // //   isKnown: Boolean - true if this value is known
    // //   value: number - relevant only if isKnown
    // //   possibilities: array of possible values  
    // // }
    // getPBoard(board){
    //     throw "not implemented"
    // }

    // // Counts the total possibilities (known is counted as zero)
    // countPossibilities(pBoard){
    //     throw "not implemented"
    // }

    // getResultBoard(pBoard){
    //     throw "not implemented";
    // }

    // // BT (backtrack) board is a two dimentional array where each element is an object of the following form:
    // // {
    // //   isKnown: Boolean - true if this value is known
    // //   value: number - relevant only if isKnown
    // //   tempValue: number - the currently tested value or zero (if no value is tested)
    // // }
    // getBTBoard(pBoard){
    //     throw "not implemented";
    // }

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
        const reps = new Array(this.board_size);
        reps.fill(0);
        vals.forEach(element => resp[element]++);

        return reps.slice(1).every(r => r < 2);
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
        const valsBySquare = new Array(this.board_size);
        valsBySquare.fill([]);

        for (let row = 0; row < this.board_size; row++)
            for (let col = 0; col < this.board_size; col++){
                // map col, row to square index
                const squareIndex = (row / this.square_size) * this.square_size + (col / this.square_size);
                valsBySquare[squareIndex].push(board[row][col]);
            }

        return valsBySquare.every(vals => !this.hasInvalidRepetitions(vals));
    }

    isValidBoard(board){
        return this.isValidByCols(board) && this.isValidByRows(board) && this.isValidBySquares(board);
    }

    tryOption(board, col, row){
        const current_board = board;

        // we got to the end of the board, 
        if (row === this.board_size)
            return current_board;

        // if this position is already set, move to the next one
        if (board[row][col] !== 0){
            const [next_col, next_row] = this.getNextPosition(col, row);
            
            return res = this.tryOption(current_board, next_col, next_row);
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
        // const pBoard = buildPBoard(board);
        // // step 1 - remove all the impossible values 
        // while (1) {
        //     const possibilitiesBefore = countPossibilities(pBoard);
        //     purgeBySquare(pBoard);
        //     purgeByRow(pBoard);
        //     purgeByCol(pBoard);

        //     const possibilitiesAfter = countPossibilities(pBoard);

        //     const progress = possibilitiesBefore - possibilitiesAfter;
        //     // if this is true it means that we 
        //     if (!progress)
        //         break;
        // }

        // const possibilities = this.countPossibilities(pBoard);
        // if (!possibilities) // means we have an answer       
        //     return this.getResultBoard(pBoard);

        // Step 2 - implement the backtrack algorithm
     
       
        let result = this.tryOption(board, 0, 0);

        console.log(result ? JSON.stringify(result) : "failed")

        return result;
    }
}

export default SSolver