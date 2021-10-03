import express from "express";
import fs from "fs";
import repository from "../repositorios/instRepositorio.js";

// creamos el router
const router = express.Router();

router.route('/testimonios')
    .get( function (req, res){
       repository.getAll()
            .then(function (testimonios){
                res.status(200).json(testimonios/*.filter(function (element){
                    return element.deleted != true
                })*/)
            })
            .catch(function (err){
                res.status(500).json({err: 500, msg: "NO puedo leer el testimonio.."})
            })
    })
    .post( function (req, res){
        fs.promises.readFile('./data/testimonios.json')
            .then(function (data){
                const testimonios = JSON.parse(data)

                const inst = req.body
                inst.id = testimonios.length + 1

                testimonios.push(inst)

                fs.promises.writeFile('./data/testimonios.json', JSON.stringify(testimonios))
                    .then(function (){
                        res.status(201).json(inst)
                    })
                    .catch(function (err){
                        res.status(500).json({err: 500, msg: "NO puedo crear el testimonio.."})
                    })
            })
            .catch(function (err){
                res.status(500).json({err: 500, msg: "NO puedo leer el testimonio.."})
            })
    })

router.route('/testimonios/:id')
    .get(function (req, res){
        const id = parseInt(req.params.id);
        fs.promises.readFile('./data/testimonios.json')
            .then(function (data){
                const testimonios = JSON.parse(data)

                let inst = testimonios.find(function (element){
                    return element.id === id;
                })
                if (inst?.deleted != true) {
                    res.status(200).json(inst);
                } else {
                    res.status(404).json({err: 404, msg: `El testimonios #${id} no se encontra en el servidor`});
                }
            })
            .catch(function (err){
                res.status(500).json({err: 500, msg: "NO puedo leer el testimonio.."})
            })
    })
    .put(function (req,res){
        const id = parseInt(req.params.id);
        fs.promises.readFile('./data/testimonios.json')
            .then(function (data){
                const testimonios = JSON.parse(data);
                let inst = testimonios.find(function (element){
                    return element.id === id;
                })
                if (inst?.deleted != true) {
                    let index = testimonios.indexOf(inst);
                    testimonios[index] = { ...req.body, id: id }

                    fs.promises.writeFile('./data/testimonios.json', JSON.stringify(testimonios))
                        .then(function (){
                            res.status(200).json(testimonios[index])
                        })
                        .catch(function (err){
                            res.status(500).json({err: 500, msg: "NO puedo crear el testimonio.."})
                        })

                    //res.status(200).json(inst);
                } else {
                    res.status(404).json({err: 404, msg: `El testimonio #${id} no se existe en el servidor`});
                }

            })
            .catch(function (err){
                res.status(500).json({err: 500, msg: "NO puedo leer el testimonio.."})
            })
    })
    .patch(function (req,res){
        const id = parseInt(req.params.id);
        fs.promises.readFile('./data/testimonios.json')
            .then(function (data){
                const testimonios = JSON.parse(data);
                let inst = testimonios.find(function (element){
                    return element.id === id;
                })
                if (inst?.deleted != true) {
                    let index = testimonios.indexOf(inst);
                    testimonios[index] = {... testimonios[index], ...req.body, id: id }

                    fs.promises.writeFile('./data/testimonios.json', JSON.stringify(testimonios))
                        .then(function (){
                            res.status(200).json(testimonios[index])
                        })
                        .catch(function (err){
                            res.status(500).json({err: 500, msg: "NO se puede crear el testimonio."})
                        })

                    //res.status(200).json(inst);
                } else {
                    res.status(404).json({err: 404, msg: `El testimonios #${id} no se existe en el servidor`});
                }

            })
            .catch(function (err){
                res.status(500).json({err: 500, msg: "NO puedo leer la entidad.."})
            })
    })
    .delete( function (req,res){
        const id = parseInt(req.params.id);
        fs.promises.readFile('./data/testimonios.json')
            .then(function (data){
                const testimonios = JSON.parse(data);
                let inst = testimonios.find(function (element){
                    return element.id === id;
                })
                if (inst?.deleted != true) {
                    /* let index = instrumentos.indexOf(inst);*/
                    /* instrumentos[index] = {... instrumentos[index], ...req.body, id: id }*/
                    inst.deleted = true;
                    fs.promises.writeFile('./data/testimonios.json', JSON.stringify(testimonios))
                        .then(function (){
                            res.status(200).json(inst)
                        })
                        .catch(function (err){
                            res.status(500).json({err: 500, msg: "NO puedo eliminar el testimonio.."})
                        })

                    //res.status(200).json(inst);
                } else {
                    res.status(404).json({err: 404, msg: `El testimonios #${id} no se existe en el servidor`});
                }

            })
            .catch(function (err){
                res.status(500).json({err: 500, msg: "NO puedo eliminar el testimonio.."})
            })
    })

// exportamos el router
export default router