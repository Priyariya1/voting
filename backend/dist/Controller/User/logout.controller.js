"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var logout_controller_exports = {};
__export(logout_controller_exports, {
  logout: () => logout
});
module.exports = __toCommonJS(logout_controller_exports);
var import_Config = require("../../Config");
async function logout(request, response, next) {
  response.clearCookie(import_Config.Config.authCookieName);
  response.send();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  logout
});
