const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')



const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())


//Available routes
app.get('/', (req, res) => {
  res.json({
    message : "iNotebook",
    statusCode : 200
  })
})

connectToMongo();

// /api/auth : The path for which the middleware function is invoked
// require('./routes/auth') The Middle ware



//Route 1: Get all the notes using: GET "/api/notes/fetchallnotes". Login required.
app.get("/fetchallnotes", async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal Server Error");
  }
});


app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})

