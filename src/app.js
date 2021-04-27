const express = require('express');
const {PORT} = require('./constants');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}...`);
});