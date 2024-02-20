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
var getPickups_exports = {};
__export(getPickups_exports, {
  getElections: () => getElections
});
module.exports = __toCommonJS(getPickups_exports);
var import_DB = require("../../DB");
async function getElections(request, response, next) {
  try {
    const elections = await import_DB.ElectionRepository.findMany({
      select: {
        id: true,
        createdAt: true,
        description: true,
        status: true,
        title: true,
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
    response.json(elections);
  } catch (err) {
    next(err);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getElections
});
