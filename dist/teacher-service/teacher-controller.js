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
var express = require("express");
var teacher_service_1 = require("./teacher-service");
var teacher_faker_1 = require("../faker/teacher-faker");
var constants_1 = require("../constants/constants");
var TeacherRouter = express.Router();
exports.default = TeacherRouter;
TeacherRouter.post("", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var created, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, teacher_service_1.storeTeacherDetails)(teacher_faker_1.TEACHERS)];
            case 1:
                created = _a.sent();
                res.send(constants_1.successMsgs.created);
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                console.log("🚀 ~ file: teacher-controller.ts:14 ~ TeacherRouter.post ~ e:", e_1);
                res.send(e_1.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// TeacherRouter.get("", async (req, res) => {
//   try {
//     res.send(await nearestTeacherToStudent());
//   } catch (e: any) {
//     console.log(
//       "🚀 ~ file: teacher-controller.ts:14 ~ TeacherRouter.post ~ e:",
//       e
//     );
//     res.send(e.message);
//   }
// });
TeacherRouter.get("/totalCount", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var temp, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, teacher_service_1.totalStudentCount)()];
            case 1:
                temp = _a.sent();
                console.log("🚀 ~ file: teacher-controller.ts:44 ~ TeacherRouter.get ~ temp:", temp);
                res.send(temp);
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                throw Error(e_2.message);
            case 3: return [2 /*return*/];
        }
    });
}); });
TeacherRouter.post("/nearestStudents/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, distanceToStudent, name_1, e_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, (0, teacher_service_1.nearStudents)(id)];
            case 1:
                _a = _b.sent(), distanceToStudent = _a.distanceToStudent, name_1 = _a.name;
                res.send({
                    message: "Distance from ".concat(name_1, " of student"),
                    distanceToStudent: distanceToStudent,
                });
                return [3 /*break*/, 3];
            case 2:
                e_3 = _b.sent();
                res.send(e_3.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=teacher-controller.js.map