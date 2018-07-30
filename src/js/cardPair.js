export default class cardPair {
  constructor(firstCard, secondCard) {
      this.toWin = 0;
      this.firstCard = firstCard;
      this.secondCard = secondCard;
      this.checkPair();
  }

  checkPair() {
      let firstCardValue = this.firstCard.children[1].attributes.style.value;
      let secondCardValue = this.secondCard.children[1].attributes.style.value;
      firstCardValue == secondCardValue ? setTimeout(() => this.hidden(), 1000) : setTimeout(() => this.flipBack(), 1500);
  }

  hidden() {
      this.firstCard.classList.toggle('hiddenCard');
      this.secondCard.classList.toggle('hiddenCard');
      setTimeout(() => {
          this.firstCard.classList.toggle('invisibleCard');
          this.secondCard.classList.toggle('invisibleCard');
      }, 1000);
  }

  flipBack() {
      this.firstCard.classList.toggle('flipCard');
      this.secondCard.classList.toggle('flipCard');
  }
}
