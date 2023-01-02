import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
app.set('view engine', 'ejs');

var port = 8080;
var online_users = 0;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

function get_data () {
  axios.get('https://www.growtopiagame.com/detail')
    .then((d) => {
//     console.log('onlien user: ', d['data']['online_user']);
      return d['data']['online_user'];
    });
}

app.get("/", (req, res) => {
  var intervalData = setInterval(function () {
    online_users = get_data();
  }, 1000);
  res.render('home', {"ou": online_users});
});

app.listen(port, () => {
  console.log("Application started and Listening on port " + port);
  console.log("INITIALIZE GET DATA");
});

