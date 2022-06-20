const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Hello world"));
const port = process.env.PORT || 4000;

app.listen(port, () =>
  console.log(`Server currently running at http://localhost:${port}`)
);
