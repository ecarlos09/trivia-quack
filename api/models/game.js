const { init } = require("../initdb");
const { ObjectId } = require('mongodb'); 
const axios = require('axios')

class Questions {
    constructor(data){
        this.id = data._id
        this.questions = data.questions.results.map((result) => ({
            category: result.category,
            difficulty: result.difficulty,
            type: result.type,
            question: result.question,
            possible_answers: result.incorrect_answers.concat([result.correct_answer])
        }))
    }
}

class Game {
    constructor(data){
        this.id = data._id
        this.questions = data.questions.results
    }

        static get all(){
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                const collection = await db.collection('games')
                const games = await collection.find({})
                resolve(games.toArray());
            } catch (err) {
                reject(`Error retrieving game: ${err.message}`)
            }
        })
    }

    static findById(id){
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                const collection = await db.collection('games')
                const game = await collection.findOne({ _id: ObjectId(id) })
                resolve(game);
            } catch (err) {
                reject(`Error retrieving game: ${err.message}`)
            }
        })
    }

    static create(query){
        return new Promise (async (resolve, reject) => {
            const amount = query.amount || Math.floor(Math.random() * 22) + 3
            const category = query.category || Math.floor(Math.random() * 23) + 9
            const difficulty = query.difficulty || ['easy','medium','hard'][Math.floor(Math.random() * 3)]
            const type = query.type || ['boolean','multiple'][Math.round(Math.random())]
            try {
                const db = await init();
                const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
                console.log(url)
                let { data } = await axios.get(url)
                if (data.response_code > 0) {throw Error('no questions found, try again')}
                const newGame = db.collection('games').insertOne({questions: data})
                resolve(newGame);
            } catch (err) {
                reject(`Error creating game: ${err.message}`)
            }
        })
    }

    static addPlayers(id, player){
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                const gameToUpdate = await db.collection('games').findOne({ _id: ObjectId(id) })
                console.log(gameToUpdate)
                let players = gameToUpdate.players || []
                let newPlayers = players.concat(player)
                await db.collection('games').updateOne({ _id: ObjectId(id) },
                    {
                      $set: { players: newPlayers },
                      $currentDate: { lastModified: true }
                    }
                 )
                resolve(`inserted player:${player} for game:${id}`)
            } catch (err) {
                reject(`Error updating answers: ${err.message}`)
            }
        })
    }

    static addAnswers(id, player, answers){
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                const gameToUpdate = await db.collection('games').findOne({ _id: ObjectId(id) })
                console.log(gameToUpdate)
                let player_answers = gameToUpdate.all_answers || []
                let new_answers = player_answers.concat({player: player, answers: answers})
                await db.collection('games').updateOne({ _id: ObjectId(id) },
                    {
                      $set: { all_answers: new_answers },
                      $currentDate: { lastModified: true }
                    }
                 )
                const gameToResult = await db.collection('games').findOne({ _id: ObjectId(id) })
                const allAnswers = gameToResult.all_answers
                const results = gameToResult.questions.results
                const res = results.map((r, i) => ({
                    question: r.question,
                    all_answers: r.incorrect_answers.concat([r.correct_answer]),
                    correct_answer: r.correct_answer,
                    player_answers: allAnswers.map((p, j) => ({
                      player: p.player,
                      answer: p.answers[i],
                      correct: p.answers[i] === r.correct_answer
                    }))
                  }))
                const players = gameToResult.players

                function countScore(){
                let returnCount
                players.filter(p => p === player).forEach(player => {
                let count = 0
                res.forEach(item => {
                    item.player_answers.forEach(playerAnswer => {
                        if (playerAnswer.correct && playerAnswer.player === player) {
                    count++
                    }
                    })
                })
                returnCount = count
                })
                return returnCount
                }
                 db.collection('scores').insertOne({player: player, score: countScore()})
                resolve('inserted answers')
            } catch (err) {
                reject(`Error updating answers: ${err.message}`)
            }
        })
    }

    static getResults(id){
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                const gameToResult = await db.collection('games').findOne({ _id: ObjectId(id) })
                const allAnswers = gameToResult.all_answers
                const results = gameToResult.questions.results
                const res = results.map((r, i) => ({
                    question: r.question,
                    all_answers: r.incorrect_answers.concat([r.correct_answer]),
                    correct_answer: r.correct_answer,
                    player_answers: allAnswers.map((p, j) => ({
                      player: p.player,
                      answer: p.answers[i],
                      correct: p.answers[i] === r.correct_answer
                    }))
                  }))
                const players = gameToResult.players

                function countScore(){
                console.log(players)
                
                console.log(gameToResult);
                let scoreRes = []
                players.forEach(player => {
                let count = 0
                let resObj = {name: player}
                res.forEach(item => {
                    item.player_answers.forEach(playerAnswer => {
                        if (playerAnswer.correct && playerAnswer.player === player) {
                    count++
                    }
                    })
                })
                resObj.count = count
                scoreRes.push(resObj)
                })
                return scoreRes
                }
                const scores = countScore()
                resolve({data: res, scores: scores})
            } catch (err) {
                reject(`Error updating answers: ${err.message}`)
            }
        })
    }

    static get allScores(){
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                const collection = await db.collection('scores')
                const games = await collection.find({})
                resolve(games.toArray());
            } catch (err) {
                reject(`Error retrieving scores: ${err.message}`)
            }
        })
    }

}

module.exports = { Game, Questions};