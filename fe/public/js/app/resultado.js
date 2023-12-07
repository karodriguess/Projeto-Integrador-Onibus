// Função para extrair parâmetros da URL
const obterParametroDaUrl = (nome) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return urlSearchParams.get(nome);
};

// Função para exibir a mensagem e redirecionar após 5 segundos
const exibirMensagemEAgendarRedirecionamento = () => {
  const causa = obterParametroDaUrl("causa");
  const mensagemParagrafo = document.getElementById("mensagem");

  // Exibir mensagem com base na causa
  if (causa === "cliente-nao-encontrado") {
    mensagemParagrafo.innerText = "Cliente não encontrado.";
  } else if (causa === "saldo-insuficiente") {
    mensagemParagrafo.innerText = "Saldo insuficiente.";
  } else if (causa === "saldo-insuficiente") {
    mensagemParagrafo.innerText = "Pass";
  } 

  // Agendar redirecionamento após 5 segundos
  setTimeout(() => {
    window.location.href = "http://localhost:3000/catraca/aguardando";
  }, 3000);
};

exibirMensagemEAgendarRedirecionamento();
