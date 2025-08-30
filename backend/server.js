const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

const app = express();
const PORT = 5000;
const DATA_FILE = "./db.json";

app.use(cors());
app.use(express.json());

// Read users
app.get("/users", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(data);
});

// Add user
app.post("/users", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  const newUser = { id: uuidv4(), ...req.body };
  data.push(newUser);
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  res.json(newUser);
});

// Update user
app.put("/users/:id", (req, res) => {
  let data = JSON.parse(fs.readFileSync(DATA_FILE));
  data = data.map(user => user.id === req.params.id ? {...user, ...req.body} : user);
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  res.json({ message: "User updated" });
});

// Delete user
app.delete("/users/:id", (req, res) => {
  let data = JSON.parse(fs.readFileSync(DATA_FILE));
  data = data.filter(user => user.id !== req.params.id);
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  res.json({ message: "User deleted" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
