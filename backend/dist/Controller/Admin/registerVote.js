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
var registerVote_exports = {};
__export(registerVote_exports, {
  registerVote: () => registerVote
});
module.exports = __toCommonJS(registerVote_exports);
var import_DB = require("../../DB");
async function registerVote(request, response, next) {
  const newRequest = request;
  const { user } = newRequest;
  const { electionId, optionId } = newRequest.body;
  try {
    const newVote = await import_DB.VoteRepository.create({
      data: { user_id: user.id, electionId, optionId }
    });
    return response.send(newVote);
  } catch (err) {
    next(err);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  registerVote
});
