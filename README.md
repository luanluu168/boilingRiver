# Boiling River

- A place to shop beautiful clothing

## [Click to Visit!](https://boiling-river-76816.herokuapp.com/)

## Frontend: React, Redux, ...
## Backend: Express, ...
## Payment: Stripe

## Requrements

- Node & npm or yarn
- Postgres Server

## Project Overview:
```
├── backend
|    ├── db.js
|    ├── index.js
│    └── prodDb.js
├── routes
|    ├── app
│    │      └── index.js
|    ├── auth
│    │      └── index.js
|    ├── manageProducts
│    │      └── index.js
|    ├── orders
│    │      └── index.js
|    ├── payment
│    │      ├── index.js
│    │      └── stripe.js
|    ├── products
│    │      └── index.js
|    ├── receipt
│    │      └── index.js
|    ├── review
│    │      └── index.js
|    └── search
│           └── index.js
├── utils
│    └── utils.js
├── server.js
├── frontend
│    ├── public
│    |      ├── javascripts
|    |      |        └── javascripts.js
│    |      ├── media
|    |      |        ├── allweatherMJacket.jpg
|    |      |        ├── logo.png
|    |      |        ├── noavatar.png
|    |      |        ├── sample.jpg
|    |      |        ├── skinnyWJean.jpg
|    |      |        └── slwHoodie.jpg
│    |      ├── vendor
|    |      |        ├── fontawesome-free-5.13.0-web
|    |      |        ├── bootstrap.min.css
|    |      |        ├── bootstrap.min.js
|    |      |        ├── jquery-3.3.1.slim.min.js
|    |      |        └── jquery.validate.min.js
|    |      └── index.html
│    ├── src
│    |      ├── actions
|    |      |        ├── cartActions.js
|    |      |        ├── index.js
|    |      |        ├── orderActions.js
|    |      |        ├── paymentActions.js
|    |      |        ├── productActions.js
|    |      |        ├── productDetailActions.js
|    |      |        ├── receiptActions.js
|    |      |        ├── searchActions.js
|    |      |        └── userActions.js
│    |      ├── actionTypes
|    |      |        └── index.js
│    |      ├── components
|    |      |        ├── checkoutSteps
|    |      |        |      └── checkoutSteps.js
|    |      |        ├── footer
|    |      |        |      └── footer.js
|    |      |        ├── infiniteScroll
|    |      |        |      └── infiniteScroll.js
|    |      |        ├── nav
|    |      |        |      └── nav.js
|    |      |        ├── pages
|    |      |        |      ├── error.js
|    |      |        |      ├── landing.js
|    |      |        |      ├── manageProducts.js
|    |      |        |      ├── paymentPage.js
|    |      |        |      ├── productDetail.js
|    |      |        |      ├── readOnlyReview.js
|    |      |        |      ├── receipt.js
|    |      |        |      ├── review.js
|    |      |        |      ├── signin.js
|    |      |        |      └── signup.js
|    |      |        ├── passwordStatusField
|    |      |        |      └── passwordStatusField.js
|    |      |        ├── payment
|    |      |        |      ├── billingDetailFields.js
|    |      |        |      ├── cardElement.js
|    |      |        |      ├── checkoutForm.js
|    |      |        |      └── submitButton.js
|    |      |        ├── product
|    |      |        |      └── product.js
|    |      |        ├── rating
|    |      |        |      └── rating.js
|    |      |        ├── reviewStar
|    |      |        |      └── reviewStar.js
|    |      |        ├── search
|    |      |        |      └── search.js
|    |      |        └── sidebar
|    |      |        |      └── sidebar.js
|    |      ├── containers
|    |      |        ├── cart.js
|    |      |        ├── order.js
|    |      |        ├── productDetail.js
|    |      |        ├── productList.js
|    |      ├── reducers
|    |      |        ├── cardReducer.js
|    |      |        ├── index.js
|    |      |        ├── orderReducer.js
|    |      |        ├── paymentReducer.js
|    |      |        ├── productDetailReducer.js
|    |      |        ├── productReducer.js
|    |      |        ├── receiptReducer.js
|    |      |        ├── searchReducer.js
|    |      |        └── userReducer.js
|    |      └── store
|    |               └── store.js
│    ├── App.css
│    ├── App.js
│    ├── index.css
│    ├── index.js
│    ├── .gitignore
│    ├── package.json
│    ├── README.md
│    └── webpack.config.js
├── .babelrc
├── .gitignore
├── package.json
├── Procfile
└── README.md
```
