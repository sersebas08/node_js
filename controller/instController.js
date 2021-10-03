import repository from "../repositorios/instRepositorio.js"
import {response} from "express";

export function index (req, res){
    /*res.send("msg del controlador")*/
    res.render('index',{});
}
export function listar(req,res){
        repository.getAll()
        .then(function (testimonios){
            res.render(
                'testimonios', // vista
                { lista: testimonios/*.filter(function (element){ //modelo
                        return element.deleted != true
                    })*/
                }
            );
        })
        .catch(function (err){
            res.status(500).send(err.message);
        })
    //vista

}
export function nuevo(req, res){
    res.render('formulario',{});
}
export function crearNuevo (req, res){
    repository.create(req.body)
        .then(function (entity){
            res.render('exito',{entity})
        })
}
export default {
    index,
    listar,
    nuevo,
    crearNuevo
}

