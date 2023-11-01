document.addEventListener("DOMContentLoaded", async (event) => {
    displayFlashMessage();
  
    try {
      const tableBody = document.querySelector("tbody");
      const response = await axios.get("http://localhost:3000/api/linhas/listar");
      response.data.forEach((linha) => {
        const row = tableBody.insertRow(-1);
        row.insertCell(0).innerHTML = linha.id;
        row.insertCell(1).innerHTML = linha.nome;
        row.insertCell(2).innerHTML = linha.origem;
        row.insertCell(3).innerHTML = linha.destino;
        row.insertCell(4).innerHTML = formatarHorario(linha.horarioPartida);
        row.insertCell(5).innerHTML = linha.duracao;
  
        // Link para Exibir
        const showLink = document.createElement("a");
        showLink.innerHTML = "Exibir";
        showLink.classList.add("btn", "btn-info", "btn-sm", "mx-1");
        showLink.href = `http://localhost:3001/linhas/exibir/${linha.id}`;
        row.insertCell(6).appendChild(showLink);
  
        // Link para Editar
        const editLink = document.createElement("a");
        editLink.innerHTML = "Editar";
        editLink.classList.add("btn", "btn-success", "btn-sm", "mx-1");
        editLink.href = `http://localhost:3001/linhas/editar/${linha.id}`;
        row.insertCell(7).appendChild(editLink);
  
        // Link para Deletar
        const deleteLink = document.createElement("a");
        deleteLink.innerHTML = "Deletar";
        deleteLink.classList.add("btn", "btn-danger", "btn-sm", "mx-1");
        deleteLink.href = `http://localhost:3001/linhas/excluir/${linha.id}`;
        row.insertCell(8).appendChild(deleteLink);
      });
    } catch (error) {
      triggerFlashMessage("danger", error.message);
    }
  });
  
  function formatarHorario(data) {
    const date = new Date(data);
    const horaLocal = date.getHours() + date.getTimezoneOffset() / 60;
    const minutos = date.getMinutes();
    return `${horaLocal < 10 ? "0" + horaLocal : horaLocal}:${
      minutos < 10 ? "0" + minutos : minutos
    }`;
  }
  