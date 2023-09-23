const express = require('express');
const cors = require('cors');
const contactUser = require('./app/routes/contact.route.js')

const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.json({ message: "Wellcome to contact book application" })
});

app.use('/api/users', contactUser)

module.exports = app;