$(document).ready(function() {
  $('#table-motoristas').DataTable({
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