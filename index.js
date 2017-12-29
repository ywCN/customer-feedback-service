// on server side, we use commonJS modules
// on front end side we can use ES2015 modules like import...
const express = require('express');
const app = express();

// The arrow function will be called when
// the Route with '/' is being visited.
app.get('/', (req, res) => {
    res.send({ hi: 'there' });
});

app.listen(5000); // Express tells Node to list to the port 5000
