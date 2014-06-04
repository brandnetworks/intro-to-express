var express, app, morgan, router, funRouter;

express = require('express');
app = express();
morgan = require('morgan');

// Middleware
app.use('/', morgan('dev'));
app.use(function (req, res, next) {
  console.log('1');
  //if (userHasValidSession) next();
  //else res.json(500, { msg: 'go away!' });
  //someAsync().then(next)
  next();
});
app.use(function (req, res, next) {
  // req.user = db.find({userid: req.query['userId']});
  req.random = 7;
  next();
});

// Configuration
app.set('hitext', 'hello world!');

// Simple Routing
app.get('/', function(req, res) {
  console.log('2');
  res.send(app.get('hitext') + req.random);
});

// Complex Routing
router = express.Router();
router.get('/', function (req, res) {
  res.send('this is a router');
});
router.get('/testing', function (req, res) {
  res.json({ msg: 'router testing' });
});

funRouter = express.Router();
// funRouter.param('fun', function (req, res, next, fun) {
//   req.fun = fun;
//   next();
// });
funRouter.get('/:fun', function (req, res) {
  res.send('this is ' + req.params.fun);
});
router.use('/fun', funRouter);


app.use('/routing', router);

app.use(function errorHandler (err, req, res, next) {
  console.error(err);
  res.json(500, { error: err });
})

// Start the server
app.listen(3000, function (err) {
  if (err) {
    console.error('nope');
  }
  else {
    console.log('started');
  }
});
