const request = require('supertest');
const fs = require("fs");
const { MongoClient, ObjectId } = require('mongodb')
const { init } = require('../../initdb.js')
const app = require('../../server.js');
const connectionUrl = process.env.DB_CONNECTION;
const dbName = process.env.DB_NAME

const resetTestDB = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await init();
      await db.collection('games').removeMany({})
      await db.collection('games').insertOne({
        _id: ObjectId("6088064e9a068b002cf601b3"),
        questions: {
          response_code: 0,
          results: [
            {
              category: "Entertainment: Music",
              type: "multiple",
              difficulty: "easy",
              question: "Whose signature guitar technique is called the &quot;windmill&quot;?",
              correct_answer: "Pete Townshend",
              incorrect_answers: [
                "Jimmy Page",
                "Eddie Van Halen",
                "Jimi Hendrix"
              ]
            },
            {
              category: "Entertainment: Music",
              type: "multiple",
              difficulty: "easy",
              question: "Which member of the Foo Fighters was previously the drummer for Nirvana?",
              correct_answer: "Dave Grohl",
              incorrect_answers: [
                "Taylor Hawkins",
                "Nate Mendel",
                "Chris Shiflett"
              ]
            },
            {
              category: "Entertainment: Music",
              type: "multiple",
              difficulty: "easy",
              question: "Which group performs the song &quot;Crash into Me&quot;?",
              correct_answer: "Dave Matthews Band",
              incorrect_answers: [
                "Phish",
                "The Grateful Dead",
                "Destiny&#039;s Child"
              ]
            }
          ]
        }
      });
      resolve("Test DB reset");
    } catch (err) {
      reject(`Test DB could not be reset: ${err} in ${err.file}`);
    }
  });
};

global.request = request;
global.app = app;
global.resetTestDB = resetTestDB;
global.port = process.env.PORT || 5000;