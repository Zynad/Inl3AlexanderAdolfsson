class Deck {
  constructor() {
    this.Deck = this.createDeck();
    this.ShuffledDeck = this.shuffleDeck(this.Deck);
  }

  createDeck() {
    let values = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];
    let types = ["C", "D", "H", "S"];
    let originalDeck = [];

    for (let i = 0; i < types.length; i++) {
      for (let j = 0; j < values.length; j++) {
        let newCard = new Card(values[j], types[i]);
        originalDeck.push(newCard);
      }
    }
    return originalDeck;
  }

  shuffleDeck(unshuffled) {
    for (let i = 0; i < unshuffled.length; i++) {
      let j = Math.floor(Math.random() * unshuffled.length);
      let tempDeck = unshuffled[i];
      unshuffled[i] = unshuffled[j];
      unshuffled[j] = tempDeck;
    }
    return unshuffled;
  }
}
