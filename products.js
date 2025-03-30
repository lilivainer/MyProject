//מגישות לילי ויינר + לידור טובול 49/1

const express = require("express");
const router = express.Router();
const data = require("../data");
const path = require("path");

//סעיף 2

// GET /api/products
router.get("/", (req, res) => {
  res.json({ products: data.products });
});

// GET /api/products/:id
//get product by id (path param)
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const product = data.products.find((item) => item.id === parseInt(id));
  if (product) res.json(product);
  else res.status(404).json({ message: `Product with ID: ${id} not found` });
});

// POST /api/products
//add product (body data)
router.post("/", (req, res) => {
  const productData = req.body;
  //לבדוק אם קיימים שדות חובה שם ומחיר
  if (!productData.name || !productData.price)
    return res
      .status(400)
      .json({ error: "Missing required fields: name and price" });

  //לבדוק אם המחיר הוא מספר חיובי
  if (typeof productData.price !== "number" || productData.price <= 0)
    return res
      .status(400)
      .json({ error: "Price must be a number greater than 0" });

  //לבדוק אם המלאי הוא מספר חיובי
  if (typeof productData.stock !== "number" || productData.stock < 0)
    return res.status(400).json({ error: "Stock must be a positive number" });

  //לבדוק אם המזהה הוא ייחודי אם לא החזר שגיאה 400
  const existingProduct = data.products.find((p) => p.id === productData.id);
  if (existingProduct) {
    return res
      .status(400)
      .json({ error: "Product with this ID already exists" });
  }
  data.products.push(productData);
  res.json({ message: `Product added`, products: data.products });
});

// PUT /api/products/:id
//update product by id (path param + body data)
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const productData = req.body;
  //לבדוק אם קיימים שדות חובה שם ומחיר
  if (!productData.name || !productData.price)
    return res
      .status(400)
      .json({ error: "Missing required fields: name and price" });

  //לבדוק אם המחיר הוא מספר חיובי
  if (typeof productData.price !== "number" || productData.price <= 0)
    return res
      .status(400)
      .json({ error: "Price must be a number greater than 0" });

  //לבדוק אם המלאי הוא מספר חיובי
  if (typeof productData.stock !== "number" || productData.stock < 0)
    return res.status(400).json({ error: "Stock must be a positive number" });
  //find index of user by id into array
  const productInt = data.users.findIndex((item) => item.id === parseInt(id));

  if (productInt !== -1) {
    //change user into array
    data.products[productInt] = productData;
    res.json({
      message: `Product with ID: ${id} updated`,
      products: data.products,
    });
  } else {
    res.status(404).json({ message: `Product not found` });
  }
});

// DELTE /api/products
//delete product by id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const productInd = data.products.findIndex(
    (item) => item.id === parseInt(id)
  );

  if (productInd !== -1) {
    //delete product into array
    data.products.splice(productInd, 1);
    res.json({
      message: `Product with ID: ${id} deleted`,
      products: data.products,
    });
  } else {
    res.status(404).json({ message: `Product not found` });
  }
});
