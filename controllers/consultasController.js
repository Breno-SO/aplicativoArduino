const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const axios = require("axios");
const dayjs = require("dayjs");
require("dayjs/locale/pt-br");
const nodemailer = require("nodemailer");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

async function consultar(req, res) {
  config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://localhost:8089/temp/",
    headers: {},
  };
  let response = await axios.request(config);
  // console.log(response.status);
  axios
    .request(config)
    .then((response) => {
      if (response.status == 200) {
        let data = dayjs().format("DD/MM/YYYY HH:mm:ss");

        let dados = {
          temperatura: response.data.temperatura,
          estado: "ok",
          data: data,
        };
        res.status(200);
        res.send(dados);
      } else {
        res.status(500);
        res.send("Fudeu");
      }
    })
    .catch((error) => {
      res.status(500);
      res.send("Fudeu");
    });
}

alertar();
async function alertar() {
  var nodemailer = require("nodemailer");

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "stormtropper1254@gmail.com",
      pass: "qbuidqmyofbumygf",
    },
  });

  var mailOptions = {
    from: "stormtropper1254@gmail.com",
    to: "breno.soliv@gmail.com",
    subject: "Sending Email using Node.js",
    text: "That was easy!",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
module.exports = { consultar };
