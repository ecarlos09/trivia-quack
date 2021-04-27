const request = require('supertest');
const fs = require("fs");
const { MongoClient } = require('mongodb')
const app = require('../../server.js');
const connectionUrl = process.env.DB_CONNECTION;
const dbName = process.env.DB_NAME
const testSeed = fs.readFileSync(__dirname + '/test_seeds.js').toString();

const resetTestDB = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let db = await MongoClient.connect(connectionUrl);
      console.log("connected to database!", dbName);
      console.log(db)
      await db.collection('games').insertMany([
        {greeting: 'hello'}
    ]);
      resolve(client + "Test DB reset");
    } catch (err) {
      reject(`Test DB could not be reset: ${err} in ${err.file}`);
    }
  });
};

global.request = request;
global.app = app;
global.resetTestDB = resetTestDB;
global.port = process.env.PORT || 5000;