let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();

const ToDo = require('../models/toDoList.schema');


router.post('/' , (req, res) => {
  let newToDo = new ToDo(req.body);

  newToDo.save().then((data) =>{
    console.log(data);
    res.sendStatus(201);
  }).catch((err)=>{
    res.sendStatus(500);
  });
  
});

router.get('/', (req, res) => {
  res.send('hi');

});

router.put('/', (req, res) => {


});

router.delete('/' , (req , res) => {


});



module.exports = router;
