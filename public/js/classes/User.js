class User {
  constructor() {
    this.UserID;
    this.UserName;
    this.Password;
    this.Credits;
    this.LoggedIn = false;
  }

  addCredits(value) {
    let addedValue = parseInt(value);
    let currentValue = parseInt(this.Credits);
    this.Credits = currentValue + addedValue;
    $.post("/UpdateUser/", this, (response) => {});
  }

  removeCredits(value) {
    let addedValue = parseInt(value);
    let currentValue = parseInt(this.Credits);
    this.Credits = currentValue - addedValue;
    $.post("/UpdateUser/", this, (response) => {});
  }

  logIn(tryUsername, tryPassword) {
    $.get("/GetUser/", (userlist) => {
      let userExists = false;
      userlist.forEach((user) => {
        if (user.Username === tryUsername && user.Password === tryPassword) {
          userExists = true;
          this.UserID = user.UserID;
          this.UserName = user.Username;
          this.Password = user.Password;
          this.Credits = user.Credits;
          this.LoggedIn = true;
        }
      });
      if (userExists === false) {
        alert("Felaktigt användarnamn eller lösenord");
      } else {
        let loggedInGame = new Game();
        loggedInGame.setUser(this);
      }
    });
  }

  registerNewUser() {
    $.get("/GetUser/", (userlist) => {
      let userExists = false;
      userlist.forEach((user) => {
        if (user.Username === this.UserName) {
          userExists = true;
          alert("En användare med det användarnamnet finns redan");
        }
      });
      if (userExists === false) {
        $.post("/AddUser/", this, (response) => {});
        alert("Ditt konto har skapats, du kan nu logga in.");
      }
    });
  }

  updateUser() {}
}
