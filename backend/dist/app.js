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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
// Importing config
const config_1 = __importDefault(require("./config"));
// Routing
const routes_1 = __importDefault(require("./routes"));
// Utils
const logger_1 = __importDefault(require("./utils/logger"));
// Middlewares
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_compress_1 = __importDefault(require("koa-compress"));
const kcors_1 = __importDefault(require("kcors"));
const logger_2 = __importDefault(require("./middleware/logger"));
const app = new koa_1.default();
app.use(koa_compress_1.default());
app.use(kcors_1.default(config_1.default.server.cors));
app.use(koa_bodyparser_1.default());
app.use(logger_2.default);
app.use(routes_1.default);
/**
 * Server start
 */
app.start = () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info("Starting app...");
    // Start database connection
    // await database.start()
});
app.stop = () => {
    logger_1.default.info("Stopping app...");
};
app.listen(config_1.default.server.port, () => {
    logger_1.default.info(`App has started on port: ${config_1.default.server.port} :)`);
});
if (require.main === module) {
    app.start();
}
/**
 * If application is closing
 */
process.once('SIGINT', () => { app.stop(); });
process.once('SIGTERM', () => { app.stop(); });
exports.default = app;
