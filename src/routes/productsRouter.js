const express = require('express');

//creamos un enrutador
const { Router } = express;
const productsRouter = new Router();

//importamos la clase container, que contiene todo lo del CRUD
const ContainerArchive = require('../containers/ContainerArchive')

//instancio la clase contenedor
const dbProducts = new ContainerArchive("../db/dbProductos.json");
// const dbProducts = new ContainerArchive('../../db/dbProductos.json')


// funcion error para el middleware
function crearErrorNoEsAdmin(ruta, metodo) {
    const error = {
        error: -1,
    }

    if (ruta && metodo) {
        error.description = `ruta ${req.url} método ${req.method} no implementado`
    } else {
        error.description = 'no autorizado'
    }
    return error
}

// middleware para administrador
const esAdmin = true;
function soloAdmins(req, res, next) {
    if (!esAdmin) {
        res.json(crearErrorNoEsAdmin(req.url ,req.method))
    }else{
        next()
    }
}


//Enpoints
productsRouter.get('/', async (req, res) =>{
    // logica para enlistar todos los productos u otro metodo
    //envio la informacion que me devuelva la clase containerArchive --> envio del archivo db, por medio de los metodos de los contenedores
    const products =await dbProducts.toListAll()
    res.send(products)
})


productsRouter.get('/:id', async (req, res) =>{     //para esta se buscaria asi --> /api/products/5  <--suponiendo que queremos el producto con el idi numero 5
    // logica para enlistar por id
    res.json(await dbProducts.toList(req.params.id))//envio la informacion que me devuelva la clase containerArchive
})


//tiene permiso un administrador... por eso le agregamos un middleware "soloAdmin"
productsRouter.post('/', soloAdmins, async (req, res) =>{
    // logica para agregar productos
    res.json(await dbProducts.save(req.body))
})


productsRouter.put('/:id', soloAdmins, async (req, res) =>{ 
    // logica para actualizar producto
    res.json(await dbProducts.update( req.params.id, req.body))
})


productsRouter.delete('/:id', soloAdmins, async (req, res) =>{ //
    // logica para eliminar producto
    res.json(await dbProducts.delete(req.params.id))
})

module.exports = productsRouter;