const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 7000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vj9mo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(client);

async function run() {
    try{
        await client.connect();
        console.log('database connected');
        const database = client.db("eCourier");
        const servicesCollection = database.collection("services");

        // GET Sevices API
        app.get('/services', async(req, res) => {
            const result = await servicesCollection.find({}).toArray();
            // console.log(result);
            res.send(result);
        })

    }
    finally{
        // await client.close()
    }
};

run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})