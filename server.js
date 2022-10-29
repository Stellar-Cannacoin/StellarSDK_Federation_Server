const express = require('express')
const cors = require('cors');
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';

const app = express();
const port = 9008;
const client = new MongoClient(url);
const dbName = 'federation';

app.use(cors());

app.get('/federation', async function (req, res, next) {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('federation');
  
    const tdbResult = await collection.find({ $or: [ { account_id: req.query.q }, { stellar_address: req.query.q }, { lobstr_address: req.query.q } ] }).limit(1).toArray();
    const federationResponse = tdbResult[0]
  
    if (!federationResponse) {
      return res.status(200).json({"error":"Not found"})
    }
  
    return res.status(200).json({ 
      "stellar_address": federationResponse.stellar_address,
      "lobstr_address": federationResponse.lobstr_address,
      "account_id": federationResponse.account_id,
      "memo_type": "id"
    })
})
  
app.post('/federation', async function (req, res, next) {
    req.body.created_at = new Date();
  
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('federation');
    const tdbResult = await collection.insertOne(req.body);
  
    if (!tdbResult.insertedId) {
      return res.status(200).json({ 
        "error": "Failed to create domain",
      })
    }
  
    return res.status(200).json({ 
      "status": "success",
      "stellar_account": req.body.stellar_account,
      "lobstr_account": req.body.lobstr_account,
      "account_id": req.body.account_id,
      "message": "Federation domain name created",
      "memo_type": "id"
    })
})

app.listen(port, () => {
  console.log(`Stellar Federation server running on port ${port}`)
})