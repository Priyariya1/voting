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
var delete_controller_exports = {};
__export(delete_controller_exports, {
  cancelPickupRequest: () => cancelPickupRequest
});
module.exports = __toCommonJS(delete_controller_exports);
var import_DB = require("../../DB");
var import_Exceptions = require("../../Exceptions");
async function cancelPickupRequest(request, response, next) {
  const newRequest = request;
  const { pickupId } = request.params;
  try {
    if (!pickupId)
      throw import_Exceptions.Exceptions.invalidRequest("Pickup id is missing.");
    if (!Number(pickupId))
      throw import_Exceptions.Exceptions.invalidRequest("Pickup id must be a number.");
    const existingRequest = await import_DB.PickupRequestRepository.findFirst({
      where: { id: Number(pickupId) }
    });
    if (!existingRequest)
      throw import_Exceptions.Exceptions.invalidRequest(`No pickup request with id ${pickupId} is found!`);
    const data = { status: "canceled" };
    const newEntry = await import_DB.PickupRequestRepository.update({ data, where: { id: Number(pickupId) } });
    response.send(newEntry);
  } catch (err) {
    next(err);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cancelPickupRequest
});
