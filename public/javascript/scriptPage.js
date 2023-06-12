$("#btnConsulta").click(async function () {
  axios.get("/consulta/").then((response) => {
    if (response.status == 200) {
      console.log(response.data);
      let dados = [response.data];
      $("#card_tabela").css("display", "block");

      $("#tabela_consulta").bootstrapTable("load", dados);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Erro ao obter temperatura",
      });
    }
  });
});
$("#btnLimpar").click(function () {
  $("#card_tabela").css("display", "none");
  limpaCampos();
});

function initTable() {
  $("#tabela_consulta")
    .bootstrapTable("destroy")
    .bootstrapTable({
      locale: $("#locale").val(),
      columns: [
        [
          {
            field: "temperatura",
            title: "Temperatura °C",
            align: "center",
            halign: "left",
          },
          {
            field: "estado",
            title: "Estado",
            align: "center",
            halign: "left",
          },
          {
            field: "data",
            title: "Data/Hora",
            align: "center",
            halign: "left",
          },
        ],
      ],
    });
}

// Função executada ao abrir a pagina
$(document).ready(function () {
  initTable();
});
