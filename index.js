const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');

const app = express();
//conndect to local host
app.listen(3000, () => {
  console.log('listening at port 3000');
});
//pass the index.html that is client side file to the server.
app.use(express.static('public'));

// GET method route
// app.get('/', function(req, res) {
//   res.send('GET request to the homepage');
// });
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

//GET method route
app.get('/api', (request, response) => {
  // Find all documents in the collection
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

// POST method route
app.post('/api', (request, response) => {
  console.log('I got request');
  console.log(request.body);
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  data.feeling = 'sleepy';
  database.insert(data);
  response.json({
    status: 'success',
    timestamp: data.timestamp,
    Latitude: data.lat,
    Activity: data.activity,
    Longtitude: data.lon
  });
});

//GET method route
app.get('/weather/:latlon', async (request, response) => {
  console.log('para,as', request.params);
  const latlon = request.params.latlon.split(',');
  console.log(latlon);
  const lat = latlon[0];
  const lon = latlon[1];
  console.log(lat, lon);
  const APIKEY = '791989e83043288616d30ac61fc806e7';
  const api_url = `https://api.darksky.net/forecast/${APIKEY}/${lat},${lon}`;
  const fetch_response = await fetch(api_url);
  const json = await fetch_response.json();
  response.json(json);
});
