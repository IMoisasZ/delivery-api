import express from 'express'
import orders from '../controllers/delivery.controllers.js'

const router = express.Router()

router.post('/', orders.createOrders) /* 1 */

router.put('/update', orders.updateOrder) /* 2 */

router.patch('/update/:id', orders.updateOrderId) /* 3 */

router.delete('/delete/:id', orders.deleteOrder) /* 4 */

router.get('/order/:id', orders.searchOrder) /* 5 */

router.get('/orderCliente', orders.orderCliente) /* 6 */

router.get('/orderProduto', orders.orderProduto) /* 7 */

router.get('/bestSellerProducts', orders.bestSellerProducts) /* 8 */

export default router