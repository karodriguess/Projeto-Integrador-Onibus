document.addEventListener("DOMContentLoaded", async (event) => {
    displayFlashMessage();
  
    const url = window.location.href;
    const urlId = url.split("/").pop();
  
    try {
      const response = await axios.get(`http://localhost:5000/api/clientes/${urlId}`);
      const cliente = response.data;

      console.log(cliente)
  
      document.querySelector("#nomeCompleto").value = cliente.nomeCompleto;
      document.querySelector("#cpf").value = cliente.cpf;
      document.querySelector("#email").value = cliente.email;
      document.querySelector("#nascimento").value = cliente.nascimento.split("T")[0];
    //   document.querySelector("#senha").value = cliente.senha;
  
      document.querySelector("#tipoCarteirinha").value = cliente.tipoCarteirinha;
    } catch (error) {
      triggerFlashMessage("danger", error.message);
    }
  });