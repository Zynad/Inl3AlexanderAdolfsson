class HumanPlayer extends Player {
  constructor() {
    super();
    this.LoggedInUser;
    this.CurrentBet;
    this.MadeCorrectBet = false;
    this.CanHit = true;
  }

  firstPlayerCards(deck) {
    let cardArray = deck;
    for (let i = 0; i < 2; i++) {
      let cardImg = document.createElement("img");
      let card = cardArray.pop();
      cardImg.src = "../../images/Cards/" + card.Img + ".png";
      this.cardValue(card);
      this.isCardAce(card);
      document.querySelector("#your-cards").append(cardImg);
      this.lowerAceValue();
    }
    return cardArray;
  }

  stay() {
    this.CanHit = false;
  }

  hit(deck) {
    let cardArray = deck;
    if (this.CanHit == false) {
      return cardArray;
    }
    let cardImg = document.createElement("img");
    let card = cardArray.pop();
    cardImg.src = "../../images/Cards/" + card.Img + ".png";
    this.cardValue(card);
    this.isCardAce(card);
    document.querySelector("#your-cards").append(cardImg);
    this.lowerAceValue();
    if (this.CardSum > 21) {
      this.CanHit = false;
    }
    return cardArray;
  }

  setUser(user) {
    this.LoggedInUser = user;
  }

  betCredits() {
    let newBet = document.querySelector("#betting-number").value;
    if (newBet == "") {
      alert("Du måste välja en summa");
      return;
    } else {
      this.CurrentBet = newBet;
    }

    if (this.CurrentBet > this.LoggedInUser.Credits) {
      alert("Du har satsat mer credits än vad du har");
    } else if (this.CurrentBet <= 0) {
      alert("Du måste satsa mer än 0 credits");
    } else {
      alert(`Du har satsat ${this.CurrentBet} Credits`);
      this.MadeCorrectBet = true;
    }
  }
}
