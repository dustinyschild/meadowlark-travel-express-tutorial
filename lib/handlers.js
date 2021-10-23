const fortune = require("./fortune");

const home = (req, res) => res.render("home");
const about = (req, res) => {
  const fortuneText = fortune.getFortune();
  res.render("about", { fortune: fortuneText });
};

const notFound = (req, res) => res.render("404");
const serverError = (err, req, res, next) => res.render("500");

module.exports = {
  home,
  about,
  notFound,
  serverError,
};
