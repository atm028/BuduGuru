const {server} = require("./lib/server");

app = {};
app.init = () => {
    server.init();
};

app.init();

module.exports = app;