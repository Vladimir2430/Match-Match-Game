import cardPair from './cardPair';

export default class Game {
  constructor(sh, dif) {
      this.pair                = false;
      this.firstFlipped        = null;
      this.secondFlipped       = null;
      this.shirt               = sh;
      this.difficult           = dif;
      this.tableWidth          = this.difficult.split('_')[0];
      this.tableHeight         = this.difficult.split('_')[1];
      this.gameField           = document.getElementsByClassName('gameField')[0];
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
              cells[j].addEventListener('mousedown', (evt) => {
                  if (this.pair === false && this.firstFlipped !== evt.currentTarget) {
                      evt.currentTarget.classList.add('flipCard');
                      if (this.firstFlipped === null) {this.firstFlipped = evt.currentTarget;
                      } else {
                          this.secondFlipped = evt.currentTarget;
                          this.pair = true;
                          new cardPair(this.firstFlipped, this.secondFlipped);
                          if (this.firstFlipped.children[1].attributes.style.value === this.secondFlipped.children[1].attributes.style.value) {
                            this.tableArray.length -= 2;
                          };
                          if (this.tableArray.length === 0) {
                            this.congratulations();
                          };
                          this.firstFlipped = null;
                          this.secondFlipped = null;
                          this.pair = false;
                      }
                  }
            });
              this.tableArray.push(cells[j]);
          }
      }
      this.gameField.appendChild(table);
      this.setBackImage();
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
