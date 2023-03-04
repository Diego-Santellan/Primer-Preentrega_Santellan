const express = require('express');

//creamos un enrutador
const { Router } = express;
const cartRouter = new Router();

//importamos la clase container, que contiene todo lo del CRUD
const ContainerCart = require('../containers/ContainerCart.js')

const ContainerArchive = require('../containers/ContainerArchive.js')

//instancio la clase contenedor
const dbCart = new ContainerCart("../db/dbCarrito.json")

const dbArchive = new ContainerArchive("../db/dbProductos.json")



//Enpoints
cartRouter.post('/', async (req, res) =>{       // CREAR CARRITO
    res.json(await dbCart.createCart())
})

cartRouter.delete('/:id', async (req, res) =>{      // TOMA EL ID DE UN CARRITO Y LO ELIMINA
    res.json( await dbCart.delete(req.params.id))
})

cartRouter.get('/:id/products', async (req, res) =>{       // EN BASE AL ID DE UN CARRITO ENLISTAR LOS PRODUCTOS DEL MISMO
    res.json(await dbCart.toList(req.params.id))
})

cartRouter.post('/:id/products/:id_prod', async (req, res) =>{
    //con el id del carrito. Lo utilizamos para incorporar productos al mismo
    // logica para agregar productos
    let carrito = await dbCart.toList(parseInt(req.params.id));
    if (carrito.status === "error") {
        return res.status(400).send(carrito);
    }
    let producto = await dbArchive.toList(parseInt(req.params.id_prod));
    if (producto.status === "error") {
        return res.status(400).send(producto);
    } else {
        let agregar = await dbCart.addProduct(parseInt(req.params.id), producto);
        res.send(agregar);
    }
})

cartRouter.delete('/:id/products/:id_prod', async (req, res) =>{
    res.json( await dbCart.deleteProduct(req.params.id, req.params.id_prod))    //RECIVO UN PRIMER ID DE UN CARRITO Y ELIMINO UN PRODUCTO SEGUN EL SEGUNDO ID RECIVIDO 
})


module.exports = cartRouter;