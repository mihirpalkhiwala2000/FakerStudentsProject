"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var student_controller_1 = require("./student-service/student-controller");
var teacher_controller_1 = require("./teacher-service/teacher-controller");
Promise.resolve().then(function () { return require("./db/mongoose"); });
var app = express();
var port = process.env.PORT || 3000;
app.use(express.json());
app.use("/students", student_controller_1.default);
app.use("/teachers", teacher_controller_1.default);
app.listen(port, function () {
    console.log("Server is up on port " + port);
});
//# sourceMappingURL=index.js.map