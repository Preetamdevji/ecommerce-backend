const productService = require("../services/product_service.js");

const createProduct = async (req, response) => {
  // let user = req.user;

  try {
    const product = await productService.createProduct(req.body);
    return response.status(201).send(product);
    // console.log(product);
  } catch (error) {
    return response.status(500).send({ error: error.message });
  }
};

const deleteProduct = async (req, resp) => {
    let productId = req.params.id;
  
    try {
      const product = await productService.deleteProduct(productId);
      return resp.status(201).send(product);
    } catch (error) {
      return resp.status(500).send({ error: error.message });
    }
  };


  const updatedProduct = async (req, resp) => {
    let productId = req.params.id;
  
    try {
      const product = await productService.updateProduct(productId,req.body);
      return resp.status(201).send(product);
    } catch (error) {
      return resp.status(500).send({ error: error.message });
    }
  };

  const findProductById = async (req, resp) => {
    let productId = req.params.id;
  
    try {
      const product = await productService.findProductById(productId);
      return resp.status(201).send(product);
    } catch (error) {
      return resp.status(500).send({ error: error.message });
    }
  };

  const getAllProducts = async (req, resp) => {
    // let productId = req.params.id;
  
    try {
      const products = await productService.getAllProducts(req.query);
      return resp.status(201).send(products);
    } catch (error) {
      return resp.status(500).send({ error: error.message });
    }
  };

  const createMultipleProduct = async (req, resp) => {
    
    try {
      const product = await productService.createMultipleProduct(req.body);
      return resp.status(201).send({message : "Product Created Successfully",product});
    } catch (error) {
      return resp.status(500).send({ error: error.message });
    }
  };

module.exports = {
  createProduct,
  deleteProduct,
  updatedProduct,
  findProductById,
  getAllProducts,
  createMultipleProduct
}
