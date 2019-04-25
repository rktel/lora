const net = require('net');
const server = net.createServer((c) => {
  // 'connection' listener
  console.log('client connected');
  c.on('end', () => {
    console.log('client disconnected');
  });
  c.on('data', (data)=>{
    console.log('Received:', data.toString());
  })
});
server.on('error', (err) => {
  throw err;
});
server.listen(3001, () => {
  console.log('server bound, port 3001');
});