document.addEventListener("DOMContentLoaded", () => {
  displayFlashMessage();

  const form = document.querySelector("#form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    //coleta dos dados do form
    if (form.checkValidity()) {
      const headers = {"Content-Type": "multipart/form-data"};
      const formData = new FormData(form);
      let nascimento = formData.get('nascimento')
      formData.set( 'nascimento', `${nascimento}T00:00:00Z`)

      // const nomeCompleto = document.querySelector("#nomeCompleto").value;
      // const cpf = document.querySelector("#cpf").value;
      // const email = document.querySelector("#email").value;
      
      // const numeroTel = document.querySelector("#numeroTel").value;
      // const fotoInput = document.querySelector("#fotoInput").value;
      // //forma de guarda-los em um array
      // const data = { nomeCompleto, cpf, email, nascimento, numeroTel, fotoInput };

      try {
        const response = await axios.post("http://localhost:5000/api/motoristas/cadastrar", formData, headers);
      
        storeFlashMessage("success", "Cadastro realizado sucesso");

      } catch (error) {
        storeFlashMessage("danger", error.message);
      }
    }
    
    form.classList.add("was-validated");
    window.location.href = 'http://localhost:3000/admin/cadastrar-motorista';
  });
});