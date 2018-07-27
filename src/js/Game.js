import cardPair from './cardPair';
import '../images/1.gif';
import '../images/2.gif';
import '../images/3.gif';
import '../images/4.gif';
import '../images/5.gif';
import '../images/6.gif';
import '../images/7.gif';
import '../images/8.gif';
import '../images/9.gif';
import '../images/10.gif';
import '../images/11.gif';
import '../images/12.gif';

export default class Game {
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

      timer.classList.add('timerVisible');
      this.createTable();
  }

  createTable() {
      const table = document.createElement('table');
      table.setAttribute('cellspacing', 5);
      const frontImage = `<div class="front" style="background-image: url('${this.shirt}')"></div>`;
      this.tableArray = [];

      const rows = [];
      for (let i = 0; i < this.tableHeight; i++) {
          rows[i] = table.insertRow(i);
          let cells = [];
          for (let j = 0; j < this.tableWidth; j++) {
              cells[j] = rows[i].insertCell(j);
              cells[j].innerHTML = frontImage;
              cells[j].addEventListener('mousedown', this.flipCard);
              this.tableArray.push(cells[j]);
          }
      }
      this.gameField.appendChild(table);
      this.setBackImage();
  }

  flipCard(evt) {
      if (newGame.pair == false && newGame.firstFlipped != evt.currentTarget) {
          evt.currentTarget.classList.add('flipCard');
          if (newGame.firstFlipped == null) {newGame.firstFlipped = evt.currentTarget;
          } else {
              newGame.secondFlipped = evt.currentTarget;
              newGame.pair = true;
              new cardPair(newGame.firstFlipped, newGame.secondFlipped);
              newGame.firstFlipped = null;
              newGame.secondFlipped = null;
          }
      }
  }

  getRandom(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
  }

  setBackImage() {
      let count = 0;
      while (count < (this.tableHeight * this.tableWidth) / 2) {
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
      // let sec = newTimer.gameDuration % 60;
      // let min = (newTimer.gameDuration - sec) / 60;
      // (sec < 10) ? '0' + sec: sec;
      // timer.innerHTML = ((min < 10) ? ('0' + min) : min) + ':' + ((sec < 10) ? ('0' + sec) : sec);
      // newTimer.gameDuration++;
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
