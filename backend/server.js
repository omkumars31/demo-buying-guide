// this is importing 
const express = require("express");
const cors = require("cors");

//express appln

const app = express();

const PORT = 5100;


// middle ware 

app.use(cors());

app.use(express.json());

// testing route
app.get("/", (req, res) =>{
    res.json({
        message:  "Buying Guide API is running!"
    });
});

// buying guide api
app.post("/api/buying-guide/recommend", (req, res) => {

  const {
    category,
    budget,
    requirement
  } = req.body;

  console.log("Received request:", req.body);

  // mock test
  let products = [];

  if (
    category === "dental-chair" &&
    budget === "1-2l" &&
    requirement === "advanced"
  ) {
    products = [
      {
        id: 101,
        name: "Premium Dental Chair",
        price: 150000,
        description: "Advanced dental chair with modern features."
      },
      {
        id: 102,
        name: "Advanced Dental Chair",
        price: 175000,
        description: "Feature-rich dental chair for clinics."
      }
    ];
  } else if (category === "dental-chair") {

    products = [
      {
        id: 103,
        name: "Standard Dental Chair",
        price: 95000,
        description: "Reliable dental chair for everyday clinic use."
      }
    ];

  } else {

    products = [
      {
        id: 104,
        name: "Recommended Dental Product",
        price: 75000,
        description: "Product selected based on your requirements."
      }
    ];
  }
res.json({
    success: true,
    products
  });
});

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});