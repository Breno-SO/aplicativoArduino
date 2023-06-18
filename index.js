let bodyParser = require("body-parser");
let express = require("express");
let app = express();
let router = require("./routes/routes");
const dayjs = require("dayjs");
const handlebars = require("express-handlebars");
const path = require("path");
const isBetween = require("dayjs/plugin/isBetween");
dayjs.extend(isBetween);
require("dayjs/locale/pt-br");
const cors = require("cors");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//Arquivos estaticos
app.use(express.static(path.join(__dirname, "public")));
//Template Engine
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./models/equipe");
require("./models/consulta");

const con = require("./config/conexao");
con.sync({ alter: true }).then(function (r) {
  // console.log(r);
  console.log("Modelos sincronizados");
});

app.use(
  cors({
    origin: "*",
    methods: ["GET"],
  })
);

app.use("", router);

app.listen(8686, () => {
  console.log("Servidor rodando");
});
