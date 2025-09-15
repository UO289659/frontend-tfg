const express = require("express");
const path = require("path");
const app = express();

// servir los archivos del build
app.use(express.static(path.join(__dirname, "build")));

// cualquier ruta → index.html (para React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Frontend corriendo en puerto ${port}`);
});
