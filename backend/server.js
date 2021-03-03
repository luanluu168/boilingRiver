require('dotenv').config();
const      express = require('express');

const         path = require('path');
const cookieParser = require('cookie-parser');
const      session = require('express-session');

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
}));

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
    if (process.env.NODE_ENV === "production") {
      res.sendFile(path.join(__dirname, '/../frontend/build/index.html'));
      return;
    }
      
    res.sendFile(path.join(__dirname, '/../frontend/public/index.html'));
});

app.listen(PORT, () => console.log(`Server is listening on Port ${PORT}`));