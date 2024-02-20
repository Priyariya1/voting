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
var getElection_exports = {};
__export(getElection_exports, {
  getElection: () => getElection
});
module.exports = __toCommonJS(getElection_exports);
var import_DB = require("../../DB");
var import_Exceptions = require("../../Exceptions");
async function getElection(request, response, next) {
  try {
    const { electionId } = request.params;
    await isPickupRequestIdValid(electionId);
    const election = await import_DB.ElectionRepository.findFirst({
      where: { id: Number(electionId) },
      select: {
        id: true,
        createdAt: true,
        description: true,
        status: true,
        title: true,
        startingDate: true,
        endingDate: true,
        options: {
          select: {
            id: true,
            description: true,
            title: true,
            _count: {
              select: {
                vote: true
              }
            }
          }
        },
        _count: {
          select: {
            vote: true
          }
        }
      }
    });
    return response.json(election);
  } catch (err) {
    next(err);
  }
}
async function isPickupRequestIdValid(pickupId) {
  if (!pickupId)
    throw import_Exceptions.Exceptions.invalidRequest("Pickup request Id must be number");
  if (!Number(pickupId))
    throw import_Exceptions.Exceptions.invalidRequest("Pickup request Id must be number");
  const pickup = await import_DB.ElectionRepository.findFirst({ where: { id: Number(pickupId) } });
  return pickup;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getElection
});
