const log = console.log;
let currentPlayer = 'p-one';
const pos1 = document.getElementById('pos-1');
const pos2 = document.getElementById('pos-2');
const pos3 = document.getElementById('pos-3');
const pos4 = document.getElementById('pos-4');
const pos5 = document.getElementById('pos-5');
const pos6 = document.getElementById('pos-6');
const pos7 = document.getElementById('pos-7');
const pos8 = document.getElementById('pos-8');
const pos9 = document.getElementById('pos-9');
let winner = false
// let cContains = classList.contains(currentPlayer);
// log(cContains)

// const placeMarker = (event) => {
//     if (winner === false) {
//         // document.querySelector('.game-grid').addEventListener('click', testPlace);
//         testPlace(event);
//     }
// }

const nextPlayer = () => {
    if (currentPlayer === 'p-one') {
        currentPlayer = 'p-two';
        log(currentPlayer)
    } else {
        currentPlayer = 'p-one';
        log(currentPlayer)
    }
}

// const placeMarker = (event) => {
//     log(event.target.id)

   
//     let posID = event.target.id
//     document.getElementById(posID).classList.add(currentPlayer);
//     nextPlayer();
// }

// testClick = (event) => {
//     log(event.target.id);
// }

const placeGamePiece = (event) => {
    if (winner === false) {
        let posID = event.target.id
        
        if (currentPlayer === 'p-one' && document.getElementById(posID).classList.contains('game-grid__clear')) {
            
            
            
            document.getElementById(posID).classList.remove('game-grid__clear');
            document.getElementById(posID).classList.add('marker-nought', currentPlayer, 'test');
            checkWin();
        } else if (currentPlayer === 'p-two' && document.getElementById(posID).classList.contains('game-grid__clear')) {

            document.getElementById(posID).classList.remove('game-grid__clear');
            document.getElementById(posID).classList.add('marker-cross', currentPlayer, 'test');
            checkWin();
        }
    }
}

const isWinner = () => {
    winner = true
    setTimeout(function(){
        
        alert('winner')
        
        
    },1000);

    setTimeout(function(){
        
        resetGame();
    },5000);
}

const resetGame = () => {
    if (winner === true) {
        for(i = 1; i <= 9; i++) {
            // document.getElementById(`pos-${i}`).classList.remove('test');
            document.getElementById(`pos-${i}`).classList.remove('marker-nought', 'p-one');

            document.getElementById(`pos-${i}`).classList.remove('marker-cross', 'p-two');
            document.getElementById(`pos-${i}`).classList.add('game-grid__clear')

        }

    }
}

const checkWin = () => {
    // HORIZONTAL WIN*****************************************************************************************************************************
    if ( pos1.classList.contains(currentPlayer) && pos2.classList.contains(currentPlayer) &&  pos3.classList.contains(currentPlayer)) {
        isWinner();

    }   else if (pos4.classList.contains(currentPlayer) && pos5.classList.contains(currentPlayer) && pos6.classList.contains(currentPlayer)) {
        isWinner();

    }   else if (pos7.classList.contains(currentPlayer) && pos8.classList.contains(currentPlayer) && pos9.classList.contains(currentPlayer)) {
        isWinner();
    }
    // VERTICAL WIN***********************************************************************************************************************************
        else if (pos1.classList.contains(currentPlayer) && pos4.classList.contains(currentPlayer) && pos7.classList.contains(currentPlayer)) {
            isWinner();
    }   else if (pos2.classList.contains(currentPlayer) && pos5.classList.contains(currentPlayer) && pos8.classList.contains(currentPlayer)) {
            isWinner();
    }   else if (pos3.classList.contains(currentPlayer) && pos6.classList.contains(currentPlayer) && pos9.classList.contains(currentPlayer)) {
            isWinner();
    }
    // DIAGONAL WIN****************************************************************************************************************************************
        else if (pos1.classList.contains(currentPlayer) && pos5.classList.contains(currentPlayer) && pos9.classList.contains(currentPlayer)) {
            isWinner();
    }   else if (pos3.classList.contains(currentPlayer) && pos5.classList.contains(currentPlayer) && pos7.classList.contains(currentPlayer)) {
            isWinner();
    }   else {
        nextPlayer();
    }
}

document.querySelector('.game-grid').addEventListener('click', placeGamePiece);

log('working');