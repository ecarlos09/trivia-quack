const gameServer = require('./server');

const port = process.env.PORT || 5001;

gameServer.listen(port, () => console.log(`Game now being served from port ${port}!`));