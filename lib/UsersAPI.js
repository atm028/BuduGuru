const debug = require('debug')('UserAPI');
const express = require('express');
const router = express.Router();

class UserAPI {
    constructor() {
        this.name = "UserAPI;"
    }

    async get(req, res) { res.status(200).json({"msg": "/api/users GET"}); }
    async post(req, res) { res.status(200).json({"msg": "/api/users POST"}); }
    async put(req, res) { res.status(200).json({"msg": "/api/users PUT"}); }
    async delete(req, res) { res.status(200).json({"msg": "/api/users DELETE"}); }
};

const _handler = new UserAPI();
router.get("/api/users", async (req, res) => _handler.get(req, res))
router.post("/api/users", async (req, res) => _handler.post(req, res))
router.put("/api/users", async (req, res) => _handler.put(req, res))
router.delete("/api/users", async (req, res) => _handler.delete(req, res))


module.exports = router; 