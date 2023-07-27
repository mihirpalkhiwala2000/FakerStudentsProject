"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STUDENTS = exports.createRandomStudents = void 0;
var faker_1 = require("@faker-js/faker");
function createRandomStudents() {
    return {
        name: faker_1.faker.internet.userName(),
        email: faker_1.faker.internet.email(),
        password: faker_1.faker.internet.password(),
        birthdate: faker_1.faker.date.birthdate(),
        marks: faker_1.faker.number.int({ max: 100 }),
        gender: faker_1.faker.person.sexType(),
        address: faker_1.faker.location.streetAddress(),
    };
}
exports.createRandomStudents = createRandomStudents;
exports.STUDENTS = faker_1.faker.helpers.multiple(createRandomStudents, {
    count: 50000,
});
//# sourceMappingURL=faker.js.map