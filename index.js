const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid/v4");
const cors = require("cors");
const fs = require("fs");
const DAL = require("./dataAccessLayer");
const ObjectId = require("mongodb").ObjectID;
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

DAL.Connect();

// const products = require("./products.json");

app.get("/api/products", cors(), async (req, res) => {
  // const result = Object.values(products);
  const result = await DAL.Find();
  res.send(result);
});

//get single item
app.get("/api/products/:id", cors(), async (req, res) => {
  const id = req.params.id;
  const product = {
    _id: ObjectId(id)
  };
  const result = await DAL.Find(product);
  if (result) {
    res.send(result);
  } else {
    res.send("No product with such Id found");
  }
});

app.post("/api/products", cors(), async (req, res) => {
  const product = req.body;
  const result = await DAL.Insert(product);

  res.send(result);
});

app.put("/api/products/:id", async (req, res) => {
  const id = req.params.id;
  const newProduct = req.body;
  const product = {
    _id: ObjectId(id)
  };

  const result = await DAL.Update(product, { $set: newProduct });

  if (result) {
    res.send(result);
  } else {
    res.send("new product is missing required params");
  }
});

app.delete("/api/products/:id", async (req, res) => {
  const id = req.params.id;
  const product = {
    _id: ObjectId(id)
  };
  const productName = req.body.name;
  const result = await DAL.Delete(product);
  res.send(result);
});

app.listen(port, () => console.log(`Example app on port ${port}`));
