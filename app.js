const express = require("express");
const https = require("https"); //native module of Node
const bodyParser = require("body-parser"); //It will parse the data 

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){ //caching data using post
     
    const query = req.body.cityName;  //getting Dynamic data  //cityName is from index.html
    const apiKey = "775d0040b41db3597de8b605a53c46f0";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function(response){
        console.log(response.statusCode); //getting status code of server

        response.on("data", function(data){
            const weatherData = JSON.parse(data); //Parsing JSON object
            console.log(weatherData);
            
            //Printing temp object
            const temp = weatherData.main.temp; 
            console.log(temp);
            //Printing weather description
            const weatherDescription = weatherData.weather[0].description;
            console.log(weatherDescription);

            //Adding Image
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The temperature in " + query + " is " + temp + " degree Celcius</h1>"); 
            res.write("<img src=" + imageURL + ">");
            res.send(); // only 1 send should be present

            /*const object = {
                name : "Swetha",
                favouriteFood: "Biryani"
            }
            console.log(JSON.stringify(object)); //JSON object*/
        })
    });
   // res.send("Server is up and running");


});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});