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
      //coleta dos dados do form
      if (form.checkValidity()) {
        const nome = document.querySelector("#nome").value;
        const localSaida = document.querySelector("#localSaida").value;
        const localDestino = document.querySelector("#localDestino").value;
        let horaSaida = document.querySelector("#horaSaida").value;
        horaSaida = `0001-01-01T${horaSaida}:00.000Z`
        let horaChegada = document.querySelector("#horaChegada").value;
        horaChegada = `0001-01-01T${horaChegada}:00.000Z`
        //forma de guarda-los em um array
        const data = { nome, localSaida, localDestino, horaSaida, horaChegada };
  
        try {
          const response = await axios.patch(`http://localhost:5000/api/linhas/atualizar/${urlId}`, data);
        
          storeFlashMessage("success", "Cadastro realizado sucesso");
  
        } catch (error) {
          storeFlashMessage("danger", error.message);
        }
      }
      
      form.classList.add("was-validated");
      window.location.href = 'http://localhost:3000/admin/lista-linha';
    }); 
  });