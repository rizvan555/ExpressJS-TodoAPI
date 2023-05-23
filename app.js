import express from "express";
import axios from "axios";
import fs from "fs/promises";

const app = express();
const port = 3000;
app.use(express.json());

app.get("/todos", async (req, res) => {
  try {
    const response = await axios.get("https://dummyjson.com/todos");
    const data = response.data;
    fs.writeFile("data.json", JSON.stringify(data, null, 2));
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching todos");
  }
});

app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const response = await axios.get(`https://dummyjson.com/todos/${id}`);
  const data = response.data;
  res.json(data);
});

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const updateMyData = req.body;
  try {
    const response = await axios.get(
      `https://dummyjson.com/todos/${id}`,
      updateMyData
    );
    const updateData = response.data;
    res.json(updateData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Sorry you have Error");
  }
});

app.listen(port, () => {
  console.log(`${port}`);
});
