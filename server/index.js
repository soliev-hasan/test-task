const WebSocket = require("ws");
const http = require("http");

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    ws.send(` ${message}`);

    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(`Server: ${message}`);
      }
    });
  });
});

server.listen(8080, () => {
  console.log("WebSocket server is listening on port 8080");
});
