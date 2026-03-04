const container = document.getElementById('game-container');

function showGame(game) {
  if (game === 'ticTacToe') loadTicTacToe();
  else if (game === 'rockPaperScissors') loadRPS();
  else if (game === 'coinFlip') loadCoinFlip();
}

// ---------- Tic-Tac-Toe ----------
function loadTicTacToe() {
  container.innerHTML = `
    <h2>Tic-Tac-Toe</h2>
    <div id="ttt-board" class="board"></div>
    <p id="ttt-result"></p>
    <button onclick="loadTicTacToe()">Restart</button>
  `;

  const board = document.getElementById('ttt-board');
  board.style.display = "grid";
  board.style.gridTemplateColumns = "repeat(3, 80px)";
  board.style.gridGap = "5px";

  let cells = [];
  let turn = 'X';
  for(let i=0; i<9; i++){
    const cell = document.createElement('div');
    cell.style.width = "80px";
    cell.style.height = "80px";
    cell.style.background = "#fff";
    cell.style.display = "flex";
    cell.style.alignItems = "center";
    cell.style.justifyContent = "center";
    cell.style.fontSize = "2em";
    cell.style.cursor = "pointer";
    cell.addEventListener('click', () => {
      if(cell.textContent === "") {
        cell.textContent = turn;
        if(checkWin(turn)){
          document.getElementById('ttt-result').innerText = turn + " Wins!";
        } else turn = turn === 'X' ? 'O' : 'X';
      }
    });
    board.appendChild(cell);
    cells.push(cell);
  }

  function checkWin(player){
    const wins = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    return wins.some(combo => combo.every(i => cells[i].textContent === player));
  }
}

// ---------- Rock Paper Scissors ----------
function loadRPS(){
  container.innerHTML = `
    <h2>Rock Paper Scissors</h2>
    <p>Choose your move:</p>
    <button onclick="playRPS('rock')">🪨 Rock</button>
    <button onclick="playRPS('paper')">📄 Paper</button>
    <button onclick="playRPS('scissors')">✂️ Scissors</button>
    <p id="rps-result"></p>
  `;
}

function playRPS(player){
  const moves = ['rock','paper','scissors'];
  const bot = moves[Math.floor(Math.random()*3)];
  let result = "";
  if(player===bot) result="Tie!";
  else if((player==='rock' && bot==='scissors')||(player==='paper' && bot==='rock')||(player==='scissors' && bot==='paper')) result="You Win!";
  else result="You Lose!";
  document.getElementById('rps-result').innerText = `You: ${player} | Bot: ${bot} → ${result}`;
}

// ---------- Coin Flip ----------
function loadCoinFlip(){
  container.innerHTML = `
    <h2>Coin Flip</h2>
    <button onclick="flipCoin()">Flip Coin</button>
    <p id="coin-result"></p>
  `;
}

function flipCoin(){
  const res = Math.random() < 0.5 ? 'Heads' : 'Tails';
  document.getElementById('coin-result').innerText = res;
    }
