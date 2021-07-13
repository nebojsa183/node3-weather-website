const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("../src/utils/geocode");
const forcast = require("../src/utils/forcast");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));
app.use(express.static(path.join(__dirname, "../public/about.html")));
app.use(express.static(path.join(__dirname, "../public/help.html")));
app.use(express.static(path.join(__dirname, "../public/404.html")));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Andrew Mead",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Andrew Mead",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "here you can found help",
    title: "Help",
    name: "Andrew Mead",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Adress must be provided!",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forcast(latitude, longitude, (error, forcastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forcast: forcastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Andrew Mead",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => console.log("Server is up on port 3000"));
