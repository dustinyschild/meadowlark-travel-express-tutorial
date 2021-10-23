const express = require("express");
const expressHandlebars = require("express-handlebars");
const app = express();

const port = process.env.PORT || 3000;

const handlers = require("./lib/handlers");

app.engine("handlebars", expressHandlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

app.get("/", handlers.home);

app.get("/about", handlers.about);

app.use(handlers.notFound);

app.use(handlers.serverError);

app.listen(port, () =>
  console.log(
    `Express started on http://localhost:${port}; ` +
      "Press Ctrl + C to terminate."
  )
);
