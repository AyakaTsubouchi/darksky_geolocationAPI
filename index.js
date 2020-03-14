var express = require('express');
var app = express();
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
// POST method route
app.post('/api', (request, response) => {
  console.log('I got request');
  console.log(request.body);
  const data = request.body;
  response.json({
    status: 'success',
    Latitude: data.lat,
    Longtitude: data.lon
  });
});
