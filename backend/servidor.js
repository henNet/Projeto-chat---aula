import { WebSocketServer } from "ws";

const PORT = 3000;
const servidor = new WebSocketServer({ port: PORT });

servidor.on("connection", conectar);

function conectar(socket) {
  console.log("Cliente Conectado");

  socket.on("message", tratarDadosRecebidos);
}

function tratarDadosRecebidos(dados) {
  console.log(dados.toString());

  for (let cliente of servidor.clients) {
    cliente.send(dados.toString());
  }
}
