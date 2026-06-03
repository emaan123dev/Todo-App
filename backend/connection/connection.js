const mongoose = require("mongoose");

const connection = async(req,res) => {
   try {
     await mongoose.connect("mongodb://alihaider31557:alihaideralihaider@ac-emhd3ty-shard-00-00.ace3sej.mongodb.net:27017,ac-emhd3ty-shard-00-01.ace3sej.mongodb.net:27017,ac-emhd3ty-shard-00-02.ace3sej.mongodb.net:27017/?ssl=true&replicaSet=atlas-33wlvd-shard-0&authSource=admin&appName=Cluster0").then(()=>{
        console.log("connected");
    })
   } catch (error) {
    res.status(400).json({
        message: "Not Connected",
   });
   }
};
connection();