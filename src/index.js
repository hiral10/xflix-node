const mongoose = require("mongoose");
const app = require("./app");
require('dotenv').config({ path: require('find-config')('.env') })
mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true,useUnifiedTopology: true  })
        .then(()=>console.log("connect to DB",process.env.MONGODB_URL))
        .catch((e)=>console.log("failed to connect to DB",e))
        
app.listen(process.env.NODE_ENV,()=>{
    console.log("Listening to port",process.env.NODE_ENV)
});
