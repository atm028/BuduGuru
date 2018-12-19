const debug = require('debug')('UserAPI');

class UserAPI {
    constructor() {
        this.name = "UserAPI;"
    }

    async get(req, res) { res.status(200).json({"msg": "/api/users GET"}); }
    async post(req, res) { res.status(200).json({"msg": "/api/users POST"}); }
    async put(req, res) { res.status(200).json({"msg": "/api/users PUT"}); }
    async delete(req, res) { res.status(200).json({"msg": "/api/users DELETE"}); }
};

module.exports = (app) => {
    const _handler = new UserAPI();
    app
        .get("/api/users", async (req, res) => _handler.get(req, res))
        .post("/api/users", async (req, res) => _handler.post(req, res))
        .put("/api/users", async (req, res) => _handler.put(req, res))
        .delete("/api/users", async (req, res) => _handler.delete(req, res))
};