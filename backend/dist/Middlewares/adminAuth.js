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
var adminAuth_exports = {};
__export(adminAuth_exports, {
  authenticateAdmin: () => authenticateAdmin
});
module.exports = __toCommonJS(adminAuth_exports);
var import_Exceptions = require("../Exceptions");
async function authenticateAdmin(request, response, next) {
  try {
    const newRequest = request;
    const { user } = newRequest;
    if (user.role !== "admin")
      throw import_Exceptions.Exceptions.unAuthorized(`You don't have access to this resources. `);
    return next();
  } catch (error) {
    return response.status(error.statusCode ?? 401).send({
      error: {
        code: error?.statusCode ?? 401,
        name: error.name,
        message: error.message
      }
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authenticateAdmin
});
