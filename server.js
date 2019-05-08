const net = require('net');
const server = net.createServer((c) => {
  // 'connection' listener
  console.log('client connected');
  c.on('end', () => {
    console.log('client disconnected');
  });
  c.on('data', (data) => {
    console.log('Received', new Date().toISOString(),": ",data.toString());
    const ParserData = Parser(data.toString())
    if(ParserData.VALIDATOR){
      c.write(ParserData.ACK)
    }
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

function Parser(data) {
  if (data.includes('+RESP')) {
    let SplitData = data.split(',')
    const ACK = '+SACK:' + SplitData[SplitData.length - 1]
    return {
      ACK,
      VALIDATOR: true
    }
  } else {
    return { VALIDATOR: false }
  }
}