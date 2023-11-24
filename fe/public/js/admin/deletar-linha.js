document.addEventListener("DOMContentLoaded", async (event) => {
  displayFlashMessage();

  const url = window.location.href;
  const urlId = url.split("/").pop();

  function formatarHorario(data) {
      var date = new Date(data);
      var formattedTime = date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: "UTC"
      });
      return formattedTime;
  }

  try {
    const response = await axios.get(`http://localhost:5000/api/linhas/${urlId}`);
    const linha = response.data;

    console.log(linha)

    document.querySelector("#nome").value = linha.nome;
    document.querySelector("#localSaida").value = linha.localSaida;
    document.querySelector("#localDestino").value = linha.localDestino;
    document.querySelector("#horaSaida").value = formatarHorario(linha.horaSaida);
  //   document.querySelector("#senha").value = linha.senha;
    document.querySelector("#horaChegada").value = formatarHorario(linha.horaChegada);
  } catch (error) {
    triggerFlashMessage("danger", error.message);
  }

    const form = document.querySelector("#form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      const response = await axios.delete(`http://localhost:5000/api/linhas/deletar/${urlId}`);

      storeFlashMessage("success", "Exclusão realizada com sucesso");
      window.location.href = "http://localhost:3000/admin/lista-linha";    
    } catch (error) {
      triggerFlashMessage("danger", error.message);
    }
  });
});