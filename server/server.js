let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

let app = express();
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({
  extended : true
}));
app.use(bodyParser.json());

let PORT = process.env.PORT || 4000;

let db = process.env.MONGODB_URI || 'mongodb://localhost:27017/toDoDatabase';

mongoose.connect(db, { useNewUrlParser : true });
mongoose.connection.on('connected', ()=>{
  console.log('mongo connection successful');
});
mongoose.connection.on('error', (err)=>{
  console.log(`mongoose connection error ${err}`);
});

let toDoRouter = require('./routes/toDo.route.js');


app.use('/todo', toDoRouter);


app.listen(PORT , ()=> {
  console.log(`app listening on port ${PORT}`);
});
