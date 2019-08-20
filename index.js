var express = require("express");
var cors = require("cors");
var app = express();
var routes = require("./app/routes");
const bodyParser = require("body-parser");
var errorHandlers = require("./app/errorHandlers");

app.set("port", process.env.PORT || 6000);
app.use(cors());

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
// views is directory for all template files
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use("/", routes);

app.use(errorHandlers.notFound);
app.use(errorHandlers.devErrors);

app.listen(app.get("port"), async function() {
 
  console.log("Node app is running on port", app.get("port"));
});
