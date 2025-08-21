// import the Movie model
const Product = require("../models/product");

async function getProducts(category, page = 1, itemsPerPage = 6) {
  // create an empty container for filter
  let filter = {};

  if (category) {
    filter.category = category;
  }

  //apply filters
  const products = await Product.find(filter)
    .limit(itemsPerPage) // limit number of items
    .skip((page - 1) * itemsPerPage)
    .sort({ _id: -1 });

  // return the products
  return products;
}

async function getProduct(id) {
  // load product data based on id
  const product = await Product.findById(id);
  return product;
}

async function addProduct(name, description, price, category) {
  // create new Product
  const newProduct = new Product({
    name,
    description,
    price,
    category,
  });

  // save the new Product into mongodb
  await newProduct.save(); // clicking the "save" button
  return newProduct;
}

async function updateProduct(id, name, description, price, category) {
  // short hand
  return await Product.findByIdAndUpdate(
    id,
    {
      name,
      description,
      price,
      category,
    },
    {
      new: true, // return the updated data
    }
  );
}

async function deleteProduct(id) {
  await Product.findByIdAndDelete(id);
}

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
