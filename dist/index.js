"use strict";
exports.__esModule = true;
var http = require("http");
var debug_1 = require("debug");
var App_1 = require("./App");
(0, debug_1["default"])('ts-express:server');
var port = normalizePort(process.env.PORT || 3200);
console.log("Starting server on port: ", port);
console.log("use http://localhost:3200/docs/index.html to access server documentation");
App_1["default"].set('port', port);
var server = http.createServer(App_1["default"]);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
function normalizePort(val) {
    var port = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port))
        return val;
    else if (port >= 0)
        return port;
    else
        return false;
}
function onError(error) {
    if (error.syscall !== 'listen')
        throw error;
    var bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + " requires elevated privileges");
            process.exit(1);
        case 'EADDRINUSE':
            console.error(bind + " is already in use");
            process.exit(1);
        default:
            throw error;
    }
}
function onListening() {
    var addr = server.address();
    var bind = (typeof addr === 'string') ? "pipe " + addr : "port " + addr.port;
    (0, debug_1["default"])("Listening on " + bind);
}
