const fortune = require("./fortune");

const home = (req, res) => res.render("home");
const about = (req, res) => {
  const fortuneText = fortune.getFortune();
  res.render("about", { fortune: fortuneText });
};
const sectionTest = (req, res) => res.render("section-test");

const newsletterSignup = (req, res) =>
  res.render("newsletter-signup", { csrf: "CSRF token goes here" });

const newsletterSignupProcess = (req, res) => {
  console.log("Form (from querystring): " + req.query.form);
  console.log("CSRF token (from hiddlen form field): " + req.body._csrf);
  console.log("Name (from visible form field): " + req.body.name);
  console.log("Email (from visible form field): " + req.body.email);

  res.redirect(303, "/newsletter-signup/thank-you");
};

const newsletterSignupThankYou = (req, res) =>
  res.render("newsletter-signup-thank-you");

const newsletter = (req, res) => {
  res.render("newsletter", { csrf: "CSRF token here" });
};

const api = {
  newsletterSignup: (req, res) => {
    console.log("Form (from querystring): " + req.body.form);
    console.log("CSRF token (from hiddlen form field): " + req.body._csrf);
    console.log("Name (from visible form field): " + req.body.name);
    console.log("Email (from visible form field): " + req.body.email);

    res.send({ result: "success" });
  }
};

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
  sectionTest,
  newsletterSignup,
  newsletterSignupProcess,
  newsletterSignupThankYou,
  newsletter,
  api
};
