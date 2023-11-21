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
  });