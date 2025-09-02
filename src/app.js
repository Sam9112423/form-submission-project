const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

app.post("/submit", (req, res) => {
  const filePath = path.join(__dirname, "data.json");

  // Read existing data
  let data = [];
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath);
    if (fileContent.length > 0) {
      data = JSON.parse(fileContent);
    }
  }

  // Add new entry
  data.push(req.body);

  // Write back to file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  res.json({ message: "Form submitted successfully!" });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
