const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("sequelize");
const app = express();
const axios = require("axios");
const dayjs = require("dayjs");
require("dayjs/locale/pt-br");
const nodemailer = require("nodemailer");
const equipe = require("../models/equipe");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

async function cadastrar(req, res) {
  if (req.body.nome !== null && req.body.email !== null) {
    let pesquisa = await equipe.findAll({
      raw: true,
      where: { email: req.body.email },
    });
    if (pesquisa.length > 1) {
      //Email já cadastrado
      res.status(200);
      res.send({ error: "Falha no cadastro esse email já foi cadastrado" });
    } else {
      try {
        let cadastro = await equipe.create({
          nome: req.body.nome,
          email: req.body.email,
        });
      } catch (error) {
        console.log(error);
      }

      res.status(201);
      res.send("Cadastrado com sucesso");
    }
  } else {
    res.status(500);
    res.send({ error: "Falha no cadastro favor informar todos campos" });
  }
}

async function pesquisa(req, res) {
  let pesquisa = await equipe.findAll({ raw: true });
  res.status(200);
  res.send(pesquisa);
}

async function ativar(req, res) {
  if (req.body.bolEmailAtivo == 1) {
    await equipe.update({ bolEmailAtivo: 0 }, { where: { ID: req.body.id } });
  } else {
    await equipe.update({ bolEmailAtivo: 1 }, { where: { ID: req.body.id } });
  }
  res.status(200);
  res.send("Atualizado");
}

module.exports = { cadastrar, pesquisa, ativar };
