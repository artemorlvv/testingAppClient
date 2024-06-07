import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

const buildPath = path.resolve(__dirname, "dist"); // Абсолютный путь к папке сборки

app.use(express.static(buildPath));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(buildPath, "index.html")); // Абсолютный путь к index.html
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
