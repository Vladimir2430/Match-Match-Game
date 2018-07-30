import '../css/style.css';
import Game from './Game';

const Buttons = document.querySelectorAll('#cardMenu, #difficultMenu, #gameMenu');
const gameMenuSelect = document.querySelectorAll('#gameMenu>div>div')[1];
const newTimer = {};

for (let i = 0; i < 3; i++) {
    Buttons[i].addEventListener('mousedown', (evt) => evt.currentTarget.classList.add('buttonPressed'));
    Buttons[i].addEventListener('mouseleave', (evt) => evt.currentTarget.classList.remove('buttonPressed'));
}

document.querySelectorAll('#cardMenu>ul>li').forEach((el) => el.addEventListener('mousedown', (evt) =>
    document.querySelectorAll('#gameMenu>div>div')[0].innerHTML = evt.currentTarget.innerHTML)
);

document.querySelectorAll('#difficultMenu>div>div').forEach((el) => el.addEventListener('mousedown', (evt) => {
    gameMenuSelect.innerHTML = evt.currentTarget.innerHTML;
    gameMenuSelect.attributes.difficult.value = evt.currentTarget.attributes.difficult.value;
}));

start.addEventListener('mousedown', (evt) => {
    const newGameDifficult = evt.target.parentElement.children[1].attributes.difficult.value;
    const newGameCard = evt.target.parentElement.children[0].children[0].attributes.src.value;
    const newGame = new Game(newGameCard, newGameDifficult);
    if (newTimer.id) {
        console.log('Clear previous timer');
        clearInterval(newTimer.id);
    }
    newTimer.gameDuration = 0;
    newTimer.id = setInterval(() => {
        let sec = newTimer.gameDuration % 60;
        let min = (newTimer.gameDuration - sec) / 60;
        (sec < 10) ? '0' + sec: sec;
        timer.innerHTML = ((min < 10) ? ('0' + min) : min) + ':' + ((sec < 10) ? ('0' + sec) : sec);
        newTimer.gameDuration++;
    }, 1000);
});
