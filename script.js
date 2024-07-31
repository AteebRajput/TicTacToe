//==================================================================
// All DOM Elements
//==================================================================

const player1 = document.getElementById("player-1");
const player2 = document.getElementById("player-2");
const message = document.getElementById("message");
const allCells = document.getElementsByClassName("cell")
const resetButton = document.getElementById("play-again");


//==================================================================
// All Variables
//==================================================================

let board = [null,null,null,null,null,null,null,null,null,];
let currentPlayer = 1;
let winner = null;

//==================================================================
// All Function
//==================================================================

// Function to toggle current player

const togglePlayer = () => {

    if(winner == null){
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        
        if(currentPlayer === 1){
            message.innerText = `Player ${currentPlayer} turn`
            player2.classList.add("disable")
            player1.classList.remove("disable")
            
        }
        else{
            message.innerText = `Player ${currentPlayer} turn`;
            player2.classList.remove("disable")
            player1.classList.add("disable")
        }
    }
}

// Function to Update board
const updateBoard = () => {
    board.forEach((val,index) =>{
        if(val != null){

            document.getElementById(`${index}`).innerHTML = val == 1 ? `<i class="fa-solid fa-check limegreen"></i>` : `<i class="fa-solid fa-xmark red"></i>`;
        }
    })
}

// Function to check Winning sequence

const matchWinningSequence = (loc1,loc2,loc3) => {
    return board[loc1] === currentPlayer && board[loc2] === currentPlayer && board[loc3] === currentPlayer 
}

const checkWinner = () =>{
    if(matchWinningSequence(0,1,2)){
        winner = currentPlayer
        message.innerText = `Player ${currentPlayer} Won`;
        highlightPlayer(0,1,2)
        return
    }
    if(matchWinningSequence(0,3,6)){
        winner = currentPlayer
        message.innerText = `Player ${currentPlayer} Won`;
        highlightPlayer(0,3,6)
        return
    }
    if(matchWinningSequence(0,4,8)){
        winner = currentPlayer
        message.innerText = `Player ${currentPlayer} Won`;
        highlightPlayer(0,4,8)
        return
    }
    if(matchWinningSequence(3,4,5)){
        winner = currentPlayer
        message.innerText = `Player ${currentPlayer} Won`;
        highlightPlayer(3,4,5)
        return
    }
    if(matchWinningSequence(6,7,8)){
        winner = currentPlayer
        message.innerText = `Player ${currentPlayer} Won`;
        highlightPlayer(6,7,8)
        return
    }
    if(matchWinningSequence(1,4,7)){
        winner = currentPlayer
        message.innerText = `Player ${currentPlayer} Won`;
        highlightPlayer(1,4,7)
        return
    }
    if(matchWinningSequence(2,5,8)){
        winner = currentPlayer
        message.innerText = `Player ${currentPlayer} Won`;
        highlightPlayer(2,5,8)
        return
    }
    if(matchWinningSequence(2,4,6)){
        winner = currentPlayer
        message.innerText = `Player ${currentPlayer} Won`;
        highlightPlayer(2,4,6)
        return
    }
}

// function to check draw condition

const checkDraw = () =>{
    let nullvalues = 0;
    board.forEach(val => {
        if(val === null){
            nullvalues++
        }
    })
    if(nullvalues === 0 && winner == null){
        message.innerText = `It's a Draw`;
    }
}


// function to highlight winning boxes
const highlightPlayer = (box1,box2,box3) => {
    if(winner === 1){
        document.getElementById(box1).classList.add("player1win")
        document.getElementById(box2).classList.add("player1win")
        document.getElementById(box3).classList.add("player1win")
    }
    else{
        document.getElementById(box1).classList.add("player2win")
        document.getElementById(box2).classList.add("player2win")
        document.getElementById(box3).classList.add("player2win")
    }
}




//==================================================================
// All Event Listener
//==================================================================

// Event Listener for click on boxes

Array.from(allCells).forEach((cell =>{
    cell.addEventListener("click", () => {
        if(!cell.classList.contains("checked") && winner == null){
            board[parseInt(cell.id)] = currentPlayer;
            cell.classList.add("checked")
            updateBoard()
            checkWinner()
            togglePlayer()
            checkDraw()
        }
        
    })
}))

resetButton.addEventListener('click', (e) => {
    // Reset the game state
    winner = null;
    currentPlayer = 1;
    board = [null, null, null, null, null, null, null, null, null];

    // Clear the board cells and remove winning styles
    Array.from(allCells).forEach(cell => {
        cell.classList.remove("checked", "player1win", "player2win");
        cell.innerHTML = ''; // Clear the content
    });

    // Reset the message and player indicators
    message.innerText = `Player ${currentPlayer} turn`;
    player1.classList.remove("disable");
    player2.classList.add("disable");
});
