const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

connectToMongo();

const app = express()
const port = process.env.PORT || 5000


app.use(cors())


//Available routes
app.get('/', (req, res) => {
  res.send('iNotebook');
})
app.use(express.json())
// /api/auth : The path for which the middleware function is invoked
// require('./routes/auth') The Middle ware
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})

