const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../database/db");

const router = express.Router();

// ===== 注册 =====
router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.json({ success: false, message: "不能为空" });
    }

    const user = db.prepare("SELECT * FROM users WHERE username=?").get(username);

    if (user) {
        return res.json({ success: false, message: "用户已存在" });
    }

    const hash = await bcrypt.hash(password, 10);

    db.prepare("INSERT INTO users (username,password) VALUES (?,?)")
      .run(username, hash);

    res.json({ success: true, message: "注册成功" });
});

// ===== 登录 =====
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = db.prepare("SELECT * FROM users WHERE username=?").get(username);

    if (!user) {
        return res.json({ success: false, message: "账号不存在" });
    }

    const ok = await bcrypt.compare(password, user.password);

    if (!ok) {
        return res.json({ success: false, message: "密码错误" });
    }

    const token = jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        process.env.JWT_SECRET || "kami_secret",
        { expiresIn: "7d" }
    );

    res.json({
        success: true,
        token
    });
});

module.exports = router;
