let express = require("express");
let app = express();
let router = express.Router();

//Importando controladores
const pageController = require("../controllers/pageController");
const consultasController = require("../controllers/consultasController");
const equipesController = require("../controllers/equipesController");

//Rota Principal, carrega pagina principal
router.get("/home/", pageController.index);
//Carrega pagina de cadastro de admins
router.get("/equipe/", pageController.loadPage);
//Carrega pagina de historico de consultas
router.get("/historico/", pageController.historico);

//Rota usada para consultar temperatura
router.get("/consulta/", consultasController.consultar);
//Rota usada para enviar alerta por email
router.get("/alertar/", consultasController.alertar);
//Recupera historico de consultas
router.get("/buscaHistorico/", consultasController.buscaHistorico);

//Cadastra admin
router.post("/cadastrar/", equipesController.cadastrar);
//Altera status de email do admin
router.post("/ativar/", equipesController.ativar);
//Recupera lista de admin
router.get("/pesquisa/", equipesController.pesquisa);

module.exports = router;
