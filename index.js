const express = require('express');
const http = require('http');

const apiRouter = require('./routes/api');

const port = parseInt(process.env.PORT || '3000', 10);
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({
    extended: false,
}));

app.use('/api/', apiRouter);

app.use((_, res) => {
    res.status(404).end();
});

server.on('error', (error) => {
    console.error(error);
});

server.on('listening', () => {
    console.info(`Listening on port ${port}.`);
});

server.listen(port);
