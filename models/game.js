const { init } = require("../initdb");
const { ObjectId } = require('mongodb'); 
const axios = require('axios')

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

class Questions {
    constructor(data){
        this.id = data._id
        this.questions = data.questions.results.map((result) => ({
            category: result.category,
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
                const dbData = await db.collection('games').find({}).toArray()
                const games = dbData.map(g => ({id: g._id}))
                if (!games.length) { throw new Error('No games found')}
                resolve(games);
            } catch (err) {
                reject(`Error retrieving games: ${err.message}`)
            }
        })
    }

    static findById(id){
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                const collection = await db.collection('games')
                const game = await collection.findOne({ _id: ObjectId(id) })
                console.log(game)
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
                let { data } = await axios.get(url)
                const newGame = db.collection('games').insertOne({questions: data})
                resolve(newGame);
            } catch (err) {
                reject(`Error retrieving games: ${err.message}`)
            }
        })
    }
}

module.exports = { Game, Questions};