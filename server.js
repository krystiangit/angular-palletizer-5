const express = require('express');
const path = require('path')
const app = express();
const boxJson = require('./src/assets/boxes-of-pallet.json')

var fs = require ('fs');
var boxesOfPallet = JSON.parse(fs.readFileSync('boxes-of-pallet.json'))
//console.log(boxesOfPallet);

boxesOfPallet1 = {
  aa:1,
  bb:2
}

fs.writeFileSync('boxes-of-pallet1.json', JSON.stringify(boxesOfPallet), _finished)
function _finished(err){
  console.log('writing finished')
}

/*
const cors = require('cors')

var corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

*/
//getting api routes
const api = require('./server/routes/api');
const { finished } = require('stream');

//using middleware
app.use(express.static(path.join(__dirname, 'dist/angular-palletizer2')))
//app.use(express.static(path.join(__dirname, '/src')))
console.log(__dirname)
app.use('/api', api)

//catch all other routes requests and return it to the index



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
