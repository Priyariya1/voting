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
  getAllPickups: () => getAllPickups,
  getRequestById: () => getRequestById,
  getRequestsByUserId: () => getRequestsByUserId
});
module.exports = __toCommonJS(PickupRequest_exports);
var import_DB = require("../../DB");
async function getRequestsByUserId(userId) {
  return await import_DB.PickupRequestRepository.findMany({ where: { user_id: userId } });
}
async function getRequestById(requestId) {
  return await import_DB.PickupRequestRepository.findFirst({ where: { id: requestId } });
}
async function getAllPickups(filter) {
  const { limit, offset, status } = filter ?? {};
  const queryFilter = {};
  if (limit !== void 0)
    queryFilter.take = limit;
  if (offset !== void 0)
    queryFilter.skip = offset;
  if (status)
    queryFilter.where = { status };
  return await import_DB.PickupRequestRepository.findMany({ orderBy: { createdAt: "desc" }, ...queryFilter });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAllPickups,
  getRequestById,
  getRequestsByUserId
});
