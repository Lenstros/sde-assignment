const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const mongoDB = require('./libs/database');

const app = express();

const user = require('./routes/userRoutes');

app.options('*', cors());
// public folder
app.use(express.static('public'));
// view engine setup
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to Database
mongoDB.connectDB();

app.use('/api/user', user);

app.get('/', (req, res) => {
  res.render('index');
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(errorHandler);

// start the server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log('Listening on port %s', server.address().port);
});
