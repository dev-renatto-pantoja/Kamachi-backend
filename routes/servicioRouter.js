const { Router } = require('express');
const router = Router();
const {listServices} = require("../controllers/servicioController");

router.get(
  '/listarServicios',
  listServices
);

module.exports = router;