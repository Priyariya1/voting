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
var DB_exports = {};
__export(DB_exports, {
  ElectionOptionRepository: () => ElectionOptionRepository,
  ElectionRepository: () => ElectionRepository,
  PickupRequestRepository: () => PickupRequestRepository,
  UsersRepository: () => UsersRepository,
  VoteRepository: () => VoteRepository,
  db: () => db
});
module.exports = __toCommonJS(DB_exports);
var import_client = require("@prisma/client");
const db = new import_client.PrismaClient({
  log: ["query", "info", "warn", "error"]
});
const UsersRepository = db.user;
const PickupRequestRepository = db.pickupRequest;
const ElectionRepository = db.election;
const ElectionOptionRepository = db.pollingOptions;
const VoteRepository = db.vote;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ElectionOptionRepository,
  ElectionRepository,
  PickupRequestRepository,
  UsersRepository,
  VoteRepository,
  db
});
