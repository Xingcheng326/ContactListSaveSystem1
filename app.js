//8:15
var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var cors = require("cors");
var path = require("path");

var app = express();
var route = require("./routes/route");
//routes
app.use("/api", route);

//adding middleware- cors
app.use(cors());

//adding body - parser
app.use(bodyparser.json()); //只有这一行代码，跟之前学过的不一样

//static files
// app.use(express.static(path.join(__dirname, "public")));
//觉得以后会跟Express里面的调用html的代码一个作用
// app.get("/", (req, res) => {
// res.sendFile(__dirname + "/index.html");
// });

//connect to mongoDB
mongoose.connect("mongodb://127.0.0.1/contactlist");

//on connection
mongoose.connection.on("connected", () => {
  console.log("Connected to database mongodb://127.0.0.1/contactlist");
});

mongoose.connection.on("error", err => {
  if (err) {
    console.log("Error in Database connection:" + err);
  }
});

//port number
const port = 3000;
//testing server
app.get("/", (req, res) => {
  res.send("foobar");
});

app.listen(port, () => {
  console.log("Server start at port:" + port);
});
