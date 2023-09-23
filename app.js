const express = require('express');
const cors = require('cors');
const contactRouter = require('./app/routes/contact.route.js')
const ApiError = require('./app/api-error.js')

const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.json({ message: "Wellcome to contact book application" })
});

app.use('/api/users', contactRouter)

app.use((req, res, next) => {
    return next(new ApiError(404, "resource not found"))
})

app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({ message: err.message || 'internal server error' })
})

module.exports = app;