let express = require("express");
let app = express();
let router = express.Router();

//Importando controladores
const pageController = require("../controllers/pageController");
const consultasController = require("../controllers/consultasController");

//Rota Principal, carrega pagina principal
router.get("/home/", pageController.index);

//Rota usada para consultar temperatura
router.get("/consulta/", consultasController.consultar);

router.get("/alertar/", consultasController.alertar);

router.get("/alerta/", pageController.alert);

module.exports = router;
