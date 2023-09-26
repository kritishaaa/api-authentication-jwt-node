const mongoose= require('mongoose');

const connectDb = (url)=>{
    mongoose.connect(url, {
        useUnifiedTopology: true,
      useNewUrlParser:true,
    }).then(()=>{
        console.log("Connection Sucessfull");
    }).catch((e)=>{
        console.error(`Error connecting to db ${e}`);        
    })

}
module.exports= connectDb;