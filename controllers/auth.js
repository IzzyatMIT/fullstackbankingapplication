const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createJWT } = require('../utils/auth');

const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

exports.signup = (req, res, next) => {
  console.log('hey, im here');
  let { name, email, password, password_confirmation } = req.body;
  let errors = [];
  if (!name) {
    errors.push({ name: 'required' });
  }
  if (!email) {
    errors.push({ email: 'required' });
  }
  if (!emailRegexp.test(email)) {
    errors.push({ email: 'invalid' });
  }
  if (!password) {
    errors.push({ password: 'required' });
  }
  if (!password_confirmation) {
    errors.push({
      password_confirmation: 'required',
    });
  }
  if (password != password_confirmation) {
    errors.push({ password: 'mismatch' });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        return res
          .status(422)
          .json({ errors: [{ user: 'email already exists' }] });
      } else {
        const user = new User({
          name: name,
          email: email,
          password: password,
          balance: 0,
        });
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            if (err) throw err;
            user.password = hash;
            user
              .save()
              .then((response) => {
                res.status(200).json({
                  success: true,
                  result: response,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  errors: [{ error: err }],
                });
              });
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ error: 'Something went wrong' }],
      });
    });
};

exports.signin = (req, res) => {
  let { email, password } = req.body;
  let errors = [];
  if (!email) {
    errors.push({ email: 'required' });
  }
  if (!emailRegexp.test(email)) {
    errors.push({ email: 'invalid email' });
  }
  if (!password) {
    errors.push({ password: 'required' });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }

  User.findOne({ email: email }, console.log('in find one'))

    .then((user) => {
      if (!user) {
        return res.status(404).json({
          errors: [{ user: 'not found' }],
        });
      } else {
        bcrypt
          .compare(password, user.password)
          .then((isMatch) => {
            if (!isMatch) {
              return res
                .status(400)
                .json({ errors: [{ password: 'incorrect' }] });
            }
            let access_token = createJWT(
              user.email,
              user._id,
              3600,
              console.log('in create JWT')
            );
            jwt.verify(
              access_token,
              process.env.TOKEN_SECRET,
              (err, decoded) => {
                if (err) {
                  res.status(500).json({ errors: err });
                }
                if (decoded) {
                  return res.status(200).json({
                    success: true,
                    token: access_token,
                    message: user,
                  });
                }
              }
            );
          })
          .catch((err) => {
            res.status(500).json({ errors: err });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ errors: err });
    });
};

exports.all = (req, res) => {
  const filter = {};
  const all = User.find(filter).then((all) => {
    res.send(all);
  });
};

exports.balance = (req, res) => {
  let { email } = req.body;
  // const options = {
  //   projection: { _id: 0}};
  const search = User.findOne({ email: email })
    .select({ balance: 1, _id: 0 })
    .then((balance) => {
      res.send(balance);
    });
};

exports.deposits = (req, res) => {
  let { email, amount } = req.body;
  const updateDoc = { $inc: { balance: +amount } };
  const search = User.findOneAndUpdate({ email: email }, updateDoc, {
    new: true,
  })
    .select({ balance: 1, _id: 0 })
    .then((newBalance) => {
      res.send(newBalance);
    });
};

exports.withdrawls = (req, res) => {
  let { email, amount } = req.body;
  const updateDoc = { $inc: { balance: -amount } };
  const search = User.findOneAndUpdate({ email: email }, updateDoc, {
    new: true,
  })
    .select({ balance: 1, _id: 0 })
    .then((newBalance) => {
      res.send(newBalance);
    });
};

exports.logout = (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/');
};

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
