import express from 'express'
import deliveryRoutes from './routes/delivery.routes.js'

global.fileName = "pedidos.json";

const app = express();
app.use(express.json())

app.use("/delivery", deliveryRoutes)

app.listen(3000, ()=>{
    console.log("Servidor rodando na porta 3000");
})