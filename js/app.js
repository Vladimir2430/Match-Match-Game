const newTimer = {};
let newGame;
// Инициализация нажатия кнопок
const gameButton = document.querySelectorAll('#cardMenu, #dificultMenu, #gameMenu');
// Кнопка выбора обложки
gameButton[0].addEventListener('click', (evt) => {
    evt.currentTarget.classList.toggle('buttonPressed');
});
gameButton[0].addEventListener('mouseleave', (evt) => {
    evt.currentTarget.classList.remove('buttonPressed');
});
// Кнопка выбора сложности
gameButton[1].addEventListener('click', (evt) => {
    evt.currentTarget.classList.toggle('buttonPressed');
});
gameButton[1].addEventListener('mouseleave', (evt) => {
    evt.currentTarget.classList.remove('buttonPressed');
});
// Кнопка начала игры
gameButton[2].addEventListener('click', (evt) => {
    evt.currentTarget.classList.toggle('buttonPressed');
});
gameButton[2].addEventListener('mouseleave', (evt) => {
    evt.currentTarget.classList.remove('buttonPressed');
});
// Инициализация пунктов меню выбора обложки карт 
const cardMenuItems = Array.from(document.querySelectorAll('#cardMenu>ul>li'));
cardMenuItems.map((el) => {
    el.addEventListener('click', (evt) => {
        document.querySelectorAll('#gameMenu>ul>li')[0].innerHTML = evt.currentTarget.innerHTML;
    });
});
// Инициализация пунктов меню выбора сложности игры
const dificultMenuItems = Array.from(document.querySelectorAll('#dificultMenu>ul>li'));
dificultMenuItems.map((el) => {
    el.addEventListener('click', (evt) => {
        document.querySelectorAll('#gameMenu>ul>li')[1].innerHTML = evt.currentTarget.innerHTML;
        document.querySelectorAll('#gameMenu>ul>li')[1].attributes.dificult.value = evt.currentTarget.attributes.dificult.value;
    });
});
// Инициализация старта игры с указанными параметрами
start.addEventListener('click', (evt) => {
    const newGameDificult = evt.target.parentElement.children[1].attributes.dificult.value;
    const newGameCard = evt.target.parentElement.children[0].children[0].attributes.src.value;
    newGame = new Game(newGameCard, newGameDificult);
    // Если таймер предыдущей игры не остановлен - убиваем его
    if (newTimer.id) {
        console.log('Clear previos timer');
        clearInterval(newTimer.id);
    }
    // Запускаем новый таймер
    newTimer.gameDuration = 0;
    newTimer.id = setInterval(newGame.changeTimer, 1000);
});

class Game {
    constructor(sk, dif) {
        this.toWin = 0;
        this.pair = false;
        this.firstFlipped = null;
        this.secondFlipped = null;
        this.scirt = sk;
        this.dificult = dif;
        this.tableWidth = this.dificult.split('_')[0];
        this.tableHeight = this.dificult.split('_')[1];
        this.gameField = document.getElementsByClassName('gameField')[0];
        this.gameField.innerHTML = null;

        // Делаем таймер видимым
        timer.classList.add('timerVisible');
        // Запускаем создание игрового поля
        this.createTable();
    }

    createTable() {
        const table = document.createElement('table');
        table.setAttribute('cellspacing', 5);
        const frontImage = `<div class="front" style="background-image: url('${this.scirt}')"></div>`;
        this.tableArray = [];
        // Создаем строки
        const rows = [];
        for (let i = 0; i < this.tableHeight; i++) {
            rows[i] = table.insertRow(i);
            // Создаем ячейки
            let cells = [];
            for (let j = 0; j < this.tableWidth; j++) {
                cells[j] = rows[i].insertCell(j);
                cells[j].innerHTML = frontImage;
                cells[j].addEventListener('click', this.flipCard);
                // Наполняем массив из всех ячеек
                this.tableArray.push(cells[j]);
            }
        }
        this.gameField.appendChild(table);
        // Запускаем заполнение обратной стороны карт
        this.setBackImage();
    }

    flipCard(evt) {
        // Если нет перевернутой пары карт
        if (newGame.pair == false && newGame.firstFlipped != evt.currentTarget) {
            evt.currentTarget.classList.toggle('flipCard');
            if (newGame.firstFlipped == null) {
                newGame.firstFlipped = evt.currentTarget;
            } else if (newGame.secondFlipped == null) {
                newGame.secondFlipped = evt.currentTarget;
                // Запретить одновременно переворачивать все карты
                newGame.pair = true;
                // Новая пара карт
                new cardPair(newGame.firstFlipped, newGame.secondFlipped);
                // Очищаем текущие перевернуты карты
                newGame.firstFlipped = null;
                newGame.secondFlipped = null;
            }
        }
    }

    // Включая min не включая max, возвращает целое число
    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    setBackImage() {
        let count = 0;
        while (count < (this.tableHeight * this.tableWidth) / 2) {
            // Для выбора из n картинок, вторым параметром передаем n+1
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
        // this.gameField.innerHTML = congr.innerHTML;
        timer.classList.remove('timerVisible');
        clearInterval(newTimer.id);
        newTimer.id = null;
        let gameMin = timer.innerHTML.split(':')[0];
        let gameSec = timer.innerHTML.split(':')[1];
        this.gameField.innerHTML = `<div class="congr">
            <h2 class="congrText">Congratulations.<br>You won in ${gameMin} minutes ${gameSec} seconds.</h2>
            </div>`;
        setTimeout(function() {
            document.getElementsByClassName('congr')[0].classList.add('congrHidden');
        }, 10000);

        // let congratulations = document.createElement('div');
    }
}

class cardPair {
    constructor(fc, sc) {
        this.firstCard = fc;
        this.secondCard = sc;
        this.firstCardValue = this.firstCard.children[1].attributes.style.value;
        this.secondCardValue = this.secondCard.children[1].attributes.style.value;
        this.checkPair();
    }

    checkPair() {
        if (this.firstCardValue == this.secondCardValue) {
            // console.log('true');
            setTimeout(() => {
                this.hidden();
            }, 1000);
        } else {
            // console.log('false');
            setTimeout(() => {
                this.flipBack();
            }, 1500);
        }

    }

    hidden() {
        this.firstCard.classList.toggle('hidenCard');
        this.secondCard.classList.toggle('hidenCard');
        setTimeout(() => {
            this.firstCard.classList.toggle('invisibleCard');
            this.secondCard.classList.toggle('invisibleCard');
            newGame.toWin += 2;
            newGame.checkWin();
        }, 1000);
        // Возвращаем возможность поворачивать новые карты
        newGame.pair = false;
    }

    flipBack() {
        this.firstCard.classList.toggle('flipCard');
        this.secondCard.classList.toggle('flipCard');
        // Возвращаем возможность поворачивать новые карты
        setTimeout(() => {
            newGame.pair = false;
        }, 1000);
    }
}