require("dotenv").config();
const http = require("http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser());
app.use(router);

router.get("/", (req, res) => {
    res.json('NICE');
});


// server.listen("8080", () => {
//     console.log("nice");
// });

server.listen( process.env.PORT || 8080, () => {
    console.log("nice");
});