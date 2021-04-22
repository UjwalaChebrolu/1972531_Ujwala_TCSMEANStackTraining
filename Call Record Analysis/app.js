let fs = require("fs");
let mongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017";
mongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true },(err1,client)=>{
if(!err1){
    fs.readFile("call_data.json",(err,data)=> {
        if(!err){
            let callString = data.toString()
            let callJson = JSON.parse(callString);
            let db = client.db("meanstack");
            db.collection("call").insertMany(callJson,(err2,result)=>{
                if(!err2){
                    console.log(result.insertedCount+" rows inserted!");
                }else {
                    console.log(err2.message);
                }
                client.close();    
            });
        }
    }); 
    }
});