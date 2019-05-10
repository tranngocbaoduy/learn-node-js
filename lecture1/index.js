const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
var userRoute = require("./routes/users.route");
var authRote = require("./routes/auth.route");

app.use(bodyParser.json()); // for parsing application/json
app.use(
    bodyParser.urlencoded({
        extended: true
    })
); // for parsing application/x-www-form-urlencoded
app.use(express.static('public')); //use folder public as static file

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", function (req, res) {
    res.render("index", {
        name: "AAA"
    });
});

app.use("/users", userRoute);

app.use("/", authRote);

app.listen(port, () => console.log("Server listening on port " + port));