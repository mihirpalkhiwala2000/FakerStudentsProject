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
exports.createRandomStudents = void 0;
var faker_1 = require("@faker-js/faker");
var teacher_schema_1 = require("../schema/teacher-schema");
var constants_1 = require("../constants/constants");
var createRandomStudents = function () { return __awaiter(void 0, void 0, void 0, function () {
    var teacherList;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, teacher_schema_1.default.find({}, "_id")
                    .exec()
                    .then(function (data) {
                    return data.map(function (teacher) { return teacher._id; });
                })];
            case 1:
                teacherList = _a.sent();
                if (!teacherList.length) {
                    throw Error(constants_1.errorMsg.teachersNotCreated);
                }
                return [2 /*return*/, faker_1.faker.helpers.multiple(function () {
                        var _a = faker_1.faker.location.nearbyGPSCoordinate(), latitude = _a[0], longitude = _a[1];
                        return {
                            name: faker_1.faker.internet.userName(),
                            email: faker_1.faker.internet.email(),
                            password: faker_1.faker.internet.password(),
                            birthdate: faker_1.faker.date.birthdate(),
                            marks: faker_1.faker.number.int({ max: 100 }),
                            gender: faker_1.faker.person.sexType(),
                            location: {
                                type: "Point",
                                coordinates: [longitude, latitude],
                            },
                            teacherId: faker_1.faker.helpers.arrayElement(teacherList),
                        };
                    }, {
                        count: 100000,
                    })];
        }
    });
}); };
exports.createRandomStudents = createRandomStudents;
//# sourceMappingURL=student-faker.js.map