const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Hurray am tying to master these backend"));

app.listen(4000, () => console.log("Listening on port 4000"));
