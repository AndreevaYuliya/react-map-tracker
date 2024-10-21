const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

function generateRandomObject(id) {
  return {
    id: id.toString(),
    coordinates: [51.505 + Math.random() * 0.1, -0.09 + Math.random() * 0.1],
    direction: Math.floor(Math.random() * 360),
  };
}

wss.on("connection", (ws) => {
  const interval = setInterval(() => {
    const objects = Array.from({ length: 50 }, (_, i) => generateRandomObject(i + 1));
    
    ws.send(JSON.stringify(objects));
  }, 1000);

  ws.on("close", () => clearInterval(interval));
});

console.log("Mock server running on ws://localhost:8080");
