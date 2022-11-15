const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { default: helmet } = require("helmet");
const compression = require("compression");

const app = express();

// setting global variables for all routers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // making "public" folder be viewed as static content folder

app.use(helmet());
app.use(compression());

app.use((err, req, res, next) => {
  console.log("err :>> ", err);
  const status = err.statusCode || 500;
  const message = err.message;
  const data = err.data;
  res.status(status).redirect("/html/error/500.html");
});

app.get("/index.html", (req, res, next) => {
  res.redirect("/html/entries/01.Introduciton.html");
});

// handling 404:
app.use("/", (req, res, next) => {
  res.redirect("/html/error/404.html");
});

app.listen(process.env.PORT || 8080);
