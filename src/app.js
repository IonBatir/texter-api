const express = require('express');
const helmet = require('helmet');
const {PORT} = require('./constants');

const app = express();

app.use(helmet());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}...`);
});