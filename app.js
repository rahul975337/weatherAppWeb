const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();




app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html')

});
app.post("/", function (req, res) {
    const apiKey = 'a5d9a01e6ba6e861fd792cfc9b49e089'
    const cityName = req.body.cityName
    const units = 'metric'

    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey + '&units=' + units;
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1 >The temperature  in" + cityName + " is " + temp + " " + units + "</h1 > ");
            res.write("<p >The weather in " + cityName + " is " + weatherDescription + "  </p>");
            res.write("<img src=" + iconUrl + ">");
            res.send();
        })
    })

})





app.listen(3000, function () {
    console.log("Server running on port 3000");
});