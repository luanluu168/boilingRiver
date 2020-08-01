require('dotenv').config();
const  createError = require('http-errors');
const      express = require('express');

const         path = require('path');
const cookieParser = require('cookie-parser');
const      session = require('express-session');

//TODO: use redis to store session
// const        redis = require('redis');
// const  redisClient = redis.createClient();
// const   RedisStore = require('connect-redis')(session);

const           appRouter = require('./routes/app/index.js');
const          authRouter = require('./routes/auth/index.js');
const      productsRouter = require('./routes/products/index.js');
const        searchRouter = require('./routes/search/index.js');
const manageProductRouter = require('./routes/manageProducts/index.js');
const         orderRouter = require('./routes/orders/index.js');
const       receiptRouter = require('./routes/receipt/index.js');
const        reviewRouter = require('./routes/review/index.js');
const        stripeRouter = require('./routes/payment/index.js');

const PORT = process.env.PORT || 4000;
const  app = express();
  

app.use(express.json());
app.use(express.static(path.join(__dirname, '/../frontend/build')));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 2 * 60 * 60 * 1000 // 2 hours
    }
    // store: new RedisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 86400 }),
}));


// redisClient.on('error', (err) => {
//     console.log('Redis error: ', err);
// });

// routes
app.use('/api', appRouter);
app.use('/Auth', authRouter);
app.use('/search', searchRouter);
app.use('/Products', productsRouter);
app.use('/ManageProducts', manageProductRouter);
app.use('/orders', orderRouter);
app.use('/Receipt', receiptRouter);
app.use('/Review', reviewRouter);
app.use('/stripe', stripeRouter);

app.get("*", (req, res) => {
    // res.status(404).redirect("/Error");
    // res.status(404).json({msg: "Error: page not found"});
    res.sendFile(path.join(__dirname, '/../frontend/build/index.html'));
});

app.use(function (req, res, next) {
    next(createError(404))
});

app.use(function (err, req, res, next) {
    let error;
    switch (err.status) {
      case 404:
        error = {
          status: 404,
          text: '404 File Not Found',
        }
        break
      default:
        error = {
          status: 500,
          text: '500 Internal Server Error',
        }
    }
  
    res.status(error.status);
    res.render('error', { title: error.status + ' Error', error });
})

app.listen(PORT, () => console.log(`Server is listening on Port ${PORT}`));