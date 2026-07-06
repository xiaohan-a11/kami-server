const express = require("express");
const router = express.Router();
const db = require("../database/db");

// 客户端验证卡密
router.post("/verify", (req, res) => {
    const { license_key, device } = req.body;

    if (!license_key || !device) {
        return res.json({
            success: false,
            msg: "参数错误"
        });
    }

    const card = db.prepare(
        "SELECT * FROM cards WHERE license_key=?"
    ).get(license_key);

    if (!card) {
        return res.json({
            success: false,
            msg: "卡密不存在"
        });
    }

    if (card.status === 1) {
        return res.json({
            success: false,
            msg: "卡密已使用"
        });
    }

    db.prepare(
        "UPDATE cards SET status=1, bind_device=? WHERE license_key=?"
    ).run(device, license_key);

    res.json({
        success: true,
        msg: "验证成功"
    });
});

module.exports = router;
