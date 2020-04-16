const express=require("express");
const app=express();
const config=require("config")

var port=process.env.PORT||config.get("PORT");

app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())
require("./DBconnect")
const user=require("./routes/user");
app.use("/",user)

app.listen(port,()=>{
    console.log(`Server started at ${port}`);
})