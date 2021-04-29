// const Game = require('../../../mvc/models/game');
// jest.mock('../../../mvc/models/game');

// const {MongoClient} = require('mongodb');

// describe('Game model', () => {
//   let connection;
//   let db;

//   beforeAll(async () => {
//     connection = await MongoClient.connect(process.env.MONGO_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     db = await connection.db('jest');
//   });

//   afterAll(async () => {
//     await connection.close();
//   });

//   beforeEach(async () => {
//     await db.collection('jest').deleteMany({});
//   });

//   describe('all', () => {
//     it('retrieves all games from the collection', async () => {
//         // Write test that:
//             // wipes test db,
//             // Inserts two games into test database
//             // Calls the get all function
//             // Expect the the number of games returned to be two
//       });
//   })

// });