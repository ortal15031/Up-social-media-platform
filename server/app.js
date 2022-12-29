import express from 'express'
const app=express();
app.use(express.json());
app.use(express.static(`${__dirname}/public`))


module.exports=app;