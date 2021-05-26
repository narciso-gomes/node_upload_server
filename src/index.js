const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const corsOption = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))

app.use(require('./routes'));

app.use(cors(corsOption));

app.listen(3000);