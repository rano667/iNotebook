const mongoose = require('mongoose');

const connectToMongo = async ()=>{
    try{
           const url = 'mongodb+srv://ranjan:ranjan@cluster0.gcryh.mongodb.net/inotebook';
        mongoose.set("strictQuery", false);
       await mongoose.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log("Database connection successfull");
    }catch(error){
        console.log("Error in database : ", error)
    }
}


  module.exports = connectToMongo;
