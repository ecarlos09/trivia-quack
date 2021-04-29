import myReducer from '../myReducer/';

describe('my reducer', () => {
    it('initialises with no players, answers or open sockets', () => {
        const initReturn = myReducer(undefined, { type: '@@INIT' })
        expect(initReturn).toEqual({players: [], answers: []})
    });

    it('adds a new socket to the store upon new game creation', () => {
        const initState = {players: [], answers: []};
        const fakeSocketObject = {socket: "fakeSocket"};
        const addFakeSocket = myReducer(
                                    initState,
                                    {type: 'ADD_SOCKET', payload: {socket: fakeSocketObject}}
                            )
        expect(Object.keys(addFakeSocket)).toContain("socket")
    });

    it('adds a player to the store when a new player joins the room', () => {
        const fakePlayer = 'hSJes_8fbvdJGSVCAANH';
        const addFakePlayer = myReducer(
                                {players: []}, 
                                { type: 'ADD_PLAYER', payload: [fakePlayer] })
        expect(addFakePlayer).toMatchObject({players: [{player: fakePlayer, ready: false}]})
    });

    it('toggles an individual player\'s readiness', () => {
        const fakePlayerToToggle = 'hSJes_8fbvdJGSVCAANH';
        const fakePlayerToggle = myReducer(
                                    {players: [
                                        {player: 'hSJes_8fbvdJGSVCAANH', ready: false}, 
                                        {player: 'vMTzX8xWaGc0XngrAAAZ', ready: false}
                                    ]}, 
                                    { type: 'PLAYER_READY', payload: fakePlayerToToggle })
        expect(fakePlayerToggle).toMatchObject(
                                    {players: [
                                        {player: 'hSJes_8fbvdJGSVCAANH', ready: true}, 
                                        {player: 'vMTzX8xWaGc0XngrAAAZ', ready: false}
                                    ]});
    });

    it('resets player readiness and when all players are ready', () => {
        const fakeReadyReset = myReducer(
                                    {players: [
                                        {player: 'hSJes_8fbvdJGSVCAANH', ready: true}, 
                                        {player: 'vMTzX8xWaGc0XngrAAAZ', ready: true}
                                    ]}, 
                                    { type: 'ALL_NOT_READY' })
        expect(fakeReadyReset).toMatchObject(
                                    {players: [
                                        {player: 'hSJes_8fbvdJGSVCAANH', ready: false}, 
                                        {player: 'vMTzX8xWaGc0XngrAAAZ', ready: false}
                                    ]});
    });


    it('loads questions for the players and puts them in the store', () => {
        const fakeQuestions = [
            {
                "category":"Sports",
                "difficulty":"easy",
                "type":"boolean",
                "question":"Peyton Manning retired after winning Super Bowl XLIX.",
                "possible_answers":["False","True"]
            },
            {
                "category":"Sports",
                "difficulty":"easy",
                "type":"boolean",
                "question":"Roger Federer is a famous soccer player.",
                "possible_answers":["False","True"]
            },
            {
                "category":"Sports",
                "difficulty":"easy",
                "type":"boolean",
                "question":"In association football, or soccer, a corner kick is when the game restarts after someone scores a goal.",
                "possible_answers":["False","True"]
            }
        ];

        const fakePlayers = [
            {player: 'hSJes_8fbvdJGSVCAANH', ready: false}, 
            {player: 'vMTzX8xWaGc0XngrAAAZ', ready: false}
        ];

        const fakeQuestionLoad = myReducer(
                                        {
                                            players: fakePlayers,
                                            answers: [],
                                            socket: {socket: 'fakeSocket'}
                                        },
                                        { type: 'LOAD_QUESTIONS', payload: fakeQuestions }
        );

        expect(fakeQuestionLoad).toMatchObject(
                                    {
                                        players: fakePlayers,
                                        answers: [],
                                        questions: fakeQuestions,
                                        socket: {socket: 'fakeSocket'}
                                    }
        )

    });

    it('adds a player\'s answer on submission', () => {
        const fakeAnswer = "Quebec City";
        const addFakeAnswer = myReducer(
                                    {answers: []},
                                    {type: 'ADD_ANSWER', payload: fakeAnswer}
                            )
        expect(addFakeAnswer).toMatchObject({answers: [fakeAnswer]})
    });

    it('returns an error when SET_ERROR is called', () => {
        const fakeError = myReducer(
                                    undefined,
                                    {type: 'SET_ERROR'}
                            )
        expect(fakeError).toEqual('error')
    });

});