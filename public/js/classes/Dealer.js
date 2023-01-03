class Dealer extends Player {
  constructor() {
    super();
    this.ShownSum = 0;
    this.HiddenCard;
  }

  firstCards(deck) {
    let cardArray = deck;
    let cardImg = document.createElement("img");
    let hiddenCardImg = document.createElement("img");
    this.HiddenCard = cardArray.pop();
    this.cardValue(this.HiddenCard);
    this.isCardAce(this.HiddenCard);
    hiddenCardImg.src = "../../images/Cards/BACK.png";
    hiddenCardImg.setAttribute("id", "hidden-card-img");
    document.querySelector("#dealer-cards").append(hiddenCardImg);
    let firstCard = cardArray.pop();
    cardImg.src = "../../images/Cards/" + firstCard.Img + ".png";
    this.ShownSum = this.cardValueShown(firstCard);
    this.isCardAce(firstCard);
    document.querySelector("#dealer-cards").append(cardImg);
    this.lowerAceValue();
    return cardArray;
  }

  humanStay(deck) {
    let cardArray = deck;
    while (this.CardSum < 17) {
      let cardImg = document.createElement("img");
      let card = cardArray.pop();
      cardImg.src = "../../images/Cards/" + card.Img + ".png";
      this.cardValue(card);
      this.isCardAce(card);
      document.querySelector("#dealer-cards").append(cardImg);
      this.lowerAceValue();
    }
    document.querySelector("#hidden-card-img").remove();
    this.ShownSum = this.CardSum;
    let hiddenCardImg = document.createElement("img");
    hiddenCardImg.src = "../../images/Cards/" + this.HiddenCard.Img + ".png";
    document.querySelector("#dealer-cards").append(hiddenCardImg);

    return cardArray;
  }
}
