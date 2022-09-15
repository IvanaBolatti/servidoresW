const express= require('express')
const Contenedor = require('./Contenedor')
const app=express()
const PORT=8080

const contenedor1=new Contenedor('./productos.txt')

app.get('/productos',async (req, res)=>{
 res.json(await contenedor1.getAll())
})

app.get('/productoRandom',async (req, res)=>{
    res.json(await contenedor1.getById((await contenedor1.getRandom())))
   })

app.get('/',(req,res)=>{
    res.send("¿Funciona?")
})
app.listen(PORT,()=> console.log("El servidor está escuchando el puerto 8080"))