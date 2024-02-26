"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const measurementsRouter = express_1.default.Router();
const influxdb3_client_1 = require("@influxdata/influxdb3-client");
const token = process.env.INFLUXDB_TOKEN;
function main() {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const client = new influxdb3_client_1.InfluxDBClient({ host: 'https://eu-central-1-1.aws.cloud2.influxdata.com', token: token });
        const query = 'SELECT * FROM \'home3\'';
        // WHERE time >= now() - interval '24 hours' AND 
        // ('bees' IS NOT NULL OR 'ants' IS NOT NULL) order by time asc`
        // eslint-disable-next-line @typescript-eslint/await-thenable
        const rows = yield client.query(query, 'sensors1');
        const measurements = [];
        try {
            for (var _d = true, rows_1 = __asyncValues(rows), rows_1_1; rows_1_1 = yield rows_1.next(), _a = rows_1_1.done, !_a; _d = true) {
                _c = rows_1_1.value;
                _d = false;
                const row = _c;
                if ('time' in row && typeof row.time === 'number' && 'location' in row && typeof row.location === 'string' && 'light' in row && typeof row.light === 'string') {
                    measurements.push(row);
                }
                else {
                    throw new Error('Invalid data from InfluxDB!');
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = rows_1.return)) yield _b.call(rows_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        client.close();
        return measurements;
    });
}
measurementsRouter.get('/', (_req, res) => {
    main()
        .then(data => {
        console.log('Measurements retrieved');
        res.json(data);
    })
        .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Measurements incorret or not found' });
    });
});
exports.default = measurementsRouter;
