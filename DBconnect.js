const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://karthikh032:Praveen2002@mongodb@karthik-tbhes.gcp.mongodb.net/newapi?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true},(err)=>{
    if(err){
        throw err
    }else{
        console.log("Connected to Mongo DB")
    }
})