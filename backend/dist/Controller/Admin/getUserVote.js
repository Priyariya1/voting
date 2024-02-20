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
var getUserVote_exports = {};
__export(getUserVote_exports, {
  getVote: () => getVote
});
module.exports = __toCommonJS(getUserVote_exports);
var import_DB = require("../../DB");
var import_Exceptions = require("../../Exceptions");
async function getVote(request, response, next) {
  try {
    const { electionId } = request.params;
    const newRequest = request;
    const { user } = newRequest;
    if (!electionId)
      throw import_Exceptions.Exceptions.invalidRequest("election id must be provided");
    const vote = await import_DB.VoteRepository.findFirst({
      where: {
        user_id: user.id,
        electionId: Number(electionId)
      }
    });
    response.json(vote);
  } catch (err) {
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getVote
});
