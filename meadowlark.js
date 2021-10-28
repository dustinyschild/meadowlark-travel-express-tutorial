const express = require("express");
const expressHandlebars = require("express-handlebars");
const multiparty = require("multiparty");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

const app = express();

const port = process.env.PORT || 3000;
const { credentials } = require("./config");

const handlers = require("./lib/handlers");
const weatherMiddleware = require("./lib/middleware/weather");

app.engine(
  "handlebars",
  expressHandlebars({
    defaultLayout: "main",
    helpers: {
      section: function (name, options) {
        if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      }
    }
  })
);

app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

app.use(weatherMiddleware);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser(credentials.cookieSecret));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret
  })
);

app.get("/", handlers.home);
app.get("/about", handlers.about);
app.get("/section-test", handlers.sectionTest);

app.get("/newsletter-signup", handlers.newsletterSignup);
app.post("/newsletter-signup/process", handlers.newsletterSignupProcess);
app.get("/newsletter-signup/thank-you", handlers.newsletterSignupThankYou);

app.get("/newsletter", handlers.newsletter);
app.post("/api/newsletter-signup", handlers.api.newsletterSignup);

app.get("/contest/vacation-photo", handlers.vacationPhotoContest);
app.post("/contest/vacation-photo/:year/:month", (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).send({ error: err.message });
    handlers.api.vacationPhotoContest(req, res, fields, files);
  });
});
app.get(
  "/contest/vacation-photo/thank-you",
  handlers.vacationPhotoContestThankYou
);
app.post("/api/contest/vacation-photo", handlers.api.vacationPhotoContest);

app.use(handlers.notFound);
app.use(handlers.serverError);

// ask if this file is the main module, i.e. was I run directly from command line
if (require.main === module) {
  app.listen(port, () =>
    console.log(
      `Express started on http://localhost:${port}; ` +
        "Press Ctrl + C to terminate."
    )
  );
} else {
  module.exports = app;
}
