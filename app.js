const express =require("express");
const https = require("https");
const app =express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static( __dirname ));

app.get("/", function (req, res){
    res.sendFile(__dirname + "/index.html");
  })

app.post ('/index.html', function (req, res){
const query = req.body.CityName;
const appid = "03e9ac88b3afe91a40764fdce39aafac"
const units = "metric"
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&lang=EN&appid=" + appid + "&units=" + units;

https.get(url, function (response){
  console.log (response.statusCode);
  response.on("data", function (data){
  const weatherData = JSON.parse(data);
  const temp = weatherData.main.temp;
  const description = weatherData.weather[0].description;
  const icon = weatherData.weather[0].icon;
  const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

  res.write("<h1>The temperature in " + query + " is "  + temp + "* C</h1>");
  res.write("<p>Weather is  " + description+"<p>")
  res.write ("<img src="    + imageUrl +   ">");
  res.send()
})
})
})

app.listen (3000, function(){
  console.log ('Server running on port 3000');
})
