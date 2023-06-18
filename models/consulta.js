const { Sequelize, DataTypes } = require("sequelize");
const conexao = require("../config/conexao");

const Consulta = conexao.define(
  "consulta",
  {
    temperatura: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    estado: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    data: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tablename: "consulta",
    freezeTableName: true,
    timestamps: false,
  }
);

// var Equipe = function () {
//   //conexao com banco de dados
//   this.con = require("../config/conexao");
//   //define uma tabela chamada pessoa com os campos indicados
//   this.Modelo = this.con.define(
//     "equipe",
//     {
//       nome: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       email: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//     },
//     {
//       tablename: "equipe",
//       freezeTableName: true,
//       timestamps: false,
//     }
//   );
//   this.setConexao = function (c) {
//     this.con = c;
//   };
// };
module.exports = Consulta;
