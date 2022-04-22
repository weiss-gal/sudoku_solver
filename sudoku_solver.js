const Matrix_size = 9;
const Square_size = 3;



let base_matrix = [
    [0, 0, 3, 0, 0, 7, 0, 0, 0],
    [7, 8, 4, 0, 5, 0, 0, 9, 6],
    [9, 0, 0, 0, 0, 0, 0, 5, 0],
    [0, 0, 7, 2, 0, 1, 0, 0, 5],
    [0, 9, 0, 0, 0, 0, 0, 3, 4],
    [3, 0, 0, 4, 0, 9, 0, 0, 0],
    [0, 6, 0, 0, 2, 0, 0, 0, 3],
    [2, 0, 0, 0, 6, 0, 5, 1, 7],
    [0 ,0, 0, 8, 0, 0, 2, 0, 0]
];

class cellInfo {
    constructor(isFinal = false, value = null){
        this.isFinal = isFinal;
        this.options = [];
        if (isFinal)
            this.value = value;
        else 
            this.options = Array.from({length: Matrix_size}, (_, i) => i+1);
    }
}

const buildSolutionMatrix = (baseMatrix = null) => {
    let result = []; 
    for (let y=0; y < Matrix_size; y++)
    {
        result[y] = [];
        for(let x=0; x < Matrix_size; x++)
            result[y][x] = baseMatrix == null ?  new cellInfo(false) : new cellInfo(baseMatrix[y][x] != 0, baseMatrix[y][x]);
    }
}

// Initialize matrix list of possible value
let solutionMatrix = buildSolutionMatrix(base_matrix);

//console.log(solutionMatrix);

// remove all impossible options of row
const purge_row_options = (m, row) => {
    // find all known symbols in this row
    known_symbols = m[row].filter(cell => cell.length == 1).flatMap(cell => cell);
    

    // remove all known symbols in this row
    for (let i = 0; i < Matrix_size; i++)
        m[row][i] = m[row][i].length > 1 ? m[row][i].filter(item => !known_symbols.includes(item)) : m[row][i];
}

const purge_col_options = (m, col) => {
    known_symbols = m.map(row => row[col]).filter(cell => cell.length == 1).flatMap(cell => cell);
    console.log("known_symbols are:", known_symbols);

    for (let i = 0; i < Matrix_size; i++)
        m[i][col] = m[i][col].length > 1 ? m[i][col].filter(item => !known_symbols.includes(item)) : m[i][col];
}

const purge_square_options = (m, row, col) => {
    let known_symbols = [];
    for (let y = 0; y < Square_size; y++)
        for (let x = 0; x < Square_size; x++)
            if (m[row + y][col + x].length == 1) 
                known_symbols.push(m[row + y][col + x][0]);
   
    for (let y = 0; y < Square_size; y++)
        for (let x = 0; x < Square_size; x++)
            if (m[row + y][col + x].length != 1) 
                m[row  + y][col + x] = m[row  + y][col + x].filter(item => !known_symbols.includes(item));
           

    console.log("known_symbols are:", known_symbols);
}

const narrow_row_options = (m, row) => {
    // find unique numbers
    let freqMap = m[row].filter(item => item.count > 1).flatMap(item => item).reduce((prev, curr) => {prev[curr]++; return prev} ,Array(Matrix_size));

    for (i=0; i<Matrix_size; i++){
        let uniqeNumbers = m[row][i].filter(val => freqMap[val] == 1);

    }
}


const count_remaining_options = (m) => {
    let c = 0;
    for (let row = 0; row < Matrix_size; row++)
        for (let col = 0; col < Matrix_size; col++)
            c += m[row][col].length;

    return c;
}

let options_count_before = 0;
let cycle_counter =0;
do {
    options_count_before = count_remaining_options(solutionMatrix);
    
    for (i = 0; i < Matrix_size; i++)
        purge_row_options(solutionMatrix, i);

    for (i = 0; i < Matrix_size; i++)
        purge_col_options(solutionMatrix, i);

    for (y = 0; y < 3; y++)
        for (x = 0; x < 3; x++)
            purge_square_options(solutionMatrix, y*Square_size, x*Square_size);

    // solve unique numbers 
    
    
    cycle_counter++;
}
while (options_count_before != count_remaining_options(solutionMatrix));

console.log(solutionMatrix)
console.log(`reached completion in ${cycle_counter} cycles`);