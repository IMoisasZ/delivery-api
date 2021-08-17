import DeliveryRepository from '../repositories/delivery.repositories.js'

async function createOrders(order){
    return await DeliveryRepository.insertOrder(order)
}

async function updateOrder(order){
    return await DeliveryRepository.updateOrder(order)
}

async function updateOrderId(id, status){
    return await DeliveryRepository.updateOrderId(id, status)
}

async function deleteOrder(id){
    return await DeliveryRepository.deleteOrder(id)
}

async function searchOrder(id){
    return await DeliveryRepository.searchOrder(id)
}

async function orderCliente(cliente){
    return await DeliveryRepository.orderCliente(cliente)
}

async function orderProduto(produto){
    return await DeliveryRepository.orderProduto(produto)
}

async function bestSellerProducts(){
    return await DeliveryRepository.bestSellerProducts()
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