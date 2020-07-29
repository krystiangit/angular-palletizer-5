const express = require('express')
const router = express.Router();
//const boxJson = require('./src/assets/boxes-of-pallet.json')
const boxesOfPalletJson = require ('../../src/assets/boxes-of-pallet.json')
const boxesOfPpJson = require ('../../src/assets/boxes-of-pp.json')


router.get('/boxes-of-pallet',(req, res)=>{
  //res.send({boxes:boxesJson})

  //res.send({aa:1, bb:2})
  res.send(boxesOfPalletJson)
  res.status(200)
})

router.get('/boxes-of-pp',(req, res)=>{
  //res.send({boxes:boxesJson})

  //res.send({aa:1, bb:2})
  res.send(boxesOfPpJson)
  res.status(200)
})


router.post("/", (req, res) =>{
});


module.exports = router;
//res.send({boxes:boxJson})
