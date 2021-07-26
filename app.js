const express= require("express");
const https=require("https");
const bodyParser=require("body-parser");
const ejs = require("ejs");
const app=express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");
})

const apiKey="e488d0902f5fecff3ecdc62041b8e7e7";
const unit="metric";
var query ;
var  weatherData;
var  temp;
var description;
var icon;
var imageURL;
var pressure;
var minTemp;
var maxTemp;
var humidity;



app.post("/",function(req,res){

   query=req.body.cityName;

  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
       weatherData=JSON.parse(data)   //converting the string into json ogbect to be acessed by other json elements
       temp=weatherData.main.temp;
       description=weatherData.weather[0].description;
       icon=weatherData.weather[0].icon;
       imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
       pressure=weatherData.main.pressure;
       minTemp=weatherData.main.temp_min;
       maxTemp=weatherData.main.temp_max;
       humidity=weatherData.main.humidity;
       sunrise=weatherData.sys.sunrise;
       sunset=weatherData.sys.sunset;
       console.log(query);
       console.log(temp);
       console.log(description);
       console.log(imageURL);
       console.log(pressure);
       console.log(minTemp);
       console.log(maxTemp);
       console.log(humidity);


    })

  })
  res.redirect("/weather");
});

app.get("/weather",function(req,res){
  res.render("weather",{
    Query:query,
    temp:temp,
    description:description,
    Url:imageURL,
    minTemp:minTemp,
    maxTemp:maxTemp,
    humidity:humidity,
    pressure:pressure
  });
  console.log("app.get(/weather)");
  console.log(query);
  console.log(temp);
  console.log(description);
  console.log(imageURL);
  console.log(pressure);
  console.log(minTemp);
  console.log(maxTemp);
  console.log(humidity);

})






app.listen(process.env.PORT || 3000,function(){
  console.log("Server started");
});
