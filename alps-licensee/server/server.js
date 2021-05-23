const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3030 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
      console.log("SERVER MESSAGE RECEIVED:", data)
    wss.clients.forEach(function each(client) {
    //   if (client !== ws && client.readyState === WebSocket.OPEN) {
      if ( client.readyState === WebSocket.OPEN) {
          console.log("SENDING DATA TO CLIent", data)
        client.send(data);
      }
    });
  });
});