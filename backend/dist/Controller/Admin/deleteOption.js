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
var deleteOption_exports = {};
__export(deleteOption_exports, {
  deleteOption: () => deleteOption
});
module.exports = __toCommonJS(deleteOption_exports);
var import_DB = require("../../DB");
async function deleteOption(request, response, next) {
  try {
    const newRequest = request;
    const { optionId } = newRequest.params;
    await import_DB.ElectionOptionRepository.delete({
      where: {
        id: Number(optionId)
      }
    });
    response.json({ status: "success" });
  } catch (err) {
    next(err);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deleteOption
});
