describe("integration tests", () => {
    let api;
    beforeEach(async () => {
      await resetTestDB();
      console.log("reset");
    });
  
    beforeAll(async () => {
      api = app.listen(5000, () =>
        console.log("Test server running on port 5000")
      );
    });
  
    afterAll((done) => {
      console.log("Gracefully stopping test server");
      api.close(done);
    });
  
    describe("game routes", () => {
      it("should return all games game", async () => {
        const res = await request(api).get("/games");
        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.games.length).toBe(1)
      });
  
      it("should return a single game", async () => {
        const res = await request(api).get("/games/6088064e9a068b002cf601b3");
        expect(res.statusCode).toEqual(200);
        expect(res.body.id).toEqual("6088064e9a068b002cf601b3")
        
      });

      it("should return game info", async () => {
        const res = await request(api).get("/games/6088064e9a068b002cf601b3/simple");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({"category": "Entertainment: Music", "difficulty": "easy", "completed": false, "length": 3, "started": false, "type": "multiple"});
      })

  
      it("should return status code 500 error if no game found", async () => {
          const res = await request(api).get("/games/6088064e9a468b002ff601b3");
          expect(res.statusCode).toEqual(500);
      })
  
      it("should add a players answers", async () => {
          const res = await request(api).post("/games/6088064e9a068b002cf601b3/players/1234/answers")
          .send({answers: ["Jimmy Page", "Dave Grohl", "Phish"], icon: "5", username: 'bob'});
          expect(res.statusCode).toEqual(200);
      })

      describe("scores routes", () => {

      it("should return results for a game", async () => {
        await request(api).post("/games/6088064e9a068b002cf601b3/players/1234/answers")
        .send({answers: ["Jimmy Page", "Dave Grohl", "Phish"], icon: "5", username: 'bob'});
          const res = await request(api).get("/games/6088064e9a068b002cf601b3/results")
          expect(res.statusCode).toEqual(200)
          expect(res.body.data.length).toEqual(3);
          expect(res.body.data[0]).toHaveProperty('player_answers')
      })

      it("should return results highscores list", async () => {
        await request(api).post("/games/6088064e9a068b002cf601b3/players/1234/answers")
        .send({answers: ["Jimmy Page", "Dave Grohl", "Phish"], icon: "5", username: 'bob'});
        const res = await request(api).get("/games/scores")
        expect(res.statusCode).toEqual(200)
        expect(res.body.scores).toEqual([{"count": 1, "icon": "5", "player": "1234", "points": 200, "username": "bob"}])
    })
  })

      describe("creating new game", () => {

        it("should post a new game and return the id", async () => {
        const res = await request(api).post("/games?amount=3&category=9&difficulty=easy&type=boolean")
        expect(res.statusCode).toEqual(200)
        expect(res.body.length).toEqual(24)
    })

    it("should give an error if no questions returned", async () => {
      const res = await request(api).post("/games?amount=3&category=666")
      expect(res.statusCode).toEqual(500)
      expect(res.body.error).toEqual("Error creating game: no questions found, try again")
    })

    })
  
    });
  });
  
