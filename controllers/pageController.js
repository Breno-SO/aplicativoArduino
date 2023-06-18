const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const axios = require("axios");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
async function index(req, res) {
  res.render("page/frontpage");
}

async function loadPage(req, res) {
  res.render("page/emailpage");
}

async function historico(req, res) {
  res.render("page/historypage");
}

module.exports = { index, loadPage, historico };
