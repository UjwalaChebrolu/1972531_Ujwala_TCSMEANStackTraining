let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);
let mongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017"

function insert(data)
{
    mongoClient.connect(url, {useUnifiedTopology: true },(err1,client)=>{
        if(!err1){
            let db = client.db("meanstack");
            db.collection("chatlog").insertOne(data,(err2,result)=>{
                    if(!err2){
                        console.log(result.insertedCount);
                    }else {
                        console.log(err2.message);
                    }
                    client.close();    
                });
                
            }
        });
}

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
 })

 io.on("connection",(socket)=>{
     console.log("client connected")
     socket.on("chatlog",(output)=> {
      var dataJson = JSON.parse(output)
      insert(dataJson);
      console.log(dataJson);
  })

 })

 http.listen(9090,()=>console.log('server running on port 9090'));