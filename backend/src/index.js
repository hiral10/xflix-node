const mongoose = require("mongoose");
const app = require("./app");
require('dotenv').config({path:"../.env"})
mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true,useUnifiedTopology: true  })
        .then(()=>console.log("connect to DB"))
        .catch((e)=>console.log("failed to connect to DB",e))
        
app.listen(process.env.NODE_ENV,()=>{
    console.log("Listening to port",8082)
})
