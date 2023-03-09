const mongoose = require('mongoose');

const connectToMongo = async ()=>{
    await mongoose.connect('mongodb://127.0.0.1:27017/inotebook')
  .then(() => console.log('Mongo Connected!'));
}


  module.exports = connectToMongo;