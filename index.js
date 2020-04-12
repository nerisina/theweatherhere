const express = require('express')
const Datastore = require('nedb')
const app = express()
const port = 3000;
const path = require('path');
const fetch = require('node-fetch'); 
require('dotenv').config()


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

app.use(express.static(path.join(__dirname, 'public'),{}));

app.use(express.json({limit: '1mb'}));

const dataBase = new Datastore('database.db');
dataBase.loadDatabase();

app.post('/api', (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;

    //add data to db
    dataBase.insert(data);

    response.json(data)
});

app.get('/api', (request, respose) => {
    dataBase.find({}, (err, data) => {
        if(err){
            respose.end();
        }
        respose.json(data);
    } )
});

 // fetch weather
 app.get('/weather/:latlng', async(request, response) => {
    const latlng = request.params.latlng.split(',');
    const latitude = latlng[0];
    const longitude = latlng[1];
    
    //api weather 
    const api_key_weather = process.env.API_KEY_WEATHER;
    const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api_key_weather}`;
    const weather_response = await fetch(weather_url);
    const weather_data = await weather_response.json()

    //api air quality 
    const api_key_aq = process.env.API_KEY_AQ;
    const aq_url = `https://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${api_key_aq}`;
    //d446fc2f-b48c-417e-9706-fe1044a3ea18`;

    const aq_response = await fetch(aq_url);
    const aq_quality = await aq_response.json()
 
    
    const data = {
        weather: weather_data,
        air_quality: aq_quality
    }
    console.log(data)
    response.json(data) 
 })
