/* Elementos do Login */
var loginContainer = document.querySelector(".loginContainer");
var nomeUsuario = document.querySelector("#nomeUsuario");

/* Elementos do Chat (mensagens) */
var chatContainer = document.querySelector(".chatContainer");
var chatMsgInput = document.querySelector("#mensagem");

/* Elementos do Socket */
var clienteSocket;
var usuario = {
  id: "",
  nome: "",
};

function conectar() {
  loginContainer.style.display = "none";
  chatContainer.style.display = "flex";

  usuario.id = crypto.randomUUID();
  usuario.nome = nomeUsuario.value;

  clienteSocket = new WebSocket("http://localhost:3000");
  clienteSocket.onmessage = tratarDadosRecebidos;
}

function enviarMsg() {
  let mensagem = {
    id: usuario.id,
    nome: usuario.nome,
    conteudo: chatMsgInput.value,
  };

  var minhaMgs = document.createElement("div");
  minhaMgs.classList.add("minhasMsgs");

  minhaMgs.innerHTML = `<span>${chatMsgInput.value}</span>`;

  document.querySelector(".mensagens").appendChild(minhaMgs);

  clienteSocket.send(JSON.stringify(mensagem));
  chatMsgInput.value = "";
}

function tratarDadosRecebidos({ data }) {
  console.log(data);
  let dados = JSON.parse(data);

  if (dados.id != usuario.id) {
    var outrosMgs = document.createElement("div");
    outrosMgs.classList.add("outrosMsgs");

    outrosMgs.innerHTML = `
      <span>
        <b>${dados.nome}: </b><br />
        ${dados.conteudo}
      </span>`;

    document.querySelector(".mensagens").appendChild(outrosMgs);
  }
}
