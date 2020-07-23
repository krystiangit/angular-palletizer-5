const express = require('express');
const path = require('path')
const app = express();


//getting api routes
const api = require('./server/routes/api')

//using middleware
app.use(express.static(path.join(__dirname, 'dist/angular-palletizer2')))
app.use('/api', api)

//catch all other routes requests and return it to the index
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '/dist/angular-palletizer2/index.html'))
})

const port = process.env.port || 4600
app.listen(port, (req, res)=>{
  console.log('server running on port:' + port);
})
