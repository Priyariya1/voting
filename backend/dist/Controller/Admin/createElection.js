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
var createElection_exports = {};
__export(createElection_exports, {
  createElection: () => createElection
});
module.exports = __toCommonJS(createElection_exports);
var import_DB = require("../../DB");
async function createElection(request, response, next) {
  const newRequest = request;
  const { user } = newRequest;
  const { description, options, title, endTime, startTime } = newRequest.body;
  const newElection = await import_DB.ElectionRepository.create({
    data: { title, description, status: "active", user_id: user.id }
  });
  const newOptions = options.map(async (option) => {
    const data = {
      title: option.title,
      description: option.description,
      pollId: newElection.id,
      startingDate: startTime,
      endingDate: endTime
    };
    return await import_DB.ElectionOptionRepository.create({ data });
  });
  await Promise.allSettled(newOptions);
  return response.send(newElection);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createElection
});
