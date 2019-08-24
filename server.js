const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('./Form');

const app = express();

const Form = mongoose.model('forms');
const db = 'mongodb+srv://simple-data:SimpleData2019!!@simple-data-i4sv5.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(db, { useNewUrlParser: true }, (err, db) => {
    if (db) {
        console.log(`Connected to ${db.host}`);
    } else {
        console.log('Error:', err);
    }
}).catch(err => err);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/thank-you', (req, res) => {
    const { name, phone } = req.body;
    const form = new Form({
        name,
        phone
    });
    form.save().catch(err => err);
    console.log(`Name: ${name}\nPhone: ${phone}`);
    res.sendFile(__dirname + '/thank-you.html');
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});