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
var handleErrors_exports = {};
__export(handleErrors_exports, {
  ExceptionHandler: () => ExceptionHandler,
  PayloadErrorHandler: () => PayloadErrorHandler
});
module.exports = __toCommonJS(handleErrors_exports);
var import_Exceptions = require("../Exceptions");
const PayloadErrorHandler = (error, request, response, next) => {
  try {
    if (error instanceof SyntaxError && error?.status === 400 && "body" in error) {
      console.error(error);
      import_Exceptions.Exceptions.unProcessableEntry();
    }
  } catch (err) {
    ExceptionHandler(err, request, response, next);
  }
  next();
};
const ExceptionHandler = (_error, _request, _response, _next) => {
  try {
    console.log(_error);
    const newError = {
      code: _error?.statusCode ?? 400,
      name: _error.name,
      message: _error.message
    };
    console.log({ newError });
    _response.status(_error?.statusCode ?? 400).send({ error: newError });
  } catch (err) {
    _response.send(400).send({ error: { message: "unhandled error!..." } });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ExceptionHandler,
  PayloadErrorHandler
});
