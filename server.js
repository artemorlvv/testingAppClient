import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const buildPath = path.resolve(__dirname, "dist");

app.use(express.static(buildPath));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(buildPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

console.log(path.resolve(buildPath, "index.html"));
