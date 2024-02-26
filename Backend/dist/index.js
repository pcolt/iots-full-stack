"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const measurements_controller_1 = __importDefault(require("./controllers/measurements_controller"));
const port = process.env.PORT;
// await main()
const app = (0, express_1.default)();
// app.use(express.json())
app.get('/', (_req, res) => {
    res.send('Hello World!');
});
app.use('/measurements', measurements_controller_1.default);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
