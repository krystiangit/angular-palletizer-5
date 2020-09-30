

const express = require('express');
const path = require('path')
const app = express();
const logger = require ('./middleware/logger.js')
//const conn = require ('./middleware/connection.js')
const api = require('./server/routes/api');
//const boxJson = require('./src/assets/boxes-of-pallet.json')
const cors = require('cors');
app.use(cors());

var fs = require ('fs');


//console.log(boxesOfPallet);

/*

fs.writeFileSync('boxes-of-pallet1.json', JSON.stringify({
  aa:1,
  bb:2
}), _finished)
function _finished(err){
  console.log('writing finished')
}
*/
/*
const cors = require('cors')

var corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

*/
//getting api routes

console.log("aaa:...")
const aaa = require('./server/routes/api').aaa

const { finished } = require('stream');

//using middleware
//set static folder




app.use(logger)
app.use(express.static(path.join(__dirname, 'dist/angular-palletizer2')))
//app.use(express.static(path.join(__dirname, '/src')))
console.log("dirname: ")
console.log(__dirname)
app.use('/api', api)
app.use(express.json())
//catch all other routes requests and return it to the index

//app.use(conn)

app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '/dist/angular-palletizer2/index.html'))
})


/*
app.route('/api/boxes').get((req, res) => {
  res.send({
    boxes: boxJson,
  })
})
*/
const port = process.env.port || 4600
app.listen(port, (req, res)=>{
  console.log('server is running on port:' + port);
})
