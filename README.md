# Quizz App


## todo / bugs

- when creating a game, user should be able to send parameters from form

- store player icon in redux / db for results
	- icons currently re-reassign whenever playerlist compoennet rerenders (which is often)
	- just move the icon state to the redux store, similar to ready state
	- also send this value to the database when players are created so icon matches on hiscores

- prevent users joining lobby when game is started / completed
- prevent users joining game when game is completed
	- logic for this exists on the server at the game/:id/simple route, just a matter of blocking the rendering on the client

- improve visuals of answer buttons, maybe take a look at how the state is set up here 
- submit event on the button should only fire once. Maybe call the redux action in the parent when it moves to the next question rather than on clicking the submit button

- set usernames? again think this would just be a case of adding this as an attribute to the player store and sending to the db also 

- results page should be formatted using the much more visually pleasing Hiscore page component

- refactor code 
	- there is a lot of reusable code that we could use components / custom hooks for to make testing easier
	- we can split out the redux actions etc again or just structure the project so they are in single files, whatever makes it clearest / easy to test  

- add global hiscore functionality
	- when user scores are calculated we could add each score to a scores document in the db

## API 
- POST /games
  - creates a new game with a unique id and a list of questions, returns the id to redirect the user
  - optional query params like this /games?amount=5&difficulty=easy&category=10&type=multiple
    - if these are left out then random values will be assigned  
 
 - GET /games/:id e.g /games/6086c0c4d44a15002cf791b4
   - returns array of questions for that game
   
```
   {
  "id": "6086c0c4d44a15002cf791b4",
  "questions": [
    {
      "category": "Sports",
      "type": "boolean",
      "question": "Peyton Manning retired after winning Super Bowl XLIX.",
      "possible_answers": [
        "True",
        "False"
      ]
    }, ... 
   ]
  }
```
 - GET /games/:id/simple 
   - returns an object with info about that game but no questions

```
{
  "completed": false,
  "started": true,
  "type": "multiple",
  "category": "Politics",
  "length": 5
}
```

- POST /games/:id/player/:playername e.g /games/6086c0c4d44a15002cf791b4/player/bob
  - no body
  - creates a new player in that game  


- POST /games/:id/player/:playername/answers e.g /games/6086c0c4d44a15002cf791b4/player/bob/answers
  - is sent at the end of the game
  - needs a body of an array of a users answers e.g ["True", "False", "True"] or ["Ozzy Osbourne", "Abigail", "5"]
  - adds users answers to the game

- Get /games/:id/results e.g /games/6086c0c4d44a15002cf791b4/results
  - sends a list of validated answers for the players in a game
  - also sends scores
