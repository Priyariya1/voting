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
var validateRequestPayload_exports = {};
__export(validateRequestPayload_exports, {
  validateRequestPayload: () => validateRequestPayload
});
module.exports = __toCommonJS(validateRequestPayload_exports);
const validateRequestPayload = (schema) => {
  return (request, response, next) => {
    const isValid = schema.validate(request.body, {
      errors: {
        wrap: { label: "" }
      }
    });
    if (!isValid.error?.details)
      next();
    else {
      response.status(406).send({
        error: {
          code: 406,
          name: "Not Acceptable",
          message: isValid.error?.details[0].message,
          path: isValid.error?.details[0].path
        }
      });
    }
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  validateRequestPayload
});
