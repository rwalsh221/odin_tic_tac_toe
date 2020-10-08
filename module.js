const log = console.log;

// GLOBAL VARIABLES
let currentPlayer = 'player-one';
let winner = false;
let draw = false;
let playerOneScore = 0;
let playerTwoScore = 0;
let roundNumber = 1;
let playerArray = [];
const gameInfo = document.querySelector('.game__info--content');

// FOR ANIMATE PIECE MOVE
const elementWidth = document.getElementById(`gamepiece__cross--4`).getBoundingClientRect().width / 2 // 74
const elementHeight = document.getElementById(`gamepiece__cross--4`).getBoundingClientRect().height / 2 // 74

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
                gameInfoCurrentPlayer = document.getElementById(`${currentPlayer}__name`);
               
                gameInfo.textContent = `${gameInfoCurrentPlayer.innerHTML}! Please place your marker`
                controller.nextRound();
            } else {
                currentPlayer = 'player-one';
                gameInfoCurrentPlayer = document.getElementById(`${currentPlayer}__name`);
                
                gameInfo.textContent = `${gameInfoCurrentPlayer.innerHTML}! Please place your marker`
                controller.nextRound();
            }
    
        activePlayer(currentPlayer);
    }

    const activePlayer = (currentPlayer) => {
        if (currentPlayer === 'player-one') {
            document.getElementById('p2__heading').style.color = 'black' 
            document.getElementById('p1__heading').style.color = 'var(--gb-bg-symbol-color)' 
        } else {
            document.getElementById('p1__heading').style.color = 'black' 
            document.getElementById('p2__heading').style.color = 'var(--gb-bg-symbol-color)' 
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
    
        // document.getElementById('gamepiece__container--player-one').removeChild(document.getElementById(`gamepiece__cross--${currentRound}`))
        document.getElementById('gamepiece__container--player-one').insertAdjacentHTML("afterbegin", newHtml);
        
    }
    
    const removeGamePieceNought = (currentRound) => {
        // newHtml = `<div class="gamepiece__empty" id="gamepiece__empty"></div>`
    
        // document.getElementById('gamepiece__container--player-two').removeChild(document.getElementById(`gamepiece__nought--${currentRound}`))
        document.getElementById('gamepiece__container--player-two').insertAdjacentHTML("afterbegin", newHtml);
    }
    
    
    // PLACES GAMEPIECE ON BOARD
    const placeGamePiece = (event, currentRound) => {
        
        const HtmlCross = `<div class="gamepiece__cross" id="game-piece"> <div class="gamepiece__cross--symbol"></div> </div>`
        const HtmlNought = `<div class="gamepiece__nought" id="game-piece"> <div class="gamepiece__nought--symbol"></div> </div>`
        

    
        if (winner === false) {
            let posID = event.target.id
            
            if (currentPlayer === 'player-one' && document.getElementById(posID).classList.contains('game-grid__clear')) {
                // removeGamePieceCross(roundNumber);
                
                document.getElementById(posID).classList.remove('game-grid__clear');
                document.getElementById(posID).classList.add('marker-cross', currentPlayer);
                // document.getElementById(posID).insertAdjacentHTML('afterbegin', HtmlCross);
                
                animateMove(posID, elementWidth, elementHeight, 'gamepiece__cross--')
                controller.checkWin();

            } else if (currentPlayer === 'player-two' && document.getElementById(posID).classList.contains('game-grid__clear')) {
                // removeGamePieceNought(roundNumber)
                
                document.getElementById(posID).classList.remove('game-grid__clear');
                document.getElementById(posID).classList.add('marker-nought', currentPlayer);
                // document.getElementById(posID).insertAdjacentHTML("afterbegin", HtmlNought);
                animateMove(posID, elementWidth, elementHeight, 'gamepiece__nought--')
                controller.checkWin();
            }
        }
    }

    const animateMove = (position, elWidth, elHieght, gamePiece) => {
        const offsetLeft = document.getElementById(position).getBoundingClientRect().x
        const offsetWidth = document.getElementById(position).getBoundingClientRect().width
        
        
        const offsetTop = document.getElementById(position).getBoundingClientRect().y
        const offsetHeight = document.getElementById(position).getBoundingClientRect().height

        const GPoffsetLeft = document.getElementById(`${gamePiece + roundNumber}`).getBoundingClientRect().x
        log(gamePiece + roundNumber + GPoffsetLeft)
        const GPoffsetWidth = document.getElementById(`${gamePiece + roundNumber}`).getBoundingClientRect().width
        log(gamePiece + roundNumber)
        
        
        const GPoffsetTop = document.getElementById(`${gamePiece + roundNumber}`).getBoundingClientRect().y
        log(gamePiece + roundNumber)
        const GPoffsetHeight = document.getElementById(`${gamePiece + roundNumber}`).getBoundingClientRect().height
        log(gamePiece + roundNumber)

        console.log(`${(offsetWidth / 2) + offsetLeft} is the left position!, ${(offsetHeight / 2) + offsetTop } is the top position!`)
        console.log(elHieght + '-----' + elWidth)

        const xPosition = (((offsetWidth / 2) + offsetLeft) - elWidth) - (((GPoffsetWidth / 2) + GPoffsetLeft) - elWidth) ;
        const yPosition = (((offsetHeight / 2) + offsetTop) - elHieght) - (((GPoffsetHeight / 2) + GPoffsetTop) - elHieght);
        console.log(xPosition + '------' + yPosition)

        
       
        log(gamePiece + roundNumber)
        if (gamePiece === 'gamepiece__cross--') {
            log('cross else')
            document.getElementById(`gamepiece__cross--${roundNumber}`).classList.add(`click__cross--${roundNumber}`)
            document.querySelector(`.click__cross--${roundNumber}`).style.transform = `translate(${xPosition}px, ${yPosition}px) rotate(360deg)`
        } else if (gamePiece === 'gamepiece__nought--') {
            log('nought else')
            document.getElementById(`gamepiece__nought--${roundNumber}`).classList.add(`click__nought--${roundNumber}`)
            document.querySelector(`.click__nought--${roundNumber}`).style.transform = `translate(${xPosition}px, ${yPosition}px) rotate(360deg)`
        }
        
    }

    const removeGamePiece = (element) => {
        if (document.getElementById(`pos-${element}`).hasChildNodes()) {
            document.getElementById(`pos-${element}`).removeChild(document.getElementById('game-piece'))
        }
    
        document.getElementById(`pos-${element}`).classList.remove('marker-nought', 'player-one');
        document.getElementById(`pos-${element}`).classList.remove('marker-cross', 'player-two');
    }
    
    const resetGamePiece = () => {
        
        for (i=1; i<=5; i++) {
            
            if(document.getElementById(`gamepiece__cross--${i}`).classList.contains(`click__cross--${i}`)) {
                document.querySelector(`.click__cross--${i}`).style.transform = `translate(0px, 0px) rotate(720deg)`
            } 
            
            if (document.getElementById(`gamepiece__nought--${i}`).classList.contains(`click__nought--${i}`)) {
                document.querySelector(`.click__nought--${i}`).style.transform = `translate(0px, 0px) rotate(720deg)`
            }
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
        
        if (!draw) {
                gameInfo.textContent = `CONGRATULATIONS! ${document.getElementById(`${currentPlayer}__name`).textContent} is the winner`
            } else(
                gameInfo.textContent = `It's a Draw!`
            )

        setTimeout(function(){
            for (var i = 1; i < 6; i++) {
                                (function (i) {
                                  setTimeout(function () {
                                    gameInfo.textContent = `Next round Starting in ${i}`
                                  }, 1000*i);
                                })(i);
                }
        },2000)

        setTimeout(function(){
            
            resetGame();
        },8000);
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
            const gameInfoCurrentPlayer = document.getElementById(`${currentPlayer}__name`);
            gameInfo.textContent = `${gameInfoCurrentPlayer.innerHTML}! Please place your marker`
        } else {
            currentPlayer = 'player-one'
            const gameInfoCurrentPlayer = document.getElementById(`${currentPlayer}__name`);
            gameInfo.textContent = `${gameInfoCurrentPlayer.innerHTML}! Please place your marker`
            
        }
        
        if (winner === true || resetBTN) {
            for(i = 1; i <= 9; i++) {
                
                UICtrl.removeGamePiece(i);
                document.getElementById(`pos-${i}`).classList.add('game-grid__clear')
        }
            UICtrl.resetGamePiece();
        }
        
        init();
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

        setTimeout(function(){
            document.getElementById('new-player-form').style.display = 'inline-block'
            document.querySelectorAll('.body-blur').forEach(function(el) {
            el.style.filter = 'blur(60px)'
            })
        },500)
    }
    
    const closeForm = () => {
        document.getElementById('new-player-form').style.display = 'none'
        document.querySelectorAll('.body-blur').forEach(function(el) {
            el.style.filter = 'blur(0px)'
        })
    }

    // BUTTON EVENT LISTENERS
    document.querySelector('.game-grid').addEventListener('click', function () {
        UICtrl.placeGamePiece(event, roundNumber)
    });
    document.querySelector('.btn__new-player').addEventListener('click', function () {
        playerCTRL.renderNewPlayer();
        closeForm();
    });
    document.querySelector('.newplayer--btn').addEventListener('click', openForm);
    document.querySelector('.btn__close').addEventListener('click', closeForm);
    document.querySelector('.reset--btn').addEventListener('click', function() {
        resetGame(true)
    });

    return {
        nextRound,
        checkWin,
    }

})(playerController, UIController)

const init = () => {
    winner = false
    draw = false
    roundNumber = 1
    const num = Math.floor(Math.random() * 2) + 1
    if (num === 1) {
        currentPlayer = 'player-one'

    } else if (num === 2) {
        currentPlayer = 'player-two'
    }
    playerController.activePlayer(currentPlayer);
    gameInfoCurrentPlayer = document.getElementById(`${currentPlayer}__name`);
    gameInfo.textContent = `${gameInfoCurrentPlayer.innerHTML}! Please place your marker`

}

init();

console.log('working module')