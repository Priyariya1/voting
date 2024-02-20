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
var Admin_exports = {};
__export(Admin_exports, {
  createElectionOptionsSchema: () => createElectionOptionsSchema,
  createElectionSchema: () => createElectionSchema,
  createVoteSchema: () => createVoteSchema,
  updateElectionOptionsSchema: () => updateElectionOptionsSchema,
  updateElectionSchema: () => updateElectionSchema,
  updateFoodRequestSchema: () => updateFoodRequestSchema
});
module.exports = __toCommonJS(Admin_exports);
var import_joi = __toESM(require("joi"));
const updateFoodRequestSchema = import_joi.default.object({
  status: import_joi.default.string().required().valid("completed", "pending", "failed", "rejected", "cancelled")
});
const createElectionOptionsSchema = import_joi.default.object({
  title: import_joi.default.string().min(1).required(),
  description: import_joi.default.string().min(5).required()
});
const updateElectionOptionsSchema = import_joi.default.object({
  title: import_joi.default.string().min(1).required(),
  description: import_joi.default.string().min(5).required(),
  id: import_joi.default.number()
});
const createElectionSchema = import_joi.default.object({
  title: import_joi.default.string().min(5).required(),
  description: import_joi.default.string().min(5).required(),
  startTime: import_joi.default.string().required(),
  endTime: import_joi.default.string().required(),
  options: import_joi.default.array().items(createElectionOptionsSchema).required()
});
const updateElectionSchema = import_joi.default.object({
  title: import_joi.default.string().min(5).required(),
  description: import_joi.default.string().min(5).required(),
  options: import_joi.default.array().items(updateElectionOptionsSchema).required(),
  status: import_joi.default.string().required().valid("pending", "active", "completed", "canceled")
});
const createVoteSchema = import_joi.default.object({
  electionId: import_joi.default.number().min(1).required(),
  optionId: import_joi.default.number().min(1).required()
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createElectionOptionsSchema,
  createElectionSchema,
  createVoteSchema,
  updateElectionOptionsSchema,
  updateElectionSchema,
  updateFoodRequestSchema
});
