const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');

const {MONGO_URI} = require('./secrets');
const {PORT} = require('./constants');

mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    const app = express();

    app.use(helmet());

    app.use(express.json());
    app.use(express.urlencoded({extended: false}));

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}...`);
    });
}).catch(console.error);

