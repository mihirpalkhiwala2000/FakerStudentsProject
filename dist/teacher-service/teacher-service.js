"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.totalStudentCount = exports.near = exports.storeTeacherDetails = void 0;
var student_schema_1 = require("../schema/student-schema");
var teacher_schema_1 = require("../schema/teacher-schema");
var constants_1 = require("../constants/constants");
var storeTeacherDetails = function (data) {
    return teacher_schema_1.default.create(data);
};
exports.storeTeacherDetails = storeTeacherDetails;
var near = function () { return __awaiter(void 0, void 0, void 0, function () {
    var student;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, student_schema_1.default.find({})];
            case 1:
                student = _a.sent();
                student.map(function (_a) {
                    var location = _a.location, email = _a.email, teacherId = _a.teacherId, name = _a.name;
                    return __awaiter(void 0, void 0, void 0, function () {
                        var unitValue, nearestTeacher;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    unitValue = 1000;
                                    return [4 /*yield*/, teacher_schema_1.default.aggregate([
                                            {
                                                $geoNear: {
                                                    near: {
                                                        type: "Point",
                                                        coordinates: location.coordinates,
                                                    },
                                                    distanceField: "distanceToStudent",
                                                    distanceMultiplier: 1 / unitValue,
                                                },
                                            },
                                            {
                                                $sort: {
                                                    distance: 1,
                                                },
                                            },
                                            { $limit: 1 },
                                        ])];
                                case 1:
                                    nearestTeacher = (_b.sent())[0];
                                    if (!(teacherId && teacherId.toString() === nearestTeacher._id.toString())) return [3 /*break*/, 2];
                                    return [3 /*break*/, 4];
                                case 2: return [4 /*yield*/, student_schema_1.default.findOneAndUpdate({ email: email, name: name }, {
                                        teacherId: nearestTeacher._id,
                                        distanceFromNearestTeacher: nearestTeacher.distanceToStudent,
                                    }, { new: true })];
                                case 3:
                                    _b.sent();
                                    _b.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    });
                });
                return [2 /*return*/, constants_1.successMsgs.created];
        }
    });
}); };
exports.near = near;
var totalStudentCount = function () { return __awaiter(void 0, void 0, void 0, function () {
    var studentCount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, student_schema_1.default.aggregate([
                    {
                        $group: {
                            _id: "$teacherId",
                            totalStudentCount: { $count: {} },
                        },
                    },
                ])];
            case 1:
                studentCount = _a.sent();
                return [2 /*return*/, studentCount];
        }
    });
}); };
exports.totalStudentCount = totalStudentCount;
//# sourceMappingURL=teacher-service.js.map