document.addEventListener('DOMContentLoaded', async () => {
    const nomeUsuario = document.querySelector('#nome');
    const saldo = document.querySelector('#saldo');
    const id = window.location.href.split('/').pop()

    try {
        var response = await axios.get(`http://localhost:5000/api/clientes/${id}`)

        if (nomeUsuario != null) {
            nomeUsuario.innerHTML = response.data.nomeCompleto
        }

        if (saldo != null) {
            saldo.innerHTML = response.data.saldo
        }
    } catch (error) {
        console.log(error)
    }


})