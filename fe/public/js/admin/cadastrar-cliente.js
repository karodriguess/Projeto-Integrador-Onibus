document.addEventListener("DOMContentLoaded", () => {
  
  displayFlashMessage();

  const form = document.querySelector("#form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    event.stopPropagation();  
    //coleta dos dados do form
    if (form.checkValidity()) {
      const nomeCompleto = document.querySelector("#nomeCompleto").value;
      const cpf = document.querySelector("#cpf").value;
      const email = document.querySelector("#email").value;
      let nascimento = document.querySelector("#nascimento").value;
      nascimento = `${nascimento}T00:00:00Z`;
      const senha = document.querySelector("#senha").value;
      const tipoCarteirinha = document.querySelector('#tipoCarteirinha').value;
      //forma de guarda-los em um array
      const data = { nomeCompleto, cpf, email, nascimento, senha, numeroTel, tipoCarteirinha };
      console.log(data)
      try {
        console.log("quase laaaa")
        const response = await axios.post("http://localhost:5000/api/clientes/cadastrar", data);
      
        storeFlashMessage("success", "Cadastro realizado sucesso");
        console.log("foi ebaaaa")

        const id = response.data.id;
      } catch (error) {
        storeFlashMessage("danger", error.message);
      }
    }
    
    form.classList.add("was-validated");
    window.location.href = 'http://localhost:3000/admin/cadastrar-cliente'
    
  });
});