const app = require('./app.js');
const config = require('./app/config');
const Mongodb = require('./app/utils/mongodb.util.js')

async function StartServer() {
    try {
        await Mongodb.connect(config.db.uri)
        console.log("connect successful")

        const PORT = config.app.port
        app.listen(PORT, () => {
            console.log(`app is running at http://localhost:${PORT}`);
        })

    } catch {
        console.log('connect failed')
        process.exit()
    }
}

StartServer()

