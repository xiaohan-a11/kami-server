const express = require("express");
const cors = require("cors");

require("./database/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        status: "success",
        message: "卡密服务器运行成功"
    });
});

app.listen(3000, () => {
    console.log("Server running at http://0.0.0.0:3000");
});

