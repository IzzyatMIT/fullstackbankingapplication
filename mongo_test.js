const MongoClient = require('mongodb').MongoClient;
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db) {
        _db = db.db('users');
        console.log('Successfully connected to MongoDB.');
      }
      return callback(err);
    });
  },

  getDb: function () {
    return _db;
  },
};

// MongoClient.connect(Db, { useUnifiedTopology: true }, function (err, client) {
//   console.log('Connected!');

//   //database name
//   const dbName = 'myproject';
//   const db = client.db(dbName);

//   //new user
//   let name = 'user' + Math.floor(Math.random() * 10000);
//   let email = name + '@mit.edu';

//   //insert into customer table
//   const collection = db.collection('customers');
//   let doc = { name, email };
//   collection.instertOne(doc, { w: 1 }, function (err, result) {
//     console.log('Document insert');
//   });
// });
