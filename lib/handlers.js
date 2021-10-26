const fortune = require("./fortune");

const home = (req, res) => res.render("home");
const about = (req, res) => {
  const fortuneText = fortune.getFortune();
  res.render("about", { fortune: fortuneText });
};
const sectionTest = (req, res) => res.render("section-test");

const notFound = (req, res) => res.render("404");

// next is a required argument for error handling, thanks express >:(
/* eslint-disable no-unused-vars */
const serverError = (err, req, res, next) => res.render("500");
/* eslint-enable no-unused-vars */

module.exports = {
  home,
  about,
  notFound,
  serverError,
  sectionTest
};
