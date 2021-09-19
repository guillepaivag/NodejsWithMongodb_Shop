const Product = require('../models/product')
const crypto = require('crypto')

controllerProduct = {}

controllerProduct.getAllProducts = (req, res) => {
    Product.find({}, (err, allProducts) => {
        if(err) {
            return res.status(500).json({
                codigo: 'Error-GetIdProduct-0000',
                titulo: 'Problemas al obtener los productos.',
                mensaje: 'No se pudo obtener los productos.',
                respuesta: err
            })
        }

        res.status(200).json({
            codigo: 'Exito-0000',
            titulo: 'Lista productos',
            mensaje: 'Lista completa de productos enviado.',
            respuesta: {
                allProducts,
                x: crypto.createHash('md5').update('guillepaivag@gmail.com').digest('hex')
            }
        })
    })
}

controllerProduct.getOneProduct = (req, res) => {
    let {productId} = req.params

    Product.findById(productId, (err, product) => {
        if(err){
            return res.status(500).json({
                codigo: 'Error-GetIdProduct-0000',
                titulo: 'Problemas al obtener un producto.',
                mensaje: 'No se pudo obtener el producto.',
                respuesta: err
            })
        }

        if(!product) {
            return res.status(484).json({
                codigo: 'Error-GetIdProduct-0001',
                titulo: 'El producto no existe.',
                mensaje: 'No se encontro el id del producto.',
                respuesta: null
            })
        }

        res.status(200).json({
            codigo: 'Exito-GetIdProduct-0000',
            titulo: 'El producto encontrado.',
            mensaje: 'El producto se encontro mediante la id.',
            respuesta: product
        })
    })
}

controllerProduct.addProduct = (req, res) => {
    const product = req.body
    
    let newProduct = new Product()
    newProduct.name = product.name
    newProduct.picture = product.picture
    newProduct.price = product.price
    newProduct.category = product.category
    newProduct.description = product.description

    newProduct.save((err, productStored) => {
        if(err) {
            return res.status(500).json({
                codigo: 'Error-AddProduct-0000',
                titulo: 'No se agrego el producto.',
                mensaje: 'Hubo un problema al guardar el producto.',
                respuesta: err
            })
        }

        res.status(200).json({
            codigo: 'Exito-AddProduct-0000',
            titulo: 'Se agrego un producto.',
            mensaje: 'Se agrego el producto de forma correcta.',
            respuesta: productStored
        })
    })
}

controllerProduct.updateProduct = (req, res) => {
    const {idProduct} = req.params
    const {updatedDataBody} = req.body

    Product.findByIdAndUpdate(idProduct, updatedDataBody, (err, updatedData) => {
        if(err) {
            return res.status(500).json({
                codigo: 'Error-UpdateData-0000',
                titulo: 'No se puede actualizar los datos del producto.',
                mensaje: 'Hubo un problema al actualizar los datos del producto.',
                respuesta: err
            })
        }

        res.status(200).json({
            codigo: 'Exito-UpdateData-0000',
            titulo: 'Se actualizo un producto.',
            mensaje: 'Se actualizo el producto de forma correcta.',
            respuesta: updatedData
        })
    })
}

controllerProduct.deleteProduct = (req, res) => {
    const {idProduct} = req.params

    Product.findById(idProduct, (err, product) => {
        if(err) {
            return res.status(500).json({
                codigo: 'Error-GetIdProduct-0000',
                titulo: 'Problemas al obtener un producto.',
                mensaje: 'No se pudo obtener el producto.',
                respuesta: err
            })
        }

        if(!product) {
            return res.status(484).json({
                codigo: 'Error-GetIdProduct-0001',
                titulo: 'El producto no existe.',
                mensaje: 'No se encontro el id del producto.',
                respuesta: null
            })
        }

        product.remove((err, productRemoved) => {
            if(err){
                return res.status(500).json({
                    codigo: 'Error-RemoveForIdProduct-0000',
                    titulo: 'Producto no eliminado.',
                    mensaje: 'No se pudo eliminar el producto.',
                    respuesta: err
                })
            }

            res.status(200).json({
                codigo: 'Exito-ProductRemoved-0000',
                titulo: 'Se elimino un producto.',
                mensaje: 'Se elimino el producto de forma correcta.',
                respuesta: productRemoved
            })
        })
    })
}

module.exports = controllerProduct