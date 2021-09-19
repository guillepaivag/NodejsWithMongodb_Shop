const mongoose = require('mongoose')
const app = require('./app')

const config = require('./config')

mongoose.connect(config.db, (err, res) => {
    if(err) {
        console.log(err)
        console.log('No anda :(')
        return 
    }

    console.log('Base de datos conectada!')

    app.listen(app.get('port'), () => {
        console.log(`http://localhost:${app.get('port')}`)
    })
})