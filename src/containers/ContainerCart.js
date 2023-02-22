//EN ESTE ARCHIVO VA LOS METODOS ASINCRONICOS DE GUARDO YELIMANDO Y DEMAS...
//LLEVA FS TAMBIEN (MINUTO 18.30 EN ADELANTE)

const {promises: fs} = require('fs')

class ContainerCart{

    constructor(ruta){
        this.ruta = ruta; //ruta que usaremos
    }

    //BUCAR SUGUN ID
    async toList(id){
        const products = await this.toListAll()
        const lookFor = products.find(prod => prod.id == id)
        return lookFor
    }

    //LISTAR TODO
    async toListAll(){
        try {
            const products = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(products)
        } catch (error) {
            return []
        }
    }

    //GUARDAR/AGREGAR PRODUCTO
    async save(product){
        const products = await this.toListAll();

        let newId
        if (products.lenght == 0) {
            newId = 1
        } else {
            newId = products[products.length -1].id +1
        }

        const newProduct = {...product, id:newId}
        products.push(product)

        try {
            await fs.writeFile(this.ruta, JSON.stringify(products, null, 2))
            return newId
        } catch (error) {
            throw new Error(`Error al gurdar el producto: ${error}`);   
        }
    }

    //ACTUALIZAR PRODUCTO
    async update(elem, id){
        const products = await this.toListAll();
        const index = products.findIndex(prodt => prodt.id == id)
        
        if (index == -1) {
            throw new Error(`Error al actualizar no se encontro el id:${id}`);  
            
        } else {
            products[index] = elem
            try {
                await fs.writeFile(this.ruta, JSON.stringify(products, null, 2))
                
            } catch (error) {
                throw new Error(`Error al actulizar el producto: ${error}`);  
            }
        }

    }

    //ELIMINAR POR ID
    async delete(){
        const products = await this.toListAll()
        const index = products.findIndex(prodt => prodt.id == id)
       
        if (index == -1) { //verificamos que el id exista
            throw new Error(`Error al borrar no se encontro el id:${id}`)
        }

        products.splice(index,1); // Eliminamos el producto del array
        
        try {
            await fs.writeFile(this.ruta, JSON.parse) //reescribir el archivo
            
        } catch (error) {
            throw new Error(`Error al borrar el producto: ${error}`);            
        }
    }


    //ELIMINAR TODO
    async deleteAll(){
        try {
            await fs.writeFile(this.ruta, JSON.parse([], null, 2))  //DE DONDE SALE EL 2?
        } catch (error) {
            throw new Error(`Error al borrar todo: ${error}`);
        }
    }
}

module.exports = ContainerCart;