const net = require('net');
const server = net.createServer((c) => {
  // 'connection' listener
  console.log('client connected');
  c.on('end', () => {
    console.log('client disconnected');
  });
  c.on('data', (data) => {
    console.log('Received:', data.toString());
  })
  c.on('error', (...arg) => {
    console.log('Client Error:', ...arg)
    setTimeout(ns => {
      server.listen(3001, () => {
        console.log('server bound, port 3001');
      });
    }, 2500)
  })
});
server.on('error', (err) => {
  console.log('Server Error: ', err)
});
server.listen(3001, () => {
  console.log('server bound, port 3001');
});