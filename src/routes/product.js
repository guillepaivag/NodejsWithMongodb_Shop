const {Router} = require('express')
const router = Router()

const controllerProduct = require('../controllers/product')

router.get('/product', controllerProduct.getAllProducts)
router.get('/product/:productId', controllerProduct.getOneProduct)
router.post('/product', controllerProduct.addProduct)
router.put('/product/:idProduct', controllerProduct.updateProduct)
router.delete('/product/:idProduct', controllerProduct.deleteProduct)

module.exports = router