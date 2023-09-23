const app = require('./app.js');
const config = require('./app/config');

const PORT = config.app.port
app.listen(PORT, () => {
    console.log(`app is running at http://localhost:${PORT}`);
})