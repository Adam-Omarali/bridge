let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors');
let fs = require('fs');


let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let authRouter = require('./routes/auth');
let policyRouter = require('./routes/policy')
let termsRouter = require('./routes/terms')
let changesRouter = require('./routes/changes')

const app = express();

// create the stream

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/policy', policyRouter);
app.use('/terms', termsRouter);
app.use('/changes', changesRouter);

app.listen(3005, () => {
  console.log(`Running on port 3005`);
})

module.exports = app;
