const express = require('express'); // Express web server framework
const path = require("path");
//const PORT = "8888"; // use this locally
const PORT = process.env.PORT || 8888; // use this for when deploying on a server
const publicPath = path.join(__dirname + '/public');
const app = express();

app.use(express.static(publicPath));
app.get("/", (req, res) => res.sendFile(publicPath + "/index.html"));
app.get("/battle", (req, res) => res.sendFile(publicPath + "/battle.html"));
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
