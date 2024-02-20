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
var signUp_controller_exports = {};
__export(signUp_controller_exports, {
  signUp: () => signUp
});
module.exports = __toCommonJS(signUp_controller_exports);
var bcrypt = __toESM(require("bcrypt"));
var _ = __toESM(require("lodash"));
var import_DB = require("../../DB");
var import_Exceptions = require("../../Exceptions");
var import_User = require("../../Repositories/User");
async function signUp(request, response, next) {
  const { email, name, password } = request.body;
  try {
    const existingUser = await (0, import_User.getUserByEmail)(email);
    if (existingUser)
      import_Exceptions.Exceptions.invalidRequest(`Email address '${email}' already exists. please login`);
    const newUser = await createNewUser({ email, name, password });
    const safeToReturn = _.omit(newUser, ["id", "password"]);
    return response.json(safeToReturn);
  } catch (error) {
    return next(error);
  }
}
async function createNewUser(data) {
  const salt = await bcrypt.genSalt(10);
  data.password = await bcrypt.hash(data.password, salt);
  try {
    return await import_DB.UsersRepository.create({ data });
  } catch (error) {
    throw import_Exceptions.Exceptions.invalidRequest(`Sorrry, failed to add new user ${error.message ?? ""}`);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  signUp
});
