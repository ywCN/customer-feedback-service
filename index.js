// on server side, we use commonJS modules
// on front end side we can use ES2015 modules like import...
const express = require('express');
const app = express();

// The arrow function will be called when
// the Route with '/' is being visited.
app.get('/', (req, res) => {
    res.send({ hi: 'there' });
});

// env is environment variable
// || 5000 is for development because in local PORT is undefined
const PORT = process.env.PORT || 5000;
app.listen(PORT); // Express tells Node to list to this port number
