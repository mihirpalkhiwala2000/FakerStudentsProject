"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var validator_1 = require("validator");
var constants_1 = require("../constants/constants");
var teacherSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        validate: function (value) {
            if (!validator_1.default.isEmail(value)) {
                throw new Error(constants_1.errorMsg.emailError);
            }
        },
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
        },
        coordinates: {
            type: [Number, Number],
        },
    },
    distanceToStudent: {
        type: Number,
    },
    totalStudentCount: {
        type: Number,
    },
});
teacherSchema.index({ location: "2dsphere" });
var Teacher = (0, mongoose_1.model)("Teacher", teacherSchema);
exports.default = Teacher;
//# sourceMappingURL=teacher-schema.js.map