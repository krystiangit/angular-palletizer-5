const express = require('express')
const router = express.Router();
//const boxJson = require('./src/assets/boxes-of-pallet.json')
//const boxesOfPalletJson = require ('../../src/assets/boxes-of-pallet.json')
//const boxesOfPpJson = require ('../../src/assets/boxes-of-pp.json')
//const pallets = require ('../../src/assets/pallets.json')

var fs = require ('fs');

var boxesOfPalletJson = fs.readFileSync('boxes-of-pallet.json')
var boxesOfPpJson = fs.readFileSync('boxes-of-pp.json')
var palletsJson = fs.readFileSync('pallets.json')
var pickingPlacesJson = fs.readFileSync('picking-places.json')
router.use(express.json())

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

router.post('/boxes-of-pallet', (req, res)=>{
  //console.log(req.body);
  boxesOfPalletJson = JSON.stringify(req.body)
  fs.writeFileSync('boxes-of-pallet.json', boxesOfPalletJson, _finished())
  function _finished(err){
    console.log('writing finished')
  }

  console.log(boxesOfPalletJson)
  res.send(boxesOfPalletJson)
  res.status(200)

})

router.post('/boxes-of-pp', (req, res)=>{
  //console.log(req.body);
  boxesOfPpJson = JSON.stringify(req.body)
  fs.writeFileSync('boxes-of-pp.json', boxesOfPpJson, _finished())
  function _finished(err){
    console.log('writing finished')
  }
  res.send({post: 'boxes of pp'})
  res.status(200)

})

router.post('/pallets', (req, res)=>{
  console.log(req.body);
  palletsJson = JSON.stringify(req.body);
  fs.writeFileSync('pallets.json', palletsJson, _finished())
  function _finished(err){
    console.log('writing finished')
  }
  res.send({post: 'pallets'})
  res.status(200)

})

router.post('/picking-places', (req, res)=>{
  console.log(req.body);
  pickingPlacesJson = JSON.stringify(req.body);
  fs.writeFileSync('picking-places.json', pickingPlacesJson, _finished())
  function _finished(err){
    console.log('writing finished')
  }
  res.send({post: 'picking places'})
  res.status(200)

})

router.post("/", (req, res) =>{
});

function aaa(){
  return {aa:1, bb:2}
}

module.exports = router;
//module.exports = aaa()
//res.send({boxes:boxJson})
