const { init } = require("../initdb");
const { ObjectId } = require('mongodb'); 
const axios = require('axios')

function countPoints(score, difficulty, type) {
    let difM
    let typeM
    switch (difficulty) {
        case 'medium':
            difM = 2
            break;
        case 'hard':
            difM = 3
            break;
        default:
            difM = 1
            break;
    }
    switch (type) {
        case 'boolean':
            typeM = 1
            break;
        default:
            typeM = 2
            break;
    }
    return score * difM * typeM *  100 
}   

class Questions {
    constructor(data){
        this.id = data._id
        this.questions = data.questions.results.map((result) => ({
            category: result.category,
            difficulty: result.difficulty,
            type: result.type,
            question: result.question,
            possible_answers: result.incorrect_answers.concat([result.correct_answer]).sort(() => Math.random() - 0.5)
        }))
    }
}

class Game {
  constructor(data) {
    this.id = data._id;
    this.questions = data.questions.results;
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await init();
        const collection = await db.collection("games");
        const games = await collection.find({});
        resolve(games.toArray());
      } catch (err) {
        reject(`Error retrieving game: ${err.message}`);
      }
    });
  }

  static findById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await init();
        const collection = await db.collection("games");
        const game = await collection.findOne({ _id: ObjectId(id) });
        resolve(game);
      } catch (err) {
        reject(`Error retrieving game: ${err.message}`);
      }
    });
  }

  static create(query) {
    return new Promise(async (resolve, reject) => {
      const amount = query.amount || Math.floor(Math.random() * 22) + 3;
      const category = query.category || Math.floor(Math.random() * 23) + 9;
      const difficulty =
        query.difficulty ||
        ["easy", "medium", "hard"][Math.floor(Math.random() * 3)];
      const type =
        query.type || ["boolean", "multiple"][Math.round(Math.random())];
      try {
        const db = await init();
        const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
        console.log(url);
        let { data } = await axios.get(url);
        if (data.response_code > 0) {
          throw Error("no questions found, try again");
        }
        const newGame = db.collection("games").insertOne({ questions: data });
        resolve(newGame);
      } catch (err) {
        reject(`Error creating game: ${err.message}`);
      }
    });
  }

  static addAnswers(id, player, answers) {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await init();
        const gameToUpdate = await db
          .collection("games")
          .findOne({ _id: ObjectId(id) });
        const allAnswers = gameToUpdate.all_answers;
        const results = gameToUpdate.questions.results;
        const res = results.map((r, i) => ({
          question: r.question,
          all_answers: r.incorrect_answers.concat([r.correct_answer]),
          correct_answer: r.correct_answer,
          player_answer: answers[i],
          player_correct: answers[i] === r.correct_answer,
        }));
        const count = res.filter((r) => r.player_correct === true).length;
        const points = countPoints(
          count,
          results[0].difficulty,
          results[0].type
        );
        db.collection("scores").insertOne({
          gameId: gameToUpdate._id,
          count,
          points,
          player,
          answers: res,
        });
      } catch (err) {
        reject(`Could not add answers: ${err.message}`);
      }
    });
  }

  static getResults(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await init();
        const game = await db.collection("games").findOne({ _id: ObjectId(id) });
        const scores = await db.collection("scores").find({ gameId: ObjectId(id) }).toArray();
        let questions = scores[0].answers.map((q) => q.question);
        const answers = questions.map((q, i) =>
        scores.map((y) => {
            const item = y.answers[i];
            return {
              answer: item.player_answer,
              correct: item.player_correct,
              player: y.player,
            };
          })
        );

        const data = game.questions.results.map((g, i) => {
          return {
            question: g.question,
            correct_answer: g.correct_answer,
            all_answers: g.incorrect_answers.concat([g.correct_answer]),
            player_answers: answers[i],
          };
        });
        const scoresToSend = scores.map(s => ({name: s.player, count: s.count, points: s.points}))
        resolve({data: data, scores: scoresToSend});
      } catch (err) {
        reject(`Error getting results: ${err.message}`);
      }
    });
  }

  static get allScores() {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await init();
        const collection = await db.collection("scores");
        const data = (await collection.find({}).toArray()).map((r) => ({
          player: r.player,
          count: r.count,
          points: r.points,
        }));
        resolve(data);
      } catch (err) {
        reject(`Error retrieving scores: ${err.message}`);
      }
    });
  }
}

module.exports = { Game, Questions};