const gameModule = (function() {
    const gameBoxes = document.querySelectorAll('.gamebox');
    const restartBtn = document.querySelector('.btn');
    const gameProgress = document.querySelector('.play-status');
    let gameArray = ['', '', '', '', '', '', '', '', ''];
    const winConditions = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7 ,8], 
        [0, 3, 6], 
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8], 
        [2, 4, 6]
    ];

    let currentPlayer = 'X';
    let gameStatus = false;   // prevents any action if not true

    function startGame() {
        gameBoxes.forEach(box => box.addEventListener('click', boxClicked));
        restartBtn.addEventListener('click', gameRestart);
        gameProgress.textContent = `${currentPlayer}'s turn`;
        gameStatus = true;
    }

    function boxClicked() {
        const boxIndex = this.getAttribute('data-boxIndex');
    
        if (gameArray[boxIndex] !== '' || !gameStatus) {
            return;
        }
    
        updateBox(this, boxIndex);
        checkWinner();
    }

    function updateBox(box, index) {
        gameArray[index] = currentPlayer;
        box.textContent = currentPlayer;
    }

    function changePlayer() {
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        gameProgress.textContent = `${currentPlayer}'s turn`;
    }


    return {
        startGame: startGame
    };
})();

gameModule.startGame();  // Call to initialize the game
