const express=require('express');//common js modules
// import express from 'express'; es 2015 module
const app = express();

app.get('/',(req,res)=>{
  res.send({hey: 'bro'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
