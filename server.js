import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(import.meta.url, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(import.meta.url, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
