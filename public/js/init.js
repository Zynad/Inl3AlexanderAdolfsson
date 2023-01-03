window.onload = () => {
  let userName;
  let password;

  document.querySelector("#game-board").className = "hide";
  document.querySelector("#betting").className = "hide";
  document.querySelector("#log-in-button").addEventListener("click", () => {
    let inputUserName = document.querySelector("#username-text").value;
    let inputPassword = document.querySelector("#password-text").value;
    if (inputUserName === "" || inputPassword === "") {
      alert("Du måste ange användarnamn och lösenord");
    } else {
      userName = inputUserName;
      password = inputPassword;
      startGame(userName, password);
    }
  });

  document.querySelector("#register-button").addEventListener("click", () => {
    let inputUserName = document.querySelector("#username-text").value;
    let inputPassword = document.querySelector("#password-text").value;
    if (inputUserName === "" || inputPassword === "") {
      alert("Du måste ange användarnamn och lösenord");
    } else {
      let newUser = new User();
      newUser.UserName = inputUserName;
      newUser.Password = inputPassword;
      newUser.Credits = 100;
      newUser.registerNewUser();
    }
  });
};

function startGame(userName, password) {
  let gameUser = new User();
  gameUser.logIn(userName, password);
}
