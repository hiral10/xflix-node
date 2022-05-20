const mongoose = require("mongoose");
const app = require("./app");
mongoose.connect('mongodb://127.0.0.1:27017/xflix',{ useNewUrlParser: true,useUnifiedTopology: true })
        .then(()=>console.log("connect to DB"))
        .catch((e)=>console.log("failed to connect to DB",e))
        
app.listen(8082,()=>{
    console.log("Listening to port",8082)
})
