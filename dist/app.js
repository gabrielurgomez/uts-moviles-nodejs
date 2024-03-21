"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
//aca importamos las rutas que creamos en la carpeta routes
const productos_routes_js_1 = __importDefault(require("./routes/productos.routes.js"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: '*' }));
app.use(express_1.default.json());
//app.listen(3000);
////////////////////////////////////////////////////////////////////////////////////////
//aca le decimos al servidor que rutas usar
app.use('/api', productos_routes_js_1.default);
//por si se solicita un endpoint que no exista
app.use((req, res, next) => {
    console.log("peticion a ruta no encontrada, respondiendo eso...");
    res.status(404).json({ message: 'Ruta no encontrada' });
});
exports.default = app;
