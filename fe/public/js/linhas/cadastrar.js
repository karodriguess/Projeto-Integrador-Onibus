document.addEventListener("DOMContentLoaded", () => {
    displayFlashMessage();
  
    const form = document.querySelector("#form");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      if (form.checkValidity()) {
        const nome = document.querySelector("#nome").value;
        const origem = document.querySelector("#origem").value;
        const destino = document.querySelector("#destino").value;
        const horarioPartida = document.querySelector("#horarioPartida").value;
        const duracao = document.querySelector("#duracao").value;
  
        const data = { nome, origem, destino, horarioPartida, duracao };
  
        try {
          const response = await axios.post("http://localhost:3000/api/linhas/cadastrar", data);
        
          storeFlashMessage("success", "Cadastro realizado sucesso");
  
          const id = response.data.id;
          window.location.href = `http://localhost:3001/linhas/exibir/${id}`;
        } catch (error) {
          triggerFlashMessage("danger", error.message);
        }
      }
      
      form.classList.add("was-validated");
    });
  });