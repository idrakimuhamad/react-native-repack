const express = require('express')
const app = express()
const PORT = 4040

app.get('/', (req, res) => {
    res.send("Hitting it hard.")
})

app.get('/version', (req, res) => {
    const VERSION = '4'
    
    console.log('/get Version', VERSION);

    res.json({
        version: VERSION
    })
})

app.use(express.static('public'))

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))