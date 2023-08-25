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

    function checkWinner() {
        let roundWon = false;
    
        for (let i = 0; i < winConditions.length; i++) {
            const condition = winConditions[i];
            const firstbox = gameArray[condition[0]];
            const secondbox = gameArray[condition[1]];
            const thirdbox = gameArray[condition[2]];
    
            if (firstbox === '' || secondbox === '' || thirdbox === '') {
                continue;
            }
            if (firstbox === secondbox && secondbox === thirdbox) {
                roundWon = true;
                break;
            }
        } 
    
        if (roundWon) {
            gameProgress.textContent = `${currentPlayer} wins!`;
            gameStatus = false;
        } 
        else if (!gameArray.includes('')) {
            gameProgress.textContent = `Draw!`;
            gameStatus = false;
        }
        else {
            changePlayer();
        }
    }

    function gameRestart() {
        currentPlayer = 'X';
        gameArray = ['', '', '', '', '', '', '', '', ''];
        gameProgress.textContent = `${currentPlayer}'s turn`;
        gameBoxes.forEach(box => box.textContent = '');
        gameStatus = true;
    }

    return {
        startGame: startGame
    };
})();

gameModule.startGame();  // Call to initialize the game
