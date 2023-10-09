const mongoose = require('mongoose')
// const mongoURI = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
const mongoURI = "mongodb://127.0.0.1:27017/inotebook"

const connectToMongo =()=>{
// mongoose.connect(mongoURI, ()=>{
//     console.log('connect to mongoose sucessfully')
// })
mongoose.connect(mongoURI);
console.log("connected to mongo");
}
module.exports = connectToMongo;
//mongodb://localhost:27017