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
var User_exports = {};
__export(User_exports, {
  UserRouter: () => UserRouter
});
module.exports = __toCommonJS(User_exports);
var import_express = require("express");
var import_get = require("../../Controller/User/get.controller");
var import_login = require("../../Controller/User/login.controller");
var import_logout = require("../../Controller/User/logout.controller");
var import_signUp = require("../../Controller/User/signUp.controller");
var import_jwtAuth = require("../../Middlewares/jwtAuth");
var import_validateRequestPayload = require("../../Middlewares/validateRequestPayload");
var import_Login = require("../../Schemas/User/Login");
var import_SignUp = require("../../Schemas/User/SignUp");
const UserRouter = (0, import_express.Router)();
UserRouter.get("/", import_jwtAuth.authenticateWithJwt, import_get.getUser);
UserRouter.post("/signup", (0, import_validateRequestPayload.validateRequestPayload)(import_SignUp.signUpSchema), import_signUp.signUp);
UserRouter.post("/login", (0, import_validateRequestPayload.validateRequestPayload)(import_Login.loginSchema), import_login.login);
UserRouter.post("/logout", import_logout.logout);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserRouter
});
