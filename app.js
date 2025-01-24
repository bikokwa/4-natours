const express = require('express');
const fs = require('fs');

// express() will add a bunch of methods to app
const app = express();

// routing is basically how an app responds to a client request
// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side!', app: 'Natours' });
// });

// json() will automatically set our Content-Type to 'application/json
// app.post('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'You can post to this endpoint!', app: 'Natours' });
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`),
  'utf-8'
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
