const recarregarSaldo = async () => {
  try {
    const cpf = document.querySelector("#cpf").value;
    const valorRecarga = document.querySelector("#valorRecarga").value;
    const data = { nome, cpf, valorRecarga };

    console.log(data);

    const url = "http://localhost:5000/api/recargaclientes/recarregar-saldo";
    const response = await axios.post(url, data);

    // Se a requisição for bem-sucedida, você pode lidar com a resposta aqui
    console.log(response.data);

    alert("Saldo recarregado com sucesso!");

    // Limpa o formulário usando o método reset
    form.reset();
  } catch (error) {
    console.error("Erro ao recarregar saldo:", error);

    
    alert("Erro ao recarregar saldo.");
  }
};

// Associar a função a um evento, como o envio do formulário
const form = document.querySelector("#form");
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Evitar o comportamento padrão de recarregar a página
  recarregarSaldo();
});
