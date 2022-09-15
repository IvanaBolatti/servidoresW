const fs=require('fs')

class producto {
    constructor(nombreProducto,precioProducto){
        this.nombreProducto=nombreProducto,
        this.precioProducto=precioProducto,
        this.idProducto=0
    }
    
}

module.exports=class Contenedor {
    constructor(nombreArchivo){
    this.nombreArchivo=nombreArchivo
    } 

   async #leerArchivo(){
       try{
        const contenido= await fs.promises.readFile(this.nombreArchivo,'utf-8')
        const contenidoParse= JSON.parse(contenido)
        return contenidoParse
       }catch (error){
        console.log("Hay un error al leer el archivo")
      }
   }

    async save(prod){
        try{
            const contenidoArchivo=await this.#leerArchivo()
    
        if (contenidoArchivo !== undefined ) {
    
           await fs.promises.writeFile(this.nombreArchivo,JSON.stringify([...contenidoArchivo, {...prod,idProducto:contenidoArchivo[contenidoArchivo.length -1].idProducto + 1 }], null, 2), 'utf-8')
           console.log ("guardado despues")
        }
         else {
           await fs.promises.writeFile(this.nombreArchivo,JSON.stringify([{...prod, idProducto:1 }], null, 2),'utf-8')
           console.log ("guardado 1")
        }
        } catch(error) {
            console.log("Existe un error")
        }
           
    }
    
 async getById(id) {
    try{
        const contenidoArchivo= await this.#leerArchivo()
        const producto=contenidoArchivo.filter(item=> item.idProducto===id)
    if (producto.length>0){
        return JSON.stringify(producto,true,2)
    }
     else{
        console.log("El producto no existe")
     }
    } catch(error){
        console.log("Existe un error")
    }
    
 } 

 async getRandom() {
    try{
        const contenidoArchivo= await this.#leerArchivo()
        const random= Math.floor(Math.random() * (contenidoArchivo.length - 0 + 1) ) + 0;
        return random
       } catch(error){
        console.log("Existe un error")
        }
    
 } 
 async getAll() {
    try{
        const contenidoArchivo= await this.#leerArchivo()
        return contenidoArchivo
    } catch (error){
        console.log("Existe un error")
    }
   }

 async deleteById(id){
    try{
        const contenidoArchivo= await this.#leerArchivo()
        const producto=contenidoArchivo.filter(item=> item.idProducto===id)
        console.log(producto)
        if (producto.length >0) {
           contenidoArchivo.splice(producto,1)
           await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(contenidoArchivo,null))
           console.log("El producto se elimino correctamente")   
         } else{
           console.log("El id no existe")
    }
    }catch(error){
        console.log("Existe un error")
    }
    
 }

 async deleteAll(){
    try{
       const contenidoArchivo= await this.#leerArchivo()
    if (contenidoArchivo ===""){
        fs.promises.writeFile(this.nombreArchivo,JSON.stringify([],null,2), 'utf-8')
        console.log("Se borro correctamente")
    } else{
        console.log("Ya está vacío")
    } 
    } catch (error){
        console.log("Existe un error")
    }
    
 }

}

//const contenedor1=new Contenedor('./productos.txt')

//const  prod1=new producto("azucar",120)
//const  prod2=new producto("aceite", 300)
//const  prod3=new producto("sal", 250)

//contenedor1.save(prod1)
//contenedor1.save(prod2)
//contenedor1.save(prod3)
//contenedor1.getById(2)
//contenedor1.getAll()
//contenedor1.deleteAll()
//contenedor1.deleteById(2)


