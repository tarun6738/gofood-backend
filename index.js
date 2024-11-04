const express = require('express')
require('dotenv').config();
const app = express()
const port = process.env.PORT;

const mongoDB = require('./db')
mongoDB();

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","https://gofood-frontend-three.vercel.app");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())
app.use('/api',require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
