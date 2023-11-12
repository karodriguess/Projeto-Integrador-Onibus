
$(document).ready(function() {
  $('#table-linhas').DataTable({
    "ajax": {
      "url": "http://localhost:5000/api/linhas",
      "dataSrc": ""
    },
    "columns": [{
        "data": "nome"
      },
      {
        "data": "horaSaida",
        "render": function(data) {
          var date = new Date(data);
          var formattedTime = date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: "UTC"
          });
          return formattedTime;
        }
      },
      {
        "data": "horaChegada",
          "render": function(data) {
            var date = new Date(data);
            var formattedTime = date.toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
              timeZone: "UTC"
            });
            return formattedTime;
          }
        
      },
      {
        "data": "localSaida"
      },
      {
        "data": "localDestino"
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