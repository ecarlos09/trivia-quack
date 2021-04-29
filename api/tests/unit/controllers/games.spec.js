const gamesControllers = require('../../../mvc/controllers/games')
const { Game, Questions } = require('../../../mvc/models/game');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }

describe('games controller', () => {
    beforeEach(() =>  jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('getGames', () => {
        it('returns a 200 status code when fecthing all games', async () => {
            let testGames = {"games":[{
                "_id":"608a8282876a0500151a0b89",
                "questions":{
                    "response_code":0,
                    "results":[
                        {
                            "category":"Entertainment: Music",
                            "type":"boolean",
                            "difficulty":"medium",
                            "question":"Soulja Boy&#039;s &#039;Crank That&#039; won a Grammy for Best Rap Song in 2007.",
                            "correct_answer":"False",
                            "incorrect_answers":["True"]
                        },
                    ]
                }
            }]}
            jest.spyOn(Game, 'all', 'get').mockResolvedValue(testGames);
            await gamesControllers.getGames(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(testGames);
        })
    })

    describe('getScores', () => {
        it('returns a 200 status code when fecthing all scores', async () => {
            let testScores = {"scores":[
                {"_id":"608a82b3876a0500151a0b8b","player":"MAk-QcXxsu3wYdy7AAAB","score":2},
                {"_id":"608a82e3876a0500151a0b8d","player":"EDuFS7cacMwSY4euAAAD","score":1}
            ]}
            jest.spyOn(Game, 'allScores', 'get').mockResolvedValue(testScores);
            await gamesControllers.getScores(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(testScores);
        })
    })

    describe('getById', () => {
        test('it returns a single game with a 200 status code', async () => {
            const gameId = "608a9d6c876a0500151a0bba";
            let testGame = {
                "id":"608a9d6c876a0500151a0bba",
                "questions":[
                    {
                        "category":"Sports",
                        "difficulty":"medium",
                        "type":"multiple",
                        "question":"What is the highest belt you can get in Taekwondo?",
                        "possible_answers":["White","Red","Green","Black"]
                    },
                    {
                        "category":"Sports",
                        "difficulty":"medium",
                        "type":"multiple",
                        "question":"What is the oldest team in the NFL?",
                        "possible_answers":["Chicago Bears","Green Bay Packers","New York Giants","Arizona Cardinals"]
                    },
                    {
                        "category":"Sports",
                        "difficulty":"medium",
                        "type":"multiple",
                        "question":"Which sport is NOT traditionally played during the Mongolian Naadam festival?",
                        "possible_answers":["Wrestling","Archery","Horse-Racing","American Football"]
                    }
                ]
            }
            jest.spyOn(Game, 'findById')
                .mockResolvedValue(testGame);
                
            const mockReq = { params: { id: gameId } }
            await gamesControllers.getById(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(gameId);
        })
    });

    describe('getSimple', () => {
        test('it returns simplified game data with a 200 status code', async () => {
            const testId = "608a9d6c876a0500151a0bba";
            let testGame = {
                "id":"608a9d6c876a0500151a0bba",
                "questions":[
                    {
                        "category":"Sports",
                        "difficulty":"medium",
                        "type":"multiple",
                        "question":"What is the highest belt you can get in Taekwondo?",
                        "possible_answers":["White","Red","Green","Black"]
                    },
                    {
                        "category":"Sports",
                        "difficulty":"medium",
                        "type":"multiple",
                        "question":"What is the oldest team in the NFL?",
                        "possible_answers":["Chicago Bears","Green Bay Packers","New York Giants","Arizona Cardinals"]
                    },
                    {
                        "category":"Sports",
                        "difficulty":"medium",
                        "type":"multiple",
                        "question":"Which sport is NOT traditionally played during the Mongolian Naadam festival?",
                        "possible_answers":["Wrestling","Archery","Horse-Racing","American Football"]
                    }
                ]
            }
            jest.spyOn(Game, 'findById')
                .mockResolvedValue(testGame);
                
            const mockReq = { params: { id: testId } }
            await gamesControllers.getSimple(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(testId);
        })
    });

    // describe('create', () => {
    //     test('it returns a new dog with a 201 status code', async () => {
    //         let testDog = {
    //             id: 1, name: 'Test Dog', age: 2
    //         }
    //         jest.spyOn(Dog, 'create')
    //             .mockResolvedValue(new Dog(testDog));
                
    //         const mockReq = { body: testDog }
    //         await dogsController.create(mockReq, mockRes);
    //         expect(mockStatus).toHaveBeenCalledWith(201);
    //         expect(mockJson).toHaveBeenCalledWith(new Dog(testDog));
    //     })
    // });

    // describe('destroy', () => {
    //     test('it returns a 204 status code on successful deletion', async () => {
    //         jest.spyOn(Dog.prototype, 'destroy')
    //             .mockResolvedValue('Deleted');
            
    //         const mockReq = { params: { id: 1 } }
    //         await dogsController.destroy(mockReq, mockRes);
    //         expect(mockStatus).toHaveBeenCalledWith(204);
    //     })
    // });
    
})