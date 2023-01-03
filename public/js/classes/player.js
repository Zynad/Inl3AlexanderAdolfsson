class Player {
  constructor() {
    this.CardSum = 0;
    this.AceAmount = 0;
  }

  cardValue(card) {
    if (isNaN(card.Value)) {
      if (card.Value == "A") {
        this.CardSum += 11;
        return;
      }
      this.CardSum += 10;
    } else {
      this.CardSum += parseInt(card.Value);
    }
  }

  cardValueShown(card) {
    if (isNaN(card.Value)) {
      if (card.Value == "A") {
        this.CardSum += 11;
        return 11;
      }
      this.CardSum += 10;
      return 10;
    } else {
      this.CardSum += parseInt(card.Value);
      return parseInt(card.Value);
    }
  }

  isCardAce(card) {
    if (card.Value == "A") {
      this.AceAmount += 1;
    }
  }

  lowerAceValue() {
    while (this.CardSum > 21 && this.AceAmount > 0) {
      this.CardSum -= 10;
      this.AceAmount -= 1;
    }
  }
}
