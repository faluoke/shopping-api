const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const dbName = "grocery-db";
const collectionName = "products";
const mongoDBUrl = process.env.MONGODB_URL;
let database;

option = { useUnifiedTopology: true };

const Connect = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(mongoDBUrl, option, (err, client) => {
      if (err) {
        reject(err);
      } else {
        console.log("CONNECTED TO DATABASE");
        database = client.db(dbName);
        resolve();
      }
    });
  });
};

const Insert = product => {
  return new Promise((resolve, reject) => {
    const dbCollection = database.collection(collectionName);

    dbCollection.insertOne(product, (err, res) => {
      if (err) {
        reject(err);
      } else {
        console.log("SUCCESSFULLY ADDED NEW DOCUMENT");
        resolve(res);
      }
    });
  });
};

const Find = product => {
  let query = {};

  if (product) {
    query = product;
  }

  return new Promise((resolve, reject) => {
    const dbCollection = database.collection(collectionName);

    dbCollection.find(query).toArray((err, result) => {
      if (err) {
        reject(err);
      } else {
        console.log(result);
        resolve(result);
      }
    });
  });
};

const Update = (product, updatedProduct) => {
  return new Promise((resolve, reject) => {
    const dbCollection = database.collection(collectionName);

    dbCollection.updateOne(product, updatedProduct, (err, res) => {
      if (err) {
        reject(err);
      } else {
        console.log("SUCCESSFULLY UPDATED A PRODUCT");
        resolve(res);
      }
    });
  });
};

const Delete = product => {
  return new Promise((resolve, reject) => {
    const dbCollection = database.collection(collectionName);

    dbCollection.deleteOne(product, (err, res) => {
      if (err) {
        reject(err);
      } else {
        console.log("SUCCESSFULLY DELETED A PRODUCT");
        resolve(res);
      }
    });
  });
};

// const promise = Connect();

// promise
//   .then(() => {
//     console.log("Promise is done");
//     const product = {
//       _id: ObjectId("5dd5f07953b897516cf27bdd")
//     };
//     const updatedProduct = {
//       $set: {
//         name: "Motor Oil",
//         price: 10.99
//       }
//     };

//     // Insert(product)
//     //   .then(res => {
//     //     console.log(`Inserted ${product.name}`);
//     //   })
//     //   .catch(err => {});

//     // Find(product)
//     //   .then(res => {})
//     //   .catch(err => {
//     //     console.log(err);
//     //   });

//     // Update(product, updatedProduct)
//     //   .then(res => {
//     //     console.log(`Updated ${product.name} to ${updatedProduct.$set.name}`);
//     //   })
//     //   .catch(err => {
//     //     console.log(err);
//     //   });

//     // Delete(product)
//     //   .then(res => {
//     //     console.log(`Deleted ${product.name}`);
//     //   })
//     //   .catch(err => {
//     //     console.log(err);
//     //   });
//   })
//   .catch(err => {
//     console.log(err);
//   });

module.exports = { Connect, Insert, Find, Update, Delete };
