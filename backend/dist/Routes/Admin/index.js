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
var Admin_exports = {};
__export(Admin_exports, {
  AdminRouter: () => AdminRouter
});
module.exports = __toCommonJS(Admin_exports);
var import_express = require("express");
var import_createElection = require("../../Controller/Admin/createElection");
var import_delete = require("../../Controller/Admin/delete");
var import_deleteOption = require("../../Controller/Admin/deleteOption");
var import_getElection = require("../../Controller/Admin/getElection");
var import_getElections = require("../../Controller/Admin/getElections");
var import_getUserVote = require("../../Controller/Admin/getUserVote");
var import_registerVote = require("../../Controller/Admin/registerVote");
var import_updateElection = require("../../Controller/Admin/updateElection");
var import_adminAuth = require("../../Middlewares/adminAuth");
var import_jwtAuth = require("../../Middlewares/jwtAuth");
var import_validateRequestPayload = require("../../Middlewares/validateRequestPayload");
var import_Admin = require("../../Schemas/Admin");
const AdminRouter = (0, import_express.Router)();
AdminRouter.get("/elections", import_jwtAuth.authenticateWithJwt, import_getElections.getElections);
AdminRouter.get("/elections/:electionId", import_jwtAuth.authenticateWithJwt, import_getElection.getElection);
AdminRouter.get("/elections/:electionId/vote", import_jwtAuth.authenticateWithJwt, import_getUserVote.getVote);
AdminRouter.post("/elections", import_jwtAuth.authenticateWithJwt, import_adminAuth.authenticateAdmin, (0, import_validateRequestPayload.validateRequestPayload)(import_Admin.createElectionSchema), import_createElection.createElection);
AdminRouter.post("/elections/vote", import_jwtAuth.authenticateWithJwt, (0, import_validateRequestPayload.validateRequestPayload)(import_Admin.createVoteSchema), import_registerVote.registerVote);
AdminRouter.put("/elections/:electionId", import_jwtAuth.authenticateWithJwt, import_adminAuth.authenticateAdmin, (0, import_validateRequestPayload.validateRequestPayload)(import_Admin.updateElectionSchema), import_updateElection.updateElection);
AdminRouter.delete("/elections/:electionId", import_jwtAuth.authenticateWithJwt, import_adminAuth.authenticateAdmin, import_delete.deleteElection);
AdminRouter.delete("/elections/options/:optionId", import_jwtAuth.authenticateWithJwt, import_adminAuth.authenticateAdmin, import_deleteOption.deleteOption);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AdminRouter
});
