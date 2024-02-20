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
var read_controller_exports = {};
__export(read_controller_exports, {
  readPickupRequests: () => readPickupRequests
});
module.exports = __toCommonJS(read_controller_exports);
var import_Exceptions = require("../../Exceptions");
var import_PickupRequest = require("../../Repositories/PickupRequest");
async function readPickupRequests(request, response, next) {
  try {
    const newRequest = request;
    const { user } = newRequest;
    const { pickupId } = request.params;
    const singlePickup = await isPickupRequestIdValid(pickupId, user);
    const pickup = !pickupId ? await (0, import_PickupRequest.getRequestsByUserId)(user.id) : singlePickup;
    response.json(pickup);
  } catch (err) {
    next(err);
  }
}
async function isPickupRequestIdValid(pickupId, user) {
  if (!pickupId)
    return true;
  if (!Number(pickupId))
    throw import_Exceptions.Exceptions.invalidRequest("Pickup request Id must be number");
  const pickup = await (0, import_PickupRequest.getRequestById)(Number(pickupId));
  if (!pickup || pickup.user_id !== user.id)
    throw import_Exceptions.Exceptions.invalidRequest("Invalid Pickup id");
  return pickup;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  readPickupRequests
});
