document.addEventListener("DOMContentLoaded", async (event) => {
    displayFlashMessage();
  
    const url = window.location.href;
    const urlId = url.split("/").pop();
  
    try {
      const response = await axios.get(`http://localhost:3000/api/linhas/buscar/${urlId}`);
      const linha = response.data;
  
      const horarioPartida = linha.horarioPartida.substring(11, 16);
  
      document.querySelector("#id").textContent = linha.id;
      document.querySelector("#nome").textContent = linha.nome;
      document.querySelector("#origem").textContent = linha.origem;
      document.querySelector("#destino").textContent = linha.destino;
      document.querySelector("#horarioPartida").textContent = horarioPartida;
      document.querySelector("#duracao").textContent = linha.duracao;
    } catch (error) {
      triggerFlashMessage("danger", error.message);
    }
  
    const form = document.querySelector("#form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      try {
        const response = await axios.delete(`http://localhost:3000/api/linhas/excluir/${urlId}`);
  
        storeFlashMessage("success", "Exclusão realizada com sucesso");
        window.location.href = "http://localhost:3001/linhas/listar";    
      } catch (error) {
        triggerFlashMessage("danger", error.message);
      }
    });
  });