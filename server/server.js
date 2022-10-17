const express = require('express');
const firebase = require('./database/api');
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/notes',(req,res)=>{
    firebase.get('notes').then((result)=>{
        res.send(result);
    })
})

app.post('/api/delete',(req,res)=>{
    const id = req.body.id;
    
    firebase.remove('notes',id);
});

app.post('/api/create',(req,res)=>{
    const rTitle = req.body.iTitle;
    const rBody = req.body.iBody;

    firebase.add('notes',{title: rTitle, body: rBody});
})


app.listen(5000, () =>{
    console.log("Server listening in port 5000");
})
