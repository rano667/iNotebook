const mongoose = require('mongoose');

const connectToMongo = async ()=>{
    await mongoose.connect('mongodb+srv://ranjan:ranjan@cluster0.gcryh.mongodb.net/inotebook')
  .then(() => console.log('Mongo Connected!'));
}


  module.exports = connectToMongo;
