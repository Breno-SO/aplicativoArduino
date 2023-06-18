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

$("#btnLimpar2").click(function () {
  limpaCampos();
});

function limpaCampos() {
  $("#nome").val("");
  $("#email").val("");
}

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

function initTableAdmin() {
  $("#tabela_admin")
    .bootstrapTable("destroy")
    .bootstrapTable({
      locale: $("#locale").val(),
      columns: [
        [
          {
            field: "nome",
            title: "Nome",
            align: "center",
            halign: "left",
          },
          {
            field: "email",
            title: "Email",
            align: "center",
            halign: "left",
          },
          {
            field: "bolEmailAtivo",
            title: "Notificação ativa",
            formatter: operateFormatter,
            align: "center",
            halign: "left",
          },
          {
            field: "ações",
            title: "Ações",
            align: "center",
            events: window.operateEvents,
            formatter: operateFormatter2,
            halign: "left",
          },
        ],
      ],
    });
}

//Formata a coluna de ações da tabela
function operateFormatter(value, row, index) {
  let valor = value;
  switch (valor) {
    case 1:
      return ['<span class="badge bg-success">Ativo</span>'].join("");
      break;
    case 0:
      return ['<span class="badge bg-danger">Inativo</span>'].join("");
      break;
  }
}
function operateFormatter2(value, row, index) {
  return [
    '<a class="edit" href="javascript:void(0)" title="Ativar/Desativar Notificação por email" style= "margin-right: 10px;">',
    `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-toggles" viewBox="0 0 16 16">
    <path d="M4.5 9a3.5 3.5 0 1 0 0 7h7a3.5 3.5 0 1 0 0-7h-7zm7 6a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm-7-14a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm2.45 0A3.49 3.49 0 0 1 8 3.5 3.49 3.49 0 0 1 6.95 6h4.55a2.5 2.5 0 0 0 0-5H6.95zM4.5 0h7a3.5 3.5 0 1 1 0 7h-7a3.5 3.5 0 1 1 0-7z"/>
  </svg>`,
    "</a>",
  ].join("");
}
window.operateEvents = {
  "click .edit ": function (e, value, row, index) {
    axios.post("/ativar/", row).then((response) => {
      $("#tabela_admin").bootstrapTable("refresh");
    });
  },
};
function initTableHistorico() {
  $("#tabela_historico")
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

async function Request(params) {
  axios.get("/pesquisa/").then((response) => {
    params.success(response.data);
  });
}
async function RequestHistorico(params) {
  axios.get("/buscaHistorico/").then((response) => {
    params.success(response.data);
  });
}

$("#btncadastrar").click(async function () {
  let campoNome = document.getElementById("nome").value;
  let campoEmail = document.getElementById("email").value;

  if (campoEmail && campoNome) {
    if (ValidateEmail(campoEmail)) {
      axios
        .post("/cadastrar/", { nome: campoNome, email: campoEmail })
        .then((response) => {
          console.log(response.status);
          if (response.status == 201) {
            let dados = [response.data];

            $("#tabela_admin").bootstrapTable("refresh");
            limpaCampos();
          } else {
            alert("erro");
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Erro ao cadastrar administrador",
            });
            limpaCampos();
          }
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Erro ao cadastrar",
        text: "O email digitado é invalido",
      });
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Erro ao cadastrar",
      text: "Preencha os campos de nome e email",
    });
  }
});

function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}
$("#email").keypress(function (e) {
  if (e.which === 13 && !e.shiftKey) {
    $("#btncadastrar").trigger("click");
  }
});
// Função executada ao abrir a pagina
$(document).ready(function () {
  initTable();
  initTableAdmin();
  initTableHistorico();
});
