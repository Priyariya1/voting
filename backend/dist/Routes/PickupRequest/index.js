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
var PickupRequest_exports = {};
__export(PickupRequest_exports, {
  PickupRequestRouter: () => PickupRequestRouter
});
module.exports = __toCommonJS(PickupRequest_exports);
var import_express = require("express");
var import_create = require("../../Controller/PickupRequest/create.controller");
var import_delete = require("../../Controller/PickupRequest/delete.controller");
var import_read = require("../../Controller/PickupRequest/read.controller");
var import_test = require("../../Controller/PickupRequest/test");
var import_update = require("../../Controller/PickupRequest/update.controller");
var import_jwtAuth = require("../../Middlewares/jwtAuth");
var import_validateRequestPayload = require("../../Middlewares/validateRequestPayload");
var import_create2 = require("../../Schemas/FoodRequest/create");
var import_update2 = require("../../Schemas/FoodRequest/update");
const PickupRequestRouter = (0, import_express.Router)();
PickupRequestRouter.post("/", import_jwtAuth.authenticateWithJwt, (0, import_validateRequestPayload.validateRequestPayload)(import_create2.createFoodRequestSchema), import_create.createPickupRequest);
PickupRequestRouter.patch("/:pickupId", import_jwtAuth.authenticateWithJwt, (0, import_validateRequestPayload.validateRequestPayload)(import_update2.updateFoodRequestSchema), import_update.updatePickupRequest);
PickupRequestRouter.get("/", import_jwtAuth.authenticateWithJwt, import_read.readPickupRequests);
PickupRequestRouter.get("/test", import_jwtAuth.authenticateWithJwt, import_test.test);
PickupRequestRouter.get("/:pickupId", import_jwtAuth.authenticateWithJwt, import_read.readPickupRequests);
PickupRequestRouter.delete("/:pickupId", import_jwtAuth.authenticateWithJwt, import_delete.cancelPickupRequest);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PickupRequestRouter
});
