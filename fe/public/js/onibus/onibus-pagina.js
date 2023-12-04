// modificações do javascript das páginas... aqui são alterações de front, ou seja,
// apenas coisas visuais que não mexem com dados sensíveis

document.addEventListener("DOMContentLoaded", () => {

    window.enviarFormulario = enviarFormulario;
    

     function enviarFormulario() {

        const form = document.querySelector("#form");
        
        
    form.addEventListener("input", async (event) => {
      event.preventDefault();
      event.stopPropagation();  
      //coleta dos dados do form
      if (form.checkValidity()) {
        const codCartao = document.querySelector("#leitor").value
        //forma de guarda-los em um array
        
        let tarifa = 5
        

        const data = { codCartao, tarifa };
        try {
          const response = await axios.patch("http://localhost:5000/api/clientes/onibusComum", data);
  
          
        } catch (error) {
            alert(error.message);
        }
      }
      
      form.classList.add("was-validated");
      
    });
  }

  
  
});
