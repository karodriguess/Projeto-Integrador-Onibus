const lerCartao = async () => {
    try {
      // Obtenha o valor do input
      const clienteId = inputClienteId.value;
  
      // Faça a solicitação POST usando Axios
      const url = "http://localhost:3001/api/embarques/cadastrar";
      const data = { clienteId };
      const response = await axios.post(url, data);
  
      console.log(response.data);
      
      // Se a solicitação for bem-sucedida, redirecione para a página de sucesso
      window.location.href = "http://localhost:3000/catraca/sucesso";
    } catch (error) {
      console.error("Erro ao cadastrar embarque:", error);
  
      // Se o erro for relacionado ao cliente não encontrado, redirecione para a página de aviso indicando a causa
      if (error.response && error.response.status === 404) {
        window.location.href = "http://localhost:3000/catraca/aviso?causa=cliente-nao-encontrado";
      } else if (error.response && error.response.status === 402) {
        // Se o erro for relacionado a saldo insuficiente, redirecione para a página de aviso indicando a causa
        window.location.href = "http://localhost:3000/catraca/aviso?causa=saldo-insuficiente";
      } else {
        // Para outros erros, redirecione para a página de erro
        window.location.href = "http://localhost:3000/catraca/erro";
      }
    }
  };
  
  const inputClienteId = document.querySelector("#clienteId");
  inputClienteId.focus();
  