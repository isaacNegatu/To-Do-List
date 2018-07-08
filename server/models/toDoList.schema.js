let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let toDoListSchema = new Schema({
  dateCreated : {
    type : Date,
    default : Date.now
  },
  catagory : {
    type : String,
    required : true,
    default : 'miscellaneous'
  },
  name : {
    type : String,
    required : true
  },
  dueDate : {
    type : Date
  },
  description : {
    type : String
  },
  priority : {           
    type : String,
    required : true
  }
});


module.exports = mongoose.model('ToDo' , toDoListSchema);
