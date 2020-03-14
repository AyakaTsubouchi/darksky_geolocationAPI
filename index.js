var express = require('express');
var app = express();
//conndect to local host
app.listen(3000, () => {
  console.log('listening at port 3000');
});
//pass the index.html that is client side file to the server.
app.use(express.static('public'));
