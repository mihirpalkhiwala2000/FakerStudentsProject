"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var validator_1 = require("validator");
var constants_1 = require("../constants/constants");
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
                throw new Error(constants_1.errorMsg.emailError);
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
    location: {
        type: {
            type: String,
            enum: ["Point"],
        },
        coordinates: {
            type: [Number],
        },
    },
    teacherId: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    distanceFromNearestTeacher: {
        type: Number,
    },
});
studentSchema.index({ location: "2dsphere" });
studentSchema.index({ email: 1, name: 1 });
var Student = (0, mongoose_1.model)("Student", studentSchema);
exports.default = Student;
//# sourceMappingURL=student-schema.js.map