require('dotenv').config({ path: '../config.env' });
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const {
  signup,
  signin,
  all,
  balance,
  deposits,
  withdrawls,
  logout,
} = require('../controllers/auth');
// const dal = require('../dal');

router.post('/signup', signup);
router.post('/signin', signin);

router.get('/logout', logout);
router.get('/all', all);
router.post('/balance', authenticateToken, balance);
router.post('/deposits', authenticateToken, deposits);
router.post('/withdrawls', authenticateToken, withdrawls);

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  console.log(authHeader);
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = router;

// all accounts
// router.get('/account/all', function (req, res) {
//     dal.all().then((docs) => {
//       console.log(docs);
//       res.send(docs);
//     });
//   });

//   // All users
// function all() {
//     return new Promise((resolve, reject) => {

//       const customers = db
//         .collection('users')
//         .find({})
//         .toArray(function (err, docs) {
//           err ? reject(err) : resolve(docs);
//         });
//     });
//   }

//   // check account balance
//   function balance(mongoid) {
//     return new Promise((resolve, reject) => {
//       const collection = db.collection('users');
//       const options = {
//         projection: { _id: 0, balance: 1 },
//       };
//       collection.findOne(
//         { _id: ObjectId(mongoid) },
//         { options },
//         function (err, result) {
//           err ? reject(err) : resolve(result);
//         }
//       );
//     });
//   }

//   // make a deposit
//   function deposit(mongoid, amount) {
//     return new Promise((resolve, reject) => {
//       const collection = db.collection('users');
//       const filter = { _id: ObjectId(mongoid) };
//       const updateDoc = { $inc: { balance: +amount } };
//       collection.updateOne(filter, updateDoc, function (err, result) {
//         err ? reject(err) : resolve(result);
//       });
//     });
//   }

//   // make a withdrawl
//   function withdraw(mongoid, amount) {
//     return new Promise((resolve, reject) => {
//       const collection = db.collection('users');
//       const filter = { _id: ObjectId(mongoid) };
//       const updateDoc = { $inc: { balance: -amount } };
//       collection.updateOne(filter, updateDoc, function (err, result) {
//         err ? reject(err) : resolve(result);
//       });
//     });
//   }

//   // login to account
//   function login(mongoemail, mongopassword) {
//     return new Promise((resolve, reject) => {
//       const collection = db.collection('users');
//       const filter = { email: mongoemail, password: mongopassword };
//       collection.findOne(filter).then((result) => console.log(result));
//     });
//   }
