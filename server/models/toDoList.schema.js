let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let toDoListSchema = new Schema({
  dateCreated : {
    type : Date,
    default : Date.now
  },
  category : {
    type : String,
    required : true,
    default : 'Miscellaneous'
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
  },
  status : {
    type : Boolean,
    default : false
  },
  color : {
    type : String
  }
});


module.exports = mongoose.model('ToDo' , toDoListSchema);
