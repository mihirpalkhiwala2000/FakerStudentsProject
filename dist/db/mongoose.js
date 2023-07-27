"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var dotenv = require("dotenv");
var constants_1 = require("../constants/constants");
dotenv.config();
mongoose
    .connect(process.env.DB_URL)
    .then(function () { return console.log(constants_1.successMsgs.dbConnected); });
//# sourceMappingURL=mongoose.js.map