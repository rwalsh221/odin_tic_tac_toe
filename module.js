const log = console.log;

// DOM STRINGS
// const pos1 = document.getElementById('pos-1');
// const pos2 = document.getElementById('pos-2');
// const pos3 = document.getElementById('pos-3');
// const pos4 = document.getElementById('pos-4');
// const pos5 = document.getElementById('pos-5');
// const pos6 = document.getElementById('pos-6');
// const pos7 = document.getElementById('pos-7');
// const pos8 = document.getElementById('pos-8');
// const pos9 = document.getElementById('pos-9');

// GLOBAL VARIABLES
let currentPlayer = 'player-one';
let winner = false;
let draw = false;
let playerOneScore = 0;
let playerTwoScore = 0;
let roundNumber = 1;
let playerArray = [];

const playerController = (function () {

    const newPlayerFactory = (name, gamePiece) => {
        if (gamePiece === 'cross') {
            document.getElementById('player-one__name').textContent = name;
        } else {
            document.getElementById('player-two__name').textContent = name;
        }
        return {name, gamePiece};
    };
    
    const renderNewPlayer = () => {
        
        log('running')
    
        const name = document.getElementById('player-name').value
        let gamePiece;
    
        if (document.getElementById('radio-piece-cross').checked === true) {
            // document.getElementById('player-one__name').textContent = name;
            gamePiece = 'cross'
        } else {
            gamePiece = 'nought'
        }
    
        newPlayerFactory(name, gamePiece);
    }
    
    const nextPlayer = () => {
    
        playerArray.push(currentPlayer)
            if (currentPlayer === 'player-one') {
                currentPlayer = 'player-two';
                log(currentPlayer)
                controller.nextRound();
            } else {
                currentPlayer = 'player-one';
                log(currentPlayer)
                controller.nextRound();
            }
    
        activePlayer(currentPlayer);
    }

    const activePlayer = (currentPlayer) => {
        if (currentPlayer === 'player-one') {
            document.getElementById('p2__heading').style.color = 'black' 
            document.getElementById('p1__heading').style.color = 'red' 
        } else {
            document.getElementById('p1__heading').style.color = 'black' 
            document.getElementById('p2__heading').style.color = 'red' 
        }
    }

    return {
        newPlayerFactory,
        renderNewPlayer,
        nextPlayer,
        activePlayer,
    }

    
})();

const UIController = (function () {

    const DOMStrings = {
        pos1: 'pos-1',
        pos2: 'pos-2',
        pos3: 'pos-3',
        pos4: 'pos-4',
        pos5: 'pos-5',
        pos6: 'pos-6',
        pos7: 'pos-7',
        pos8: 'pos-8',
        pos9: 'pos-9',
    }

    const getDomStrings = () => {
        return DOMStrings;
    }

    const removeGamePieceCross = (currentRound) => {
        newHtml = `<div class="gamepiece__empty" id="gamepiece__empty"></div>`
    
        document.getElementById('gamepiece__container--player-one').removeChild(document.getElementById(`gamepiece__cross--${currentRound}`))
        document.getElementById('gamepiece__container--player-one').insertAdjacentHTML("afterbegin", newHtml);
        
    }
    
    const removeGamePieceNought = (currentRound) => {
        newHtml = `<div class="gamepiece__empty" id="gamepiece__empty"></div>`
    
        document.getElementById('gamepiece__container--player-two').removeChild(document.getElementById(`gamepiece__nought--${currentRound}`))
        document.getElementById('gamepiece__container--player-two').insertAdjacentHTML("afterbegin", newHtml);
    }
    
    
    // PLACES GAMEPIECE ON BOARD
    const placeGamePiece = (event) => {
        
        const HtmlCross = `<div class="gamepiece__cross" id="game-piece"> <div class="gamepiece__cross--symbol"></div> </div>`
        const HtmlNought = `<div class="gamepiece__nought" id="game-piece"> <div class="gamepiece__nought--symbol"></div> </div>`
    
        if (winner === false) {
            let posID = event.target.id
            
            if (currentPlayer === 'player-one' && document.getElementById(posID).classList.contains('game-grid__clear')) {
                removeGamePieceCross(roundNumber);
                
                document.getElementById(posID).classList.remove('game-grid__clear');
                document.getElementById(posID).classList.add('marker-cross', currentPlayer);
                document.getElementById(posID).insertAdjacentHTML('afterbegin', HtmlCross);
                
                controller.checkWin();
            } else if (currentPlayer === 'player-two' && document.getElementById(posID).classList.contains('game-grid__clear')) {
                removeGamePieceNought(roundNumber)
                
                document.getElementById(posID).classList.remove('game-grid__clear');
                document.getElementById(posID).classList.add('marker-nought', currentPlayer);
                document.getElementById(posID).insertAdjacentHTML("afterbegin", HtmlNought);
                
                controller.checkWin();
            }
        }
    }

    const removeGamePiece = (element) => {
        if (document.getElementById(`pos-${element}`).hasChildNodes()) {
            document.getElementById(`pos-${element}`).removeChild(document.getElementById('game-piece'))
        }
    
        document.getElementById(`pos-${element}`).classList.remove('marker-nought', 'player-one');
        document.getElementById(`pos-${element}`).classList.remove('marker-cross', 'player-two');
    }
    
    const resetGamePiece = (i) => {
        
        const cross = document.getElementById('gamepiece__container--player-one');
        const nought = document.getElementById('gamepiece__container--player-two');
        
        // REMOVE GAMEPIECE FROM BOARD
        while (cross.firstChild) {
            cross.removeChild(cross.lastChild)
        }
        while (nought.firstChild) {
            nought.removeChild(nought.lastChild)
        }
        
        // RESET GAMEPIECE TO CONTAINER
        for (i=1; i<=5; i++) {
            const htmlCross = `<div id="gamepiece__cross--${i}" class="gamepiece__cross"> <div class="gamepiece__cross--symbol"></div> </div>`
            const htmlNought = `<div id="gamepiece__nought--${i}" class="gamepiece__nought"> <div class="gamepiece__nought--symbol"></div> </div>`
            cross.insertAdjacentHTML("afterbegin", htmlCross);
            nought.insertAdjacentHTML("afterbegin", htmlNought);
        }
    }

    return {
        removeGamePieceCross,
        removeGamePieceNought,
        placeGamePiece,
        removeGamePiece,
        resetGamePiece,
        getDomStrings,
    }

})();

const controller = (function (playerCTRL, UICtrl) {

    const nextRound = () => {
        if (playerArray.length >= 2) {
            roundNumber++
            log(`the round number is ${roundNumber}`)
            playerArray = []
        }
    }

    // WINNER FUNCTION
    const isWinner = (draw) => {
        winner = true
        
        setTimeout(function(){
            if (!draw) {
            alert(`${document.getElementById(`${currentPlayer}__name`).textContent} is the winner`)
            } else(
                alert(`It is a draw`)
            )

        },500);
    
        setTimeout(function(){
            
            resetGame();
        },5000);
    }
    
    // RESET GAME FUNCTIONS FOLLOWING WIN, DRAW OR RESET BUTTON PRESS
    const resetGame = (resetBTN) => {
    
        
        if (!resetBTN && !draw && currentPlayer === 'player-one') {
            playerOneScore++
            document.getElementById(`${currentPlayer}__score`).textContent = playerOneScore;
        } else if (!resetBTN && !draw && currentPlayer === 'player-two') {
            playerTwoScore++
            document.getElementById(`${currentPlayer}__score`).textContent = playerTwoScore;
        }
    
        if (winner === true && currentPlayer === 'player-one') {
            currentPlayer = 'player-two'
        } else {
            currentPlayer = 'player-one'
        }
        
        if (winner === true || resetBTN) {
            for(i = 1; i <= 9; i++) {
                
                UICtrl.removeGamePiece(i);
                document.getElementById(`pos-${i}`).classList.add('game-grid__clear')
        }
            UICtrl.resetGamePiece();
        }
        
        playerController.activePlayer(currentPlayer)
        winner = false
        draw = false
        roundNumber = 1
    }

    const checkWin = () => {

        const DOM = UICtrl.getDomStrings();
        console.log(DOM)
        // HORIZONTAL WIN*****************************************************************************************************************************
        if ( document.getElementById(DOM.pos1).classList.contains(currentPlayer) 
        && document.getElementById(DOM.pos2).classList.contains(currentPlayer) 
        &&  document.getElementById(DOM.pos3).classList.contains(currentPlayer)) {
            isWinner();
    
        }   else if (document.getElementById(DOM.pos4).classList.contains(currentPlayer) 
        && document.getElementById(DOM.pos5).classList.contains(currentPlayer) 
        && document.getElementById(DOM.pos6).classList.contains(currentPlayer)) {
            isWinner();
    
        }   else if (document.getElementById(DOM.pos7).classList.contains(currentPlayer) 
        && document.getElementById(DOM.pos8).classList.contains(currentPlayer) 
        && document.getElementById(DOM.pos9).classList.contains(currentPlayer)) {
            isWinner();
        }
        // VERTICAL WIN***********************************************************************************************************************************
            else if (document.getElementById(DOM.pos1).classList.contains(currentPlayer) 
            && document.getElementById(DOM.pos4).classList.contains(currentPlayer) 
            && document.getElementById(DOM.pos7).classList.contains(currentPlayer)) {
                isWinner();
        }   else if (document.getElementById(DOM.pos2).classList.contains(currentPlayer) 
        && document.getElementById(DOM.pos5).classList.contains(currentPlayer) 
        && document.getElementById(DOM.pos8).classList.contains(currentPlayer)) {
                isWinner();
        }   else if (document.getElementById(DOM.pos3).classList.contains(currentPlayer) 
        && document.getElementById(DOM.pos6).classList.contains(currentPlayer) 
        && document.getElementById(DOM.pos9).classList.contains(currentPlayer)) {
                isWinner();
        }
        // DIAGONAL WIN****************************************************************************************************************************************
            else if (document.getElementById(DOM.pos1).classList.contains(currentPlayer) 
            && document.getElementById(DOM.pos5).classList.contains(currentPlayer) 
            && document.getElementById(DOM.pos9).classList.contains(currentPlayer)) {
                isWinner();
        }   else if (document.getElementById(DOM.pos3).classList.contains(currentPlayer) 
        && document.getElementById(DOM.pos5).classList.contains(currentPlayer) 
        && document.getElementById(DOM.pos7).classList.contains(currentPlayer)) {
                isWinner();
        } else if (roundNumber === 5) {
            isWinner(true);
            draw = true

        }  else {
            
            playerCTRL.nextPlayer();
        }
    }

    // OPEN AND CLOSE NEW PLAYER FORM FUNCTIONS
    const openForm = () => {
        document.getElementById('new-player-form').style.display = 'inline-block'
        document.querySelectorAll('.body-blur').forEach(function(el) {
            el.style.filter = 'blur(60px)'
        })
    }
    
    const closeForm = () => {
        document.getElementById('new-player-form').style.display = 'none'
        document.querySelectorAll('.body-blur').forEach(function(el) {
            el.style.filter = 'blur(0px)'
        })
    }

    // BUTTON EVENT LISTENERS
    document.querySelector('.game-grid').addEventListener('click', UICtrl.placeGamePiece);
    document.querySelector('.btn__new-player').addEventListener('click', function () {
        playerCTRL.renderNewPlayer();
        closeForm();
    });
    document.querySelector('.newplayer--btn').addEventListener('click', openForm);
    document.querySelector('.btn__close').addEventListener('click', closeForm);
    document.querySelector('.reset--btn').addEventListener('click', function() {
        resetGame(true)
    });

    console.log('working');

    return {
        nextRound,
        checkWin,

    }
})(playerController, UIController)

console.log('working module')