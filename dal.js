// // const { ObjectId } = require('mongodb');
// const { default: mongoose } = require('mongoose');

// // const MongoClient = require('mongodb').MongoClient;
// const url = process.env.ATLAS_URI;
// // const urlv2 = process.env.FIX_MONGO;
// // let db = null;

// // MongoClient.connect(
// //   urlv2,
// //   { useNewUrlParser: true, useUnifiedTopology: true },
// //   function (err, client) {
// //     console.log('Connection established.');

// //   let db = client.db('myproject');
// //   }
// // );

// //db
// mongoose.connect( url, {
//   useNewUrlParser: true,
//   //   useCreateIndex: true,
//   useUnifiedTopology: true,
// }).then(() => console.log('DB Connected'));;

// // Create user account
// function create(name, mongoemail, password) {
//   return new Promise((resolve, reject) => {
//     const collection = db.collection('users');
//     const doc = { name, mongoemail, password, balance: 0 };
//     collection.insertOne(doc, { w: 1 }, function (err, result) {
//       err ? reject(err) : resolve(doc);
//     });
//   });
// }

// // // search for user
// // function check(useremail) {
// //   return new Promise((resolve, reject) => {
// //     const customers = db
// //       .collection('users')
// //       .find({ email: useremail })
// //       if (customers.count() >0)
// //       .count() > 0,
// //       function (err, docs) {
// //           err ? reject(err) : resolve(customers);
// //       })

// // }

// // All users
// function all() {
//   return new Promise((resolve, reject) => {
    
//     const customers = db
//       .collection('users')
//       .find({})
//       .toArray(function (err, docs) {
//         err ? reject(err) : resolve(docs);
//       });
//   });
// }

// // check account balance
// function balance(mongoid) {
//   return new Promise((resolve, reject) => {
//     const collection = db.collection('users');
//     const options = {
//       projection: { _id: 0, balance: 1 },
//     };
//     collection.findOne(
//       { _id: ObjectId(mongoid) },
//       { options },
//       function (err, result) {
//         err ? reject(err) : resolve(result);
//       }
//     );
//   });
// }

// // make a deposit
// function deposit(mongoid, amount) {
//   return new Promise((resolve, reject) => {
//     const collection = db.collection('users');
//     const filter = { _id: ObjectId(mongoid) };
//     const updateDoc = { $inc: { balance: +amount } };
//     collection.updateOne(filter, updateDoc, function (err, result) {
//       err ? reject(err) : resolve(result);
//     });
//   });
// }

// // make a withdrawl
// function withdraw(mongoid, amount) {
//   return new Promise((resolve, reject) => {
//     const collection = db.collection('users');
//     const filter = { _id: ObjectId(mongoid) };
//     const updateDoc = { $inc: { balance: -amount } };
//     collection.updateOne(filter, updateDoc, function (err, result) {
//       err ? reject(err) : resolve(result);
//     });
//   });
// }

// // login to account
// function login(mongoemail, mongopassword) {
//   return new Promise((resolve, reject) => {
//     const collection = db.collection('users');
//     const filter = { email: mongoemail, password: mongopassword };
//     collection.findOne(filter).then((result) => console.log(result));
//   });
// }

// module.exports = { create, all, balance, deposit, withdraw };
