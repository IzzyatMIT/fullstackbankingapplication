require('dotenv').config({ path: './config.env' });
const express = require('express');
const app = express();
const cors = require('cors');
const url = process.env.ATLAS_URI;
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;

const { default: mongoose } = require('mongoose');





//db
mongoose.connect( url, {
  useNewUrlParser: true,
  //   useCreateIndex: true,
  useUnifiedTopology: true,
}).then(() => console.log('DB Connected'));;

//import secure routes
const authRoutes = require('./routes/auth');
const { db } = require('./models/User');

// used to serve static files from public directory
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

// secure routes middleware
app.use('/api', authRoutes);

// // create user account
// app.get('/account/create/:name/:email/:password', function (req, res) {
//   dal
//     .create(req.params.name, req.params.email, req.params.password)
//     .then((user) => {
//       console.log(user);
//       res.send(user);
//     });
// });

// login user
// app.get('/account/login/:email/:password', function (req, res) {
//   dal.login(req.params.email, req.params.password);
// });

// // Deposit to account
// app.get('/account/deposit/:mongoid/:amount', function (req, res) {
//   dal.deposit(req.params.mongoid, req.params.amount).then((account) => {
//     console.log(account);
//     res.send(account);
//   });
// });

// // Withdraw from account
// app.get('/account/withdraw/:mongoid/:amount', function (req, res) {
//   dal.withdraw(req.params.mongoid, req.params.amount).then((account) => {
//     console.log(account);
//     if (account.modifiedCount === 1) {
//       res.send(
//         'Successfully withdrew $' + req.params.amount + ' from account!'
//       );
//     } else {
//       res.send('Something went wrong, please try your transaction again.');
//     }
//   });
// });

// // Check account balance
// app.get('/account/balance/:mongoid', function (req, res) {
//   dal.balance(req.params.mongoid).then((account) => {
//     console.log(account.balance);
//     res.send(account);
//   });
// });

// // all accounts
// app.get('/account/all', function (req, res) {
//   dal.all().then((docs) => {
//     console.log(docs);
//     res.send(docs);
//   });
// });

app.listen(port);
console.log(`Running on port ${port}`);
