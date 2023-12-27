const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router=require('./router/configrouter.js')
const app = express();
const port = process.env.PORT || 2020;


app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
//app.use(express.json({limit: '50mb'}));
app.use(fileUpload());
app.use('/api', router);
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
