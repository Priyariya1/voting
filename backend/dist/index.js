"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var src_exports = {};
__export(src_exports, {
  App: () => App
});
module.exports = __toCommonJS(src_exports);
var import_express = __toESM(require("express"));
var import_body_parser = __toESM(require("body-parser"));
var import_cookie_parser = __toESM(require("cookie-parser"));
var import_cors = __toESM(require("cors"));
var dotenv = __toESM(require("dotenv"));
var import_User = require("./Routes/User");
var import_Cors = require("./Config/Cors");
var import_handleErrors = require("./Middlewares/handleErrors");
var import_PickupRequest = require("./Routes/PickupRequest");
var import_Admin = require("./Routes/Admin");
dotenv.config();
const App = (0, import_express.default)();
initServer();
function initServer() {
  try {
    App.use((0, import_express.json)({ limit: "5mb" }));
    App.use((0, import_cookie_parser.default)());
    App.use(import_body_parser.default.urlencoded({ extended: true }));
    App.use((0, import_cors.default)(import_Cors.CorsConfig));
    App.use(import_handleErrors.PayloadErrorHandler);
    App.get("/", (req, res) => res.send(`Hey there it's lonely here..... \u{1F614}`));
    App.use("/user", import_User.UserRouter);
    App.use("/request", import_PickupRequest.PickupRequestRouter);
    App.use("/admin", import_Admin.AdminRouter);
    App.use(import_handleErrors.ExceptionHandler);
    const PORT = process.env.PORT || 5e3;
    App.listen(PORT, () => console.log(`\u{1F680} server running on @${PORT}`));
  } catch (e) {
    console.error(`Error initializing app -${e.message}`);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  App
});
