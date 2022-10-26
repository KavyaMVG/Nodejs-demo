
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

let db = [{
  "id": 9,
  "msg": "test"
}];




app.use(cors({origin: "*"}))
app.use(bodyParser.json())

app.get('/msg/:id', (req, res) => {
   const id = parseInt(req.params.id);

   for(const item of db){
    if(item.id === id) {
      return res.send({
        id:item.id,
        msg:item.msg
      });
    }
   }
   res.status(404).send("No message with that ID")
})

app.post('/msg', (req, res)=>{
    const {authorization} = req.headers;
    console.log(req.body);
    const msg = req.body

    if(authorization === 'admin'){
      db.push(msg);
      console.log(db)
      return res.status(201).send({
        msg:"inserted",
        status: 200,
      })
    }
    res.status(401).send({msg:"Not authorized", status: 401})
})



app.listen(process.env.PORT || 3000, ()=>{
    console.log("Listening on port 3000")
})

