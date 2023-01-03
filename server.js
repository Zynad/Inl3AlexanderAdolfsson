//-------------------------------------------------------------
//***For att satta upp projektet och ladda ned node moduler
//-------------------------------------------------------------
//npm init -f                       	      Skapar package.json
//npm install express --save        Installerar webservermoduler
//npm install body-parser --save    H�lpmodul f�r att posta data
//npm install msnodesqlv8 --save  Installerar SQL-Server modul

//-------------------------------------------------------------
//***For att starta upp servern och testa att kora
//-------------------------------------------------------------
//starta upp servern genom att oppna Integrated Terminal
//och skriv node server.js. Ga sedan till webblasaren och
//skriv localhost:8080

//<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

//webserver
const express = require("express");
const app = express();

//For att parsa skickade data fran client body('post')
const bodyParser = require("body-parser");
const path = require("path");

//hantera inkommande data som json
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Hitta index.html(startfil) som ligger i public mappen
app.use(express.static(path.join(__dirname, "public")));

//Ladda in modul for sql-serveratkomst
const sql = require("msnodesqlv8");

//Connection strang (anges som vanligt)
const connString =
  "server=.;Database=BlackJack;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

app.post("/AddUser/", (request, response) => {
  let userName = request.body.UserName;
  let password = request.body.Password;
  let credits = request.body.Credits;

  let sqlCode =
    "INSERT INTO Account(Username, Password, Credits) " +
    " VALUES ('" +
    userName +
    "','" +
    password +
    "','" +
    credits +
    "');";

  sql.query(connString, sqlCode, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      response.json(result);
    }
  });
});

app.get("/GetUser/", (request, response) => {
  let sqlCode = "select UserID, Username, Password, Credits from Account";

  sql.query(connString, sqlCode, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      response.json(result);
    }
  });
});

// Update
app.post("/UpdateUser/", (request, response) => {
  let userID = request.body.UserID;
  let credits = request.body.Credits;

  let sqlCode =
    "update Account set Credits = " +
    credits +
    " where UserID = '" +
    userID +
    "'";

  sql.query(connString, sqlCode, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      response.json(result);
    }
  });
});

function myError(err) {
  //myres.send(err)
}

//Skapa webservern pa en bestamd port
app.listen(8080);
console.log("lyssnar pa port 8080");
