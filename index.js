const express = require("express");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 7000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vj9mo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// console.log(client);

async function run() {
  try {
    await client.connect();
    console.log("database connected");
    const database = client.db("eCourier");
    const servicesCollection = database.collection("services");
    const ordersCollection = database.collection("orders");

    // GET Sevices API
    app.get("/services", async (req, res) => {
      const result = await servicesCollection.find({}).toArray();
      // console.log(result);
      res.send(result);
    });

    // POST Services API
    app.post("/addServices", async (req, res) => {
      const result = await servicesCollection.insertOne(req.body);
      res.send(result);
    });

    // GET Order API
    app.get("/orderscollection", async (req, res) => {
      const result = await ordersCollection.find({}).toArray();
      // console.log(result);
      res.send(result);
    });

    // delete order collection
    app.delete("/deleteorder/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      console.log(ordersCollection);
      // const result = await ordersCollection.deleteOne({_id: ObjectId(req.params.id)});
      // console.log(result);
      // res.send(result);
    });

    // GET Email API
    app.get("/myorders/:email", async (req, res) => {
      const result = await ordersCollection
        .find({ email: req.params.email })
        .toArray();
      res.send(result);
    });
    // // delete
    // app.delete('deletemyorder/:id', (req, res) => {
    //   const id = req.params.id;
    //   const result = await ordersCollection.deleteOne({_id: ObjectId(id)});
    //   console.log(result);
    //   res.send(result);
    // })

    // POST Order
    app.post("/orders", async (req, res) => {
      const result = await ordersCollection.insertOne(req.body);
      console.log(result);
      res.send(result);
    });
  } finally {
    // await client.close()
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World! I m here...");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
