import fs from "fs";

export async function getAll (){
    return fs.promises.readFile('./data/testimonios.json')
        .then(function (data){
            const testimonios = JSON.parse(data)
            return testimonios.filter(function (element){
                return element.deleted != true
            });
        })
}
export async function create(entity){
       return fs.promises.readFile('./data/testimonios.json')
           // si pudo leer
            .then(function (data){
                const testimonios = JSON.parse(data)

                entity.id = testimonios.length + 1

                testimonios.push(entity)

                return fs.promises.writeFile('./data/testimonios.json', JSON.stringify(testimonios))

            })
           // si pudo grabar
           .then(function (){
               return entity
           })
}

export default  {
    getAll,
    create
}