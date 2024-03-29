import asyncHandler from "express-async-handler";

import Product from "../models/productModel.js";

/**
 *  @desc		Get all products
 *  @route	GET /api/products
 * 	@access	public
 */
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

/**
 *  @desc		Get single products
 *  @route	GET /api/products/:id
 * 	@access	public
 */
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

/**
 *  @desc		Delete a product
 *  @route	DELETE /api/products/:id
 * 	@access	private/admin
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

/**
 *  @desc		Create a product
 *  @route	POST /api/products/
 * 	@access	private/admin
 */
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "SampleProduct",
    price: 0,
    user: req.user._id,
    image: "/image/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Some desc...",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

/**
 *  @desc		Update a product
 *  @route	PUT /api/products/:id
 * 	@access	private/admin
 */
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updateProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
export {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
};
