// on server side, we use commonJS modules
// on front end side we can use ES2015 modules like import...
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({ hi: 'there' });
});

app.listen(5000);
