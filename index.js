const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/index.html');
});

io.on('connection', socket => {
  console.log('new connection');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', message => {
    io.emit('chat message', `${socket.request.connection.remoteAddress} -> ${message}`);
  });
});

server.listen(3000, () => {
  console.log('listening');
});