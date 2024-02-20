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
var Common_exports = {};
__export(Common_exports, {
  default: () => Common_default
});
module.exports = __toCommonJS(Common_exports);
var import_http_errors = __toESM(require("http-errors"));
const CommonExceptions = {
  somethingWentWrong(msg) {
    throw new import_http_errors.default.InternalServerError(msg ?? "something went wrong. contact support if the issue presist.");
  },
  toBeImplemented() {
    throw new import_http_errors.default.InternalServerError("this method has to be implemented.");
  },
  invalidRequest(msg) {
    throw new import_http_errors.default.BadRequest(msg ?? "invalid request.");
  },
  contactSupport() {
    throw new import_http_errors.default.BadRequest("caontact support.");
  },
  unProcessableEntry(msg) {
    throw new import_http_errors.default.UnprocessableEntity(msg ?? "Unprocessable Entry!, Please check the payload.");
  }
};
var Common_default = CommonExceptions;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
