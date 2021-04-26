const app = require('./server');

const port = process.env.PORT || 5001; // Hard code game server port

app.listen(port, () => console.log(`Express now departing from port ${port}!`));
app.listen(port, () => console.log(`Open for play on port ${port}!`));