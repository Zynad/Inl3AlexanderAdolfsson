class Game {
  constructor() {
    this.Dealer = new Dealer();
    this.Human = new HumanPlayer();
    this.Deck = new Deck().ShuffledDeck;
    this.AddCreditsButton = document
      .querySelector("#add-credits-button")
      .addEventListener("click", () => {
        let creditAddValue = document.querySelector("#add-credits").value;
        this.Human.LoggedInUser.addCredits(creditAddValue);
        this.updateTexts();
      });
    this.Playbutton = document
      .querySelector("#bet-button")
      .addEventListener("click", () => {
        this.Human.betCredits();
        if (this.Human.MadeCorrectBet === true) {
          document.querySelector("#betting").className = "hide";
          document.querySelector("#replay-button").className = "hide";
          document.querySelector("#game-board").className = "visible";
          document.querySelector("#play-buttons").className = "visible";
          this.startGame();
        }
      });
    this.HitButton = document
      .querySelector("#hit-button")
      .addEventListener("click", () => {
        this.Deck = this.Human.hit(this.Deck);
        this.updateTexts();
      });
    this.StayButton = document
      .querySelector("#stay-button")
      .addEventListener("click", () => {
        this.Human.stay();
        this.Deck = this.Dealer.humanStay(this.Deck);
        this.whoWon();
        this.updateTexts();
      });
  }

  startGame() {
    console.log(this.Deck);
    this.Deck = this.Human.firstPlayerCards(this.Deck);
    this.Deck = this.Dealer.firstCards(this.Deck);
    console.log(this.Deck);
    this.updateTexts();
  }

  setUser(user) {
    this.Human.setUser(user);
    this.checkLogIn();
  }

  checkLogIn() {
    if (this.Human.LoggedInUser.LoggedIn === true) {
      document.querySelector("#log-in").className = "hide";
      document.querySelector("#betting").className = "visible";
      this.updateTexts();
    } else {
      alert("Något gick fel vid inloggningen");
    }
  }

  updateTexts() {
    document.querySelector(
      "#loggedin-user-text"
    ).textContent = `Du är inloggad som ${this.Human.LoggedInUser.UserName}`;
    document.querySelector(
      "#loggedin-user-credits"
    ).textContent = `Du har ${this.Human.LoggedInUser.Credits} Credits att spela för`;
    document.querySelector(
      "#dealer-sum"
    ).textContent = `${this.Dealer.ShownSum}`;
    document.querySelector("#your-sum").textContent = `${this.Human.CardSum}`;
  }

  whoWon() {
    let message = "";
    if (this.Human.CardSum > 21) {
      message = `Du har förlorat ${this.Human.CurrentBet} Credits`;
      this.Human.LoggedInUser.removeCredits(this.Human.CurrentBet);
    } else if (this.Dealer.CardSum > 21) {
      message = `Du har vunnit ${this.Human.CurrentBet} Credits`;
      this.Human.LoggedInUser.addCredits(this.Human.CurrentBet);
    }
    //both you and dealer <= 21
    else if (this.Human.CardSum == this.Dealer.CardSum) {
      message = "Det blev lika";
    } else if (this.Human.CardSum > this.Dealer.CardSum) {
      message = `Du har vunnit ${this.Human.CurrentBet} Credits`;
      this.Human.LoggedInUser.addCredits(this.Human.CurrentBet);
    } else if (this.Human.CardSum < this.Dealer.CardSum) {
      message = `Du har förlorat ${this.Human.CurrentBet} Credits`;
      this.Human.LoggedInUser.removeCredits(this.Human.CurrentBet);
    }
    document.querySelector("#results").innerText = message;
    document.querySelector("#play-buttons").className = "hide";
    document.querySelector("#replay-button").className = "visible";
    document.querySelector("#replay-button").addEventListener("click", () => {
      if (this.Deck.length < 20) {
        this.Deck = new Deck().ShuffledDeck;
      }
      this.Dealer.CardSum = 0;
      this.Human.CardSum = 0;
      this.Dealer.ShownSum = 0;
      this.Human.CanHit = true;
      this.Human.MadeCorrectBet = false;
      document.querySelector("#results").textContent = "";
      document.querySelector("#betting").className = "visible";
      document.querySelector("#game-board").className = "hide";
      document.querySelector("#dealer-cards").innerHTML = "";
      document.querySelector("#your-cards").innerHTML = "";
      this.updateTexts();
    });
  }
}
