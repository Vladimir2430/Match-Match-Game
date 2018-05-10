// Initializing button press
const Buttons = document.querySelectorAll('#cardMenu, #difficultMenu, #gameMenu');
for (let i = 0; i < 3; i++) {
    Buttons[i].addEventListener('mousedown', (evt) => evt.currentTarget.classList.add('buttonPressed'));
    Buttons[i].addEventListener('mouseleave', (evt) => evt.currentTarget.classList.remove('buttonPressed'));
}

// Initializing the cover map selection menu items
document.querySelectorAll('#cardMenu>ul>li').forEach((el) => el.addEventListener('mousedown', (evt) =>
    document.querySelectorAll('#gameMenu>ul>li')[0].innerHTML = evt.currentTarget.innerHTML)
);

// Initialize the game complexity selection menu items
const gameMenuSelect = document.querySelectorAll('#gameMenu>ul>li')[1];
document.querySelectorAll('#difficultMenu>ul>li').forEach((el) => el.addEventListener('mousedown', (evt) => {
    gameMenuSelect.innerHTML = evt.currentTarget.innerHTML;
    gameMenuSelect.attributes.difficult.value = evt.currentTarget.attributes.difficult.value;
}));

// Initialize the start of the game with the specified parameters
const newTimer = {};
start.addEventListener('mousedown', (evt) => {
    const newGameDifficult = evt.target.parentElement.children[1].attributes.difficult.value;
    const newGameCard = evt.target.parentElement.children[0].children[0].attributes.src.value;
    newGame = new Game(newGameCard, newGameDifficult);
    // If the timer of the previous game is not stopped - kill it
    if (newTimer.id) {
        console.log('Clear previous timer');
        clearInterval(newTimer.id);
    }
    // Start a new timer
    newTimer.gameDuration = 0;
    newTimer.id = setInterval(newGame.changeTimer, 1000);
});

class Game {
    constructor(sh, dif) {
        this.toWin = 0;
        this.pair = false;
        this.firstFlipped = null;
        this.secondFlipped = null;
        this.shirt = sh;
        this.difficult = dif;
        this.tableWidth = this.difficult.split('_')[0];
        this.tableHeight = this.difficult.split('_')[1];
        this.gameField = document.getElementsByClassName('gameField')[0];
        this.gameField.innerHTML = null;

        // Making the timer visible
        timer.classList.add('timerVisible');
        // Run the creation of the game board
        this.createTable();
    }

    createTable() {
        const table = document.createElement('table');
        table.setAttribute('cellspacing', 5);
        const frontImage = `<div class="front" style="background-image: url('${this.shirt}')"></div>`;
        this.tableArray = [];
        // Create lines
        const rows = [];
        for (let i = 0; i < this.tableHeight; i++) {
            rows[i] = table.insertRow(i);
            // Create cells
            let cells = [];
            for (let j = 0; j < this.tableWidth; j++) {
                cells[j] = rows[i].insertCell(j);
                cells[j].innerHTML = frontImage;
                cells[j].addEventListener('mousedown', this.flipCard);
                // Filling an array of all cells
                this.tableArray.push(cells[j]);
            }
        }
        this.gameField.appendChild(table);
        // We start filling the back of the cards
        this.setBackImage();
    }

    flipCard(evt) {
        // If there is no inverted pair of cards
        if (newGame.pair == false && newGame.firstFlipped != evt.currentTarget) {
            evt.currentTarget.classList.add('flipCard');
            if (newGame.firstFlipped == null) {newGame.firstFlipped = evt.currentTarget;
            } else {
                newGame.secondFlipped = evt.currentTarget;
                // Do not turn all cards at the same time
                newGame.pair = true;
                // New pair of cards
                new cardPair(newGame.firstFlipped, newGame.secondFlipped);
                // Clear current inverted maps
                newGame.firstFlipped = null;
                newGame.secondFlipped = null;
            }
        }
    }

    // Including min not including max, returns an integer
    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    setBackImage() {
        let count = 0;
        while (count < (this.tableHeight * this.tableWidth) / 2) {
            // To select from n pictures, we pass the second parameter n+1
            const backImage = `<div class="back" style="background-image: url('images/${this.getRandom(1, 13)}.gif')"></div>`;
            let firstCard;
            let secondCard;

            do {
                firstCard = this.getRandom(0, this.tableArray.length);
            } while (this.tableArray[firstCard].children.length == 2);
            this.tableArray[firstCard].innerHTML += backImage;

            do {
                secondCard = this.getRandom(0, this.tableArray.length);
            } while (this.tableArray[secondCard].children.length == 2);
            this.tableArray[secondCard].innerHTML += backImage;

            count++;
        }
    }

    changeTimer() {
        let sec = newTimer.gameDuration % 60;
        let min = (newTimer.gameDuration - sec) / 60;
        (sec < 10) ? '0' + sec: sec;
        timer.innerHTML = ((min < 10) ? ('0' + min) : min) + ':' + ((sec < 10) ? ('0' + sec) : sec);
        newTimer.gameDuration++;
    }

    checkWin() {
        if (this.toWin == this.tableArray.length) {
            this.congratulations();
        }
    }

    congratulations() {
        console.log('your time is ' + timer.innerHTML);
        timer.classList.remove('timerVisible');
        let gameMin = timer.innerHTML.split(':')[0];
        let gameSec = timer.innerHTML.split(':')[1];
        this.gameField.innerHTML = `<div class="congratulations">
            <h2 class="congratulationsText">Congratulations.<br>You won in ${gameMin} minutes ${gameSec} seconds.</h2>
            </div>`;
        setTimeout(function() {
            document.getElementsByClassName('congratulations')[0].classList.add('congratulationsHidden');
        }, 10000);
    }
}

class cardPair {
    constructor(firstCard, secondCard) {
        this.firstCard = firstCard;
        this.secondCard = secondCard;
        this.checkPair();
    }

    checkPair() {
        let firstCardValue = this.firstCard.children[1].attributes.style.value;
        let secondCardValue = this.secondCard.children[1].attributes.style.value;
        firstCardValue == secondCardValue ? setTimeout(() =>  this.hidden(), 1000) :  setTimeout(() => this.flipBack(), 1500);
    }

    hidden() {
        this.firstCard.classList.toggle('hiddenCard');
        this.secondCard.classList.toggle('hiddenCard');
        setTimeout(() => {
            this.firstCard.classList.toggle('invisibleCard');
            this.secondCard.classList.toggle('invisibleCard');
            newGame.toWin += 2;
            newGame.checkWin();
        }, 1000);
        // We return the ability to rotate new maps
        newGame.pair = false;
    }

    flipBack() {
        this.firstCard.classList.toggle('flipCard');
        this.secondCard.classList.toggle('flipCard');
        // We return the ability to rotate new maps
        setTimeout(() => newGame.pair = false, 1000);
    }
}
