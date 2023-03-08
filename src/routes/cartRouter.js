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

cartRouter.post('/:id/products/:id_prod', async (req, res) =>{      // EN BASE AL PRIMER ID BUSCAMOS EL CARRITO Y EN BASE AL SEGUNDO ID(ID_PROD) BUSCAMOS "X" PRODUCTO Y LO SUMAMOS AL CARRITO
    //con el id del carrito. Lo utilizamos para incorporar productos al mismo
    // logica para agregar productos

    let carrito = await dbCart.toList2(parseInt(req.params.id));

    if (carrito.status === "error") {
        return res.status(400).send(carrito);
    }else{
        console.log(carrito);
    }


    // let id = ()
    let producto = await dbArchive.toList(parseInt(req.params.id_prod));
    if (producto.status === "error") {
        return res.status(400).send(producto);
    } else {
        console.log(producto);

    }
    
    res.json( await dbCart.update(req.params.id, producto) );
})

cartRouter.delete('/:id/products/:id_prod', async (req, res) =>{    //  EN BASE AL PRIMER ID BUSCAMOS EL CARRITO Y EN BASE AL SEGUNDO ID(ID_PROD) BUCAMOS EL PRODUCTO DENTRO DEL CARRITO Y LO ELIMINAMOS
    res.json( await dbCart.deleteProduct(req.params.id, req.params.id_prod))    //RECIVO UN PRIMER ID DE UN CARRITO Y ELIMINO UN PRODUCTO SEGUN EL SEGUNDO ID RECIVIDO 
})


module.exports = cartRouter;