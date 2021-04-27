describe("integration tests", () => {
  let api;
  beforeEach(async () => {
    await resetTestDB();
  });

  beforeAll(async () => {
    api = app.listen(5000, () =>
      console.log("Test server running on port 5000")
    );
  });

  afterAll((done) => {
    console.log("Gracefully stopping test server");
    api.close(done);
  })

  describe("game routes", () => {
    it("should return a list of all habits", async () => {
      const res = await request(api)
        .get("/game")
      expect(res.statusCode).toEqual(200);
    });
})

})