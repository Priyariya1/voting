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
var Config_exports = {};
__export(Config_exports, {
  Config: () => Config
});
module.exports = __toCommonJS(Config_exports);
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
class Config {
  static clientUrl = process.env.CLIENT_URL || `http://localhost:3000`;
  static passwordSalt = process.env.PASSWORD_SALT || "afhsaifas323##$$%%^^";
  static authCookieName = "access_token";
  static authCookieOptions({ cookieForLogout, request }) {
    return {
      maxAge: cookieForLogout ? -1e4 : 1e3 * 60 * 60 * 48,
      // would expire after 2 days
      httpOnly: true,
      // The cookie only accessible by the web server
      // signed: true, // Indicates if the cookie should be signed
      path: "/",
      secure: request.headers.origin ? true : false,
      sameSite: "none"
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Config
});
