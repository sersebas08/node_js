import express from 'express';
import controller from '../controller/instController.js';
const router = express.Router();

router.route('/')
    .get(controller.index)
    /*.get(function (req, res){
        res.send("!hola mundo");
    })*/
router.route('/comentarios')
    .get(controller.listar)

router.route('/nuevo')
    .get(controller.nuevo)
    .post(controller.crearNuevo)

// exportamos los router
export default router;


