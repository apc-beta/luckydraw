
const prompt  = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A : 2,
    B : 4,
    C : 6,
    D : 8
}
const SYMBOLS_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
}

const deposit = () => {
    while(1){
        const depositAmount = prompt("Enter a Deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount);
        if(isNaN(numberDepositAmount) || numberDepositAmount < 0){
            console.log("Enter a Valid Amount");
        }else{
            return numberDepositAmount;
        }   
    }
};

const getlines = () => {
    while(1){
        const lines = prompt("Enter the number of lines(1-3): ");
        const numberofLines = parseInt(lines);
        if(isNaN(numberofLines) || numberofLines <= 0 || numberofLines > 3){
            console.log("Enter a Valid Number");
        }else{
            return numberofLines;
        }   
    }
};
const getbet = (balance, lines)=>{
    while(1){
        const bet = prompt("Enter the bet amount per line: ");
        const betAmount = parseFloat(bet);
        if(isNaN(betAmount) || betAmount <= 0 || betAmount > balance/lines){
            console.log("Enter a Valid Bet Amount");
        }else{
            return betAmount;
        }   
    }
};

const spin = () => {
    const symbols = [];
    for(const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for(let i =0; i<count; i++){
            symbols.push(symbol);
        }
    }
    const reels = [];
    for(let i =0; i<COLS; i++){
        reels.push([]);
        const reelsymbols = [...symbols];
        for(let j = 0; j<ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelsymbols.length);
            const selectedsymbol = reelsymbols[randomIndex];
            reels[i].push(selectedsymbol);
            reelsymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};
const transpose =(reels)=>{
    const rowreels = [];
    for(let i = 0; i<reels[0].length; i++){
        const row = [];
        for(let j =0; j<reels.length; j++){
            row.push(reels[j][i]);
        }
        rowreels.push(row);
    }
    return rowreels;
};
const printrows =(rowreels) =>{
    for(const row of rowreels){
        let rowString ="";
        for(const[i,symbol] of row.entries()){
            rowString += symbol;
            if(i != row.length-1)
            rowString += " | ";
        }
        console.log(rowString);
    }
};

const getWinnings =(rowreels, betAmount, lines) =>{
    let winnings = 0;
    for(let row = 0; row<lines; row++){
        const symbols = rowreels[row];
        let isSame = true;
        for(const ch of symbols){
            if(ch != symbols[0]){
                isSame = false;
                break;
            }
        }
        if(isSame) winnings +=  betAmount * SYMBOLS_COUNT[symbols[0]] ;
    }
    console.log(winnings);
    return winnings;
};

const game = () =>{
    let balance = deposit();

    while(1){
        console.log("Your Current Balance is: "+ balance + " Rs.");
        const lines = getlines();
        const betAmount = getbet(balance, lines);
        balance -= betAmount*lines;
        const reels = spin();
        const rowreels = transpose(reels);
        printrows(rowreels);
        const winnings = getWinnings(rowreels, betAmount, lines);
        console.log("You Won: " + winnings + " Rs.");

        const playagain = prompt("Do you want to play again (y,n)? ");
        if(playagain != 'y') break;

        if(balance <= 0){
            console.log("Oops! You ran out of money.");
            break;
        }
        
    }
};
game();



