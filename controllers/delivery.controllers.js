import DeliveryServices from '../service/delivery.services.js'

async function createOrders(req, res, next){
    try{
        let order = req.body;

        if(!order.cliente || !order.produto || order.valor === null){
            throw new Error("Cliente, produto e valor são obrigatórios!")
        };

        order = await DeliveryServices.createOrders(order)

        res.send(order)

    }catch(err){
        next(err);
    }
}

async function updateOrder(req, res, next){
    try{
        const order = req.body

        if(!order.id || !order.cliente || !order.produto || order.valor === null ){
            throw new Error("Id, cliente, produto, valor e status entregue são obrigatórios!")
        }

        res.send(await DeliveryServices.updateOrder(order))

    }catch(err){
        next(err);
    }
}

async function updateOrderId(req, res, next){
    try{
        const id = req.params.id
        
        const status = req.body.entregue
        console.log(id);
        console.log(status);
        res.send(await DeliveryServices.updateOrderId(id, status))

    }catch(err){
        next(err);
    }
}

async function deleteOrder(req, res, next){
    try{
        await DeliveryServices.deleteOrder(req.params.id)

        res.end();

    }catch(err){
        next(err);
    }
}

async function searchOrder(req, res, next){
    try{
        res.send(await DeliveryServices.searchOrder(req.params.id))

        // res.send(await DeliveryServices.searchOrder(order))

    }catch(err){
        next(err);
    }
}

async function orderCliente(req, res, next){
    try{
        const cliente = req.body.cliente
        res.send(await DeliveryServices.orderCliente(cliente))

    }catch(err){
        next(err);
    }
}

async function orderProduto(req, res, next){
    try{
        const produto = req.body.produto
        res.send(await DeliveryServices.orderProduto(produto))

    }catch(err){
        next(err);
    }
}

async function bestSellerProducts(req, res, next){
    try{
        res.send(await DeliveryServices.bestSellerProducts())

    }catch(err){
        next(err);
    }
}

export default {
    createOrders,
    updateOrder,
    updateOrderId,
    deleteOrder,
    searchOrder,
    orderCliente,
    orderProduto,
    bestSellerProducts
}