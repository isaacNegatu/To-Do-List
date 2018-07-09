let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();

const ToDo = require('../models/toDoList.schema');


router.post('/' , (req, res) => {
  switch (req.body.priority){
    case 'Critical': req.body.color = 'red'; break;
    case 'Important': req.body.color = 'orange'; break;
    case 'Normal' : req.body.color = 'yellow'; break;
    case 'Low' : req.body.color = 'brown'; break;
  }
  let newToDo = new ToDo(req.body);

  newToDo.save().then((data) =>{
    console.log(data);
    res.sendStatus(201);
  }).catch((err)=>{
    res.sendStatus(500);
  });

});

router.get('/', (req, res) => {
  ToDo.find({}).then((data)=>{
    // console.log(data);
    res.send(data);
  }).catch((err)=>{
    console.log(err);
  });
});

router.put('/:id', (req, res) => {
  let id = req.params.id;
  let data = req.body;

  console.log(id);
  console.log(data);
  // console.log('got to edit' + data.status);
  ToDo.findByIdAndUpdate({
    _id: id
  }, data , {
    new: true
  }).then((data) => {
    console.log(data);
    res.sendStatus(201);
  }).catch((err) => {
    console.log(err);
    res.sendStatus(500);
  });

});

router.delete('/:id' , (req , res) => {
  let id = req.params.id;

  ToDo.findByIdAndRemove({
    _id: id
  }).then((data) => {
    console.log(data);
    res.sendStatus(201);
  }).catch((err) => {
    res.sendStatus(500);
  });

});



module.exports = router;
