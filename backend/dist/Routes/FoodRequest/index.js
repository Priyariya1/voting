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
var FoodRequest_exports = {};
__export(FoodRequest_exports, {
  FoodRequestRouter: () => FoodRequestRouter
});
module.exports = __toCommonJS(FoodRequest_exports);
var import_express = require("express");
var import_create = require("../../Controller/PickupRequest/create.controller");
var import_jwtAuth = require("../../Middlewares/jwtAuth");
var import_validateRequestPayload = require("../../Middlewares/validateRequestPayload");
var import_create2 = require("../../Schemas/FoodRequest/create");
const FoodRequestRouter = (0, import_express.Router)();
FoodRequestRouter.post("/", import_jwtAuth.authenticateWithJwt, (0, import_validateRequestPayload.validateRequestPayload)(import_create2.createFoodRequestSchema), import_create.createPickupRequest);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FoodRequestRouter
});
