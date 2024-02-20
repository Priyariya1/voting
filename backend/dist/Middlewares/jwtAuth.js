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
var jwtAuth_exports = {};
__export(jwtAuth_exports, {
  authenticateWithJwt: () => authenticateWithJwt
});
module.exports = __toCommonJS(jwtAuth_exports);
var import_Exceptions = require("../Exceptions");
var import_User = require("../Repositories/User");
var import_jwt = require("../Services/jwt");
async function authenticateWithJwt(request, response, next) {
  try {
    const authToken = request.cookies.access_token;
    if (!authToken)
      throw import_Exceptions.Exceptions.authorizationHeaderMissing();
    const payload = import_jwt.Jwt.decode(authToken);
    if (!payload || typeof payload === "string")
      throw import_Exceptions.Exceptions.unAuthorized();
    const { email, uuid } = payload;
    const user = await (0, import_User.getUserByEmailAndUuid)(email, uuid);
    if (!user)
      throw import_Exceptions.Exceptions.unAuthorized();
    request;
    request.user = user;
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
  authenticateWithJwt
});
