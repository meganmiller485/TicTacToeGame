/******************* DOM SELECTORS **********************/

const boardElem = document.querySelector('#board');
const playerTurnElem = document.querySelector('#playerTurn');
const resetButton = document.querySelector('#reset');
const winDraw = document.querySelector('#winDraw');
let clickCount = 0;

/******* BUILDING THE INITIAL STATE OF TIC TAC TOE BOARD ********/

let gameState = {
}; 

const resetState = () => {  
    gameState.board = [     
        '', '', '',
        '', '', '',
        '', '', ''
    ];
    gameState.getCurrentPlayer = () => gameState.players[gameState.currentPlayerIdx];
    gameState.players = ['', ''];
    gameState.currentPlayerIdx = 0;

}

/*************** MANIPULATING THE DOM ****************/

function renderBoard (){
    boardElem.innerHTML = '';
    for(let i = 0; i < gameState.board.length; i++){
        const cell = gameState.board[i];
            const cellElem = document.createElement('div');
            cellElem.classList.add('cell');
            boardElem.appendChild(cellElem);
            cellElem.dataset.index = [i];      
            cellElem.innerText = cell;        
    }
}

const renderPlayer = () => { 
    let text;
    if(!gameState.players[0] || !gameState.players[1]){
        text = 
            `<input name = "player1" placeholder = "Enter Player 1"/> 
            <input name = "player2" placeholder = "Enter Player 2"/>
            <button class = "start"> Start Game </button>`;
    } else {
        text = `It is  ${gameState.getCurrentPlayer()}'s turn!`;
    }
    playerTurnElem.innerHTML = text; 
}

const changeTurn = () => {
    gameState.currentPlayerIdx = Math.abs(gameState.currentPlayerIdx -1);
}

function winGame (){
    if(
        (gameState.board[0] == "X" && gameState.board[1] == "X" && gameState.board[2] == "X") ||
        (gameState.board[3] == "X" && gameState.board[4] == "X" && gameState.board[5] == "X") ||
        (gameState.board[6] == "X" && gameState.board[7] == "X" && gameState.board[8] == "X")
    ) winDraw.innerHTML = "X WINS!";
    if(
        (gameState.board[0] == "X" && gameState.board[3] == "X" && gameState.board[6] == "X") ||
        (gameState.board[1] == "X" && gameState.board[4] == "X" && gameState.board[7] == "X") ||
        (gameState.board[2] == "X" && gameState.board[5] == "X" && gameState.board[8] == "X")
    ) winDraw.innerHTML = "X WINS!";
    if(
        (gameState.board[0] == "X" && gameState.board[4] == "X" && gameState.board[8] == "X") ||
        (gameState.board[2] == "X" && gameState.board[4] == "X" && gameState.board[6] == "X") 
    ) winDraw.innerHTML = "X WINS!";
    
    if(
        (gameState.board[0] == "O" && gameState.board[1] == "O" && gameState.board[2] == "O") ||
        (gameState.board[3] == "O" && gameState.board[4] == "O" && gameState.board[5] == "O") ||
        (gameState.board[6] == "O" && gameState.board[7] == "O" && gameState.board[8] == "O")
    ) winDraw.innerHTML = "O WINS!";
    if(
        (gameState.board[1] == "O" && gameState.board[4] == "O" && gameState.board[7] == "O") ||
        (gameState.board[0] == "O" && gameState.board[3] == "O" && gameState.board[6] == "O") ||
        (gameState.board[2] == "O" && gameState.board[5] == "O" && gameState.board[8] == "O")
    ) winDraw.innerHTML = "O WINS!";
    if(
        (gameState.board[0] == "O" && gameState.board[4] == "O" && gameState.board[8] == "O") ||
        (gameState.board[2] == "O" && gameState.board[4] == "O" && gameState.board[6] == "O") 
    ) winDraw.innerHTML = "O WINS!";
}

function resetWin () {
    winDraw.innerHTML = '';
}

function reset(){
    let newtext = `<button class = "reset"> Restart Game </button>`;
    resetButton.innerHTML = newtext;
}

const render = () => {
    renderPlayer();
    renderBoard();
};

/*************** CREATING EVENT LISTENERS ****************/

const player1Input = document.querySelector('input[name=player1');


function playerStart(event) {
    if(event.target.className === 'start') { 
        const player1Input = document.querySelector('input[name=player1');   
        const player1value = player1Input.value;
        gameState.players[0] = player1value;
        const player2Input = document.querySelector('input[name=player2');
        const player2value = player2Input.value;
        gameState.players[1] = player2value;
        render();
    }
};
playerTurnElem.addEventListener("click", playerStart)

function playGame(event) {
    const idx = event.target.dataset.index
    if(event.target.innerHTML === ""){
            if(event.target.innerHTML = clickCount % 2 === 0) { 
                event.target.innerHTML = "X";
                gameState.board[idx] = "X" ;
            }
                else{
                event.target.innerHTML = "O";
                gameState.board[idx] = "O" ;
            }
            clickCount ++; 
            if(event.target.innerHTML === "X"){
                event.target.style.background = "green";
                }
            if(event.target.innerHTML === "O"){
                event.target.style.background = "blue";
            }  
    };
    changeTurn();
    winGame(); 
    renderPlayer(); 
}   
boardElem.addEventListener("click", playGame);

resetButton.addEventListener("click", (event) => {
    resetState();
    render();
    resetWin();
});

/*************** BOOTSTRAPPING ****************/

resetState();
render();
reset();
