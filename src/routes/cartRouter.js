const express = require('express');

//creamos un enrutador
const { Router } = express;
const cartRouter = new Router();

//importamos la clase container, que contiene todo lo del CRUD
const ContainerArchive = require('../containers/ContainerCart.js')

//instancio la clase contenedor
const CartService = new ContainerArchive("../../db/dbCarrito.json")



//Enpoints
cartRouter.post('/', async (req, res) =>{ //post  crea un carrito y devuelve su id
    res.json()
})

cartRouter.delete('/:id', async (req, res) =>{ // toma el id del carrito y lo elimina
    // logica para eliminar productos
    res.json()
})

cartRouter.get('/:id/productos', async (req, res) =>{ 
    // logica para enlistar por id del carrito y sus productos
    res.json()
})

//tiene permiso un administrador... por eso le agregamos un middleware "soloAdmin"
cartRouter.post('/:id/productos', async (req, res) =>{ //con el id del carrito. Lo utilizamos para incorporar productos al mismo
    // logica para agregar productos
    res.json()
})

cartRouter.delete('/:id/productos/:id_prod', async (req, res) =>{ //recibe el id del carrito, segun los productos que tiene reciebe otro id de uno de sus productos y lo elimina
    // logica para elimiar un producto en particular del carrito
    res.json()
})


module.exports = cartRouter;