import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Sample data
let items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
];

// GET all items
app.get("/items", (req, res) => {
  res.json(items);
});

//Home
app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      "<h1>Sample API with Nodejs & Express</h1>End-point : <code><a href='/items'>/items</a></code>"
    );
});

// GET a specific item by ID
app.get("/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find((item) => item.id === itemId);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

// POST a new item
app.post("/items", (req, res) => {
  const newItem = req.body;
  newItem.id = items.length + 1;
  items.push(newItem);

  res.status(201).json(newItem);
});

// PUT (update) an item by ID
app.put("/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;

  items = items.map((item) => (item.id === itemId ? updatedItem : item));

  res.json(updatedItem);
});

// PATCH (partial update) an item by ID
app.patch("/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const fieldsToUpdate = req.body;

  items = items.map((item) => {
    if (item.id === itemId) {
      return { ...item, ...fieldsToUpdate };
    }
    return item;
  });

  const updatedItem = items.find((item) => item.id === itemId);

  if (updatedItem) {
    res.json(updatedItem);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

// DELETE an item by ID
app.delete("/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  items = items.filter((item) => item.id !== itemId);

  res.json({ message: "Item deleted successfully" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
