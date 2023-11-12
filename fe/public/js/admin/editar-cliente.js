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
      // document.querySelector("#senha").value = cliente.senha;
      document.querySelector("#numeroTel").value = cliente.numeroTel;
      document.querySelector("#tipoCarteirinha").value = cliente.tipoCarteirinha;
    } catch (error) {
      triggerFlashMessage("danger", error.message);
    }

    
      const form = document.querySelector("#form");
    
      form.addEventListener("submit", async (event2) => {
        event2.preventDefault();

        if (form.checkValidity()) {
          const nomeCompleto = document.querySelector("#nomeCompleto").value;
          const cpf = document.querySelector("#cpf").value;
          const email = document.querySelector("#email").value;
          let nascimento = document.querySelector("#nascimento").value;
          nascimento = `${nascimento}T00:00:00Z`;
          // const senha = document.querySelector("#senha").value;
          const numeroTel = document.querySelector("#numeroTel").value;
          const tipoCarteirinha = document.querySelector('#tipoCarteirinha').value;

          const data = { nomeCompleto, cpf, email, nascimento, numeroTel, tipoCarteirinha };

          try {
            console.log(cliente)
            const response = await axios.patch(`http://localhost:5000/api/clientes/atualizar/${urlId}`, data);
          
            console.log("foi ebaaaa")
    
            const id = response.data.id;    
            window.location.href = `http://localhost:3000/admin/vizualizar-cliente/${urlId}`;
          } catch (error) {
            console.log(error)
            storeFlashMessage("danger", error.message);
          }
        }
        
        form.classList.add("was-validated");
        
        
      });
    
  });