const express = require("express");
const cors = require("cors");
const path = require("path");

require("./database/db");

const authRouter = require("./routes/auth");
const clientRouter = require("./routes/client");

const app = express();

app.use(cors());
app.use(express.json());

// =======================
// 静态页面（前端）
 // =======================
app.use(express.static(path.join(__dirname, "public")));

// =======================
// API统一前缀（关键！！！）
// =======================
app.use("/api/auth", authRouter);
app.use("/api/client", clientRouter);

// =======================
// 测试接口
// =======================
app.get("/api", (req, res) => {
    res.send("Kami Server Running");
});

// =======================
// 启动服务
// =======================
const PORT = 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`服务器启动成功: http://0.0.0.0:${PORT}`);
});
