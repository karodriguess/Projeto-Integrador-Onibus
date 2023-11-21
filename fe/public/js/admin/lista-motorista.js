
// document.addEventListener("DOMContentLoaded", async (event) => {
//   displayFlashMessage();

//   try {
//     const tableBody = document.querySelector("tbody");
//     const response = await axios.get("http://localhost:5000/api/motoristas");
//     response.data.forEach((motoristas) => {
//       const row = tableBody.insertRow(-1);
//       row.insertCell(0).innerHTML = motoristas.nomeCompleto;
//       row.insertCell(1).innerHTML = motoristas.email;
//       row.insertCell(2).innerHTML = motoristas.nascimento;
//       row.insertCell(3).innerHTML = motoristas.numeroTel;

//             const showLink = document.createElement("a");
//       showLink.innerHTML = "Exibir";
//       showLink.classList.add("btn", "btn-info", "btn-sm", "mx-1");
//       showLink.href = `http://localhost:3000/admin/exibir/${motoristas.id}`;
//       row.insertCell(6).appendChild(showLink);

//       const editLink = document.createElement("a");
//       editLink.innerHTML = "Editar";
//       editLink.classList.add("btn", "btn-success", "btn-sm", "mx-1");
//       editLink.href = `http://localhost:3000/admin/editar/${motoristas.id}`;
//       row.insertCell(7).appendChild(editLink);

//       const deleteLink = document.createElement("a");
//       deleteLink.innerHTML = "Excluir";
//       deleteLink.classList.add("btn", "btn-danger", "btn-sm", "mx-1");
//       deleteLink.href = `http://localhost:3000/admin/excluir/${motoristas.id}`;
//       row.insertCell(8).appendChild(deleteLink);
//       });
//   } catch (error) {
//     triggerFlashMessage("danger", error.message);
//   }
// });


$(document).ready(function() {
  $('#table-motorista').DataTable({
    "ajax": {
      "url": "http://localhost:5000/api/motoristas",
      "dataSrc": ""
    },
    "columns": [{
        "data": "nomeCompleto"
      },
      {
        "data": "email"
      },
      {
        "data": "nascimento"
      },
      {
        "data": "numeroTel"
      },
      {
        "data": "ações",
        "render": function(data, type, row, meta) {
          return '<a href="http://localhost:3000/linhas/exibir/' + row.id + '">Visualizar</a> / ' +
            '<a href="http://localhost:3000/linhas/editar/' + row.id + '">Editar</a> / ' +
            '<a href="http://localhost:3000/linhas/excluir/' + row.id + '">Excluir</a>';
        }
      }
    ],
    "language": {
      "lengthMenu": "Mostrar _MENU_ registros por página",
      "zeroRecords": "Nenhum registro encontrado",
      "info": "Mostrando página _PAGE_ de _PAGES_",
      "infoEmpty": "Nenhum registro disponível",
      "infoFiltered": "(filtrado de _MAX_ registros no total)",
      "search": "Buscar",
      "paginate": {
        "first": "Primeiro",
        "last": "Último",
        "next": "Próximo",
        "previous": "Anterior"
      }
    }
  });
});