const express = require('express')
const router = express.Router();

var fs = require ('fs');
const connect = require ('../../middleware/connection.js')

var boxesOfPalletJson = fs.readFileSync('./json/boxes-of-pallet.json')
var boxesOfPpJson = fs.readFileSync('./json/boxes-of-pp.json')
var palletsJson = fs.readFileSync('./json/pallets.json')
var pickingPlacesJson = fs.readFileSync('./json/picking-places.json')
router.use(express.json())

// sending files with saved positions to angular
router.get('/boxes-of-pallet',(req, res)=>{
  res.send(boxesOfPalletJson)
  res.status(200)
})

router.get('/boxes-of-pp',(req, res)=>{
  res.send(boxesOfPpJson)
  res.status(200)
})

router.get('/pallets',(req, res)=>{
  res.send(palletsJson)
  res.status(200)
})

router.get('/picking-places',(req, res)=>{
  res.send(pickingPlacesJson)
  res.status(200)
})

//reseiving positions from angular and saving to json files
router.post('/boxes-of-pallet', (req, res)=>{
  //console.log(req.body);
  boxesOfPalletJson = JSON.stringify(req.body)
  fs.writeFileSync('boxes-of-pallet.json', boxesOfPalletJson, _finished())
  function _finished(err){
    console.log('writing boxes of pallet finished')
  }
  //console.log(boxesOfPalletJson)
  res.send({post: 'boxes of pallet'})
  res.status(200)
})

router.post('/boxes-of-pp', (req, res)=>{
  //console.log(req.body);
  boxesOfPpJson = JSON.stringify(req.body)
  fs.writeFileSync('boxes-of-pp.json', boxesOfPpJson, _finished())
  function _finished(err){
    console.log('writing boxes of pp finished')
  }
  res.send({post: 'boxes of pp'})
  res.status(200)
})

router.post('/pallets', (req, res)=>{
  //console.log(req.body);
  palletsJson = JSON.stringify(req.body);
  fs.writeFileSync('pallets.json', palletsJson, _finished())
  function _finished(err){
    console.log('writing pallets finished')
  }
  res.send({post: 'pallets'})
  res.status(200)
})

router.post('/picking-places', (req, res)=>{
  //console.log(req.body);
  pickingPlacesJson = JSON.stringify(req.body);
  fs.writeFileSync('picking-places.json', pickingPlacesJson, _finished())
  function _finished(err){
    console.log('writing picking places finished')
  }
  res.send({post: 'picking places'})
  res.status(200)
})

router.post('/node-func', (req, res)=>{
  console.log("node-func");
  res.send({post: 'node func'})
  res.status(200)

})

router.post('/send-to-plc', (req, res)=>{
  console.log("send-to-plc");
  console.log(req.body)
  connect(req.body.connection)
  res.send({post: 'send-to-plc'})
  res.status(200)

})

/*
router.post("/", (req, res) =>{
});
*/


module.exports = router;
//module.exports = aaa()
//res.send({boxes:boxJson})
