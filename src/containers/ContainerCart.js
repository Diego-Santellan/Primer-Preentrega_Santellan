const {promises: fs} = require('fs')

class ContainerCart{
    
    constructor(ruta, ruta2){
        this.ruta = ruta; //ruta que usaremos
        this. ruta2 = ruta2;
    }
    
    //CREAR CARRITO
    async createCart(){
        const carts = await this.toListAll();
        const cart = new ContainerCart();
        let newId
        if (carts.lenght == 0) {
            newId = 1
        } else {
            newId = carts[carts.length -1].id +1
        }

        const newProduct = {... cart, id:newId, timestamp: Date.now(), products:[]}
        carts.push(newProduct)

        try {
            await fs.writeFile(this.ruta, JSON.stringify(carts, null, 2))   
            return newId
        } catch (error) {
            throw new Error(`Error al gurdar el producto: ${error}`);   
        }
    }



    //LISTAR LOS PRODUCTOS DE "X" CARRITO
    async toList(id){
        try {
            const products = await this.toListAll()
            const lookFor = products.find(prod => prod.id == id)
            return lookFor.products
            
        } catch (error) {
            throw new Error(`Error al buscar el carrito: ${error}`);   
        }
    }


    
    //LISTAR TODO
    async toListAll(){
        try {
            const cart = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(cart)
        } catch (error) {
            return []
        }
    }



    //GUARDAR/AGREGAR PRODUCTO
    async save(id, id_prod){
        const products = await this.toListAll();

        let newId
        if (products.lenght == 0) {
            newId = 1
        } else {
            newId = products[products.length -1].id +1
        }

        const newProduct = {...product, id:newId}
        products.push(newProduct)

        try {
            await fs.writeFile(this.ruta, JSON.stringify(products, null, 2))
            return newId
        } catch (error) {
            throw new Error(`Error al gurdar el producto: ${error}`);   
        }
    }



    //ACTUALIZAR CARRITO
    async update(id, product){
        // const products = await this.toListAll();
        // const index = products.findIndex(prodt => prodt.id == id)
        
        // if (index == -1) {
        //     throw new Error(`Error al actualizar no se encontro el id:${id}`);  
            
        // } else {
        //     products[index] = elem
        //     try {
        //         await fs.writeFile(this.ruta, JSON.stringify(products, null, 2))
                
        //     } catch (error) {
        //         throw new Error(`Error al actulizar el producto: ${error}`);  
        //     }
        // }
        console.log(product);
        console.log(id);

        const carts = await this.toListAll()
        const cart = carts.find(prod => prod.id == id)
        const index = cart.products;        //hasta aquí nos situamos en el carrito y en su array de productos
        index.push(product);        //agregamos el producto al carrito
        
        

        try {
            await fs.writeFile(this.ruta, JSON.stringify(carts, null, 2)) 
            
        } catch (error) {
            throw new Error(`Error al borrar el producto: ${error}`);            
        }

    }



    //ELIMINAR CARRITO POR ID
    async delete(id){
        const carts = await this.toListAll()
        const index = carts.findIndex(cart => cart.id == id)
        console.log(index);
       
        if (index == -1) { //verificamos que el id exista
            throw new Error(`Error al borrar no se encontro el id:${id}`)
        }

        carts.splice(index,1); // Eliminamos el producto del array
        
        try {
            await fs.writeFile(this.ruta, JSON.stringify(carts, null, 2)) //reescribir el archivo
            
        } catch (error) {
            throw new Error(`Error al borrar el producto: ${error}`);            
        }
    }



    //ELIMINAR PRODUCTO POR SU ID DENTRO DEL CARRITO
    async deleteProduct(id, id_prod){
        const carts = await this.toListAll()
        const cart = carts.find(prod => prod.id == id)
        const index = cart.products;
        const product = index.findIndex(prot => prot.id ==  id_prod)
        index.splice(product,1);
        try {
            await fs.writeFile(this.ruta, JSON.stringify(carts, null, 2)) 
                
        } catch (error) {
            throw new Error(`Error al borrar el producto: ${error}`);            
        }

    }



    // ELIMINAR TODO
    async deleteAll(){
        try {
            await fs.writeFile(this.ruta, JSON.parse([], null, 2))  //DE DONDE SALE EL 2?
        } catch (error) {
            throw new Error(`Error al borrar todo: ${error}`);
        }
    }
}

module.exports = ContainerCart;