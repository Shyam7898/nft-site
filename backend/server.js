const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/join", (req, res) => {
  const { username } = req.body;

  const data = { username, time: new Date() };

  let file = [];
  if (fs.existsSync("data.json")) {
    file = JSON.parse(fs.readFileSync("data.json"));
  }

  file.push(data);
  fs.writeFileSync("data.json", JSON.stringify(file, null, 2));

  res.json({ success: true });
});

app.listen(5000, () => console.log("Server running on port 5000"));