const express = require('express');

const productsRouter = require('./routes/productsRouter.js');
const cartRouter = require('./routes/cartRouter.js');


//INSTANCIO SERVIDOR 
const app =  express();


//CONFIGURACIONES DEL SERVIDOR
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);


app.get('*', (req, res) => {
    res.send({
        status: "error", description:`ruta ${req.url} método ${req.method} no implementado`
    })
})  

module.exports = app;