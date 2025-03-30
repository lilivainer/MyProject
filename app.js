//מגישות לילי ויינר + לידור טובול 49/1

const express = require("express");
const app = express();
const userRoutes = require("./routes/users");
const productsRoutes = require("./routes/products");

const port = process.env.PORT || 3000;

// Middleware for JSON processing (if required)
app.use(express.json());
app.use(express.static("public"));

// Routers
app.use("/api/users", userRoutes); // All user routes

//תרגיל 1 - צרו ניווט חדש לעבודה עם מוצרים (/api/products)
app.use("/api/products", productsRoutes);

// Main Page
app.get("/", (req, res) => {
  res.send("<h1>Welcome to the Main Page</h1>");
});

// Processing route 404
app.use((req, res) => {
  res.status(404).send("<h1>404 Not Found</h1>");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
