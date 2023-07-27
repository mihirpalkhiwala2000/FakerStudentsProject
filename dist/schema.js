"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var validator_1 = require("validator");
var constants_1 = require("./constants/constants");
var studentSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        validate: function (value) {
            if (!validator_1.default.isEmail(value)) {
                throw new Error(constants_1.errormsg.emailError);
            }
        },
    },
    birthdate: {
        type: Date,
    },
    password: {
        type: String,
    },
    gender: {
        type: String,
    },
    marks: {
        type: Number,
    },
});
studentSchema.index({ name: 1, marks: -1 }, { unique: true });
var Student = (0, mongoose_1.model)("Student", studentSchema);
exports.default = Student;
//# sourceMappingURL=schema.js.map