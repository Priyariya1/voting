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
var get_controller_exports = {};
__export(get_controller_exports, {
  getUser: () => getUser
});
module.exports = __toCommonJS(get_controller_exports);
async function getUser(request, response, next) {
  const authRequest = request;
  const { email, name, uuid, role } = authRequest.user;
  return response.json({ email, name, uuid, role });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getUser
});
