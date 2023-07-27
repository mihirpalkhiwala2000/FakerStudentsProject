"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEACHERS = void 0;
var faker_1 = require("@faker-js/faker");
function createRandomTeachers() {
    var _a = faker_1.faker.location.nearbyGPSCoordinate(), latitude = _a[0], longitude = _a[1];
    return {
        name: faker_1.faker.internet.userName(),
        email: faker_1.faker.internet.email(),
        location: {
            type: "Point",
            coordinates: [longitude, latitude],
        },
    };
}
exports.TEACHERS = faker_1.faker.helpers.multiple(createRandomTeachers, {
    count: 100,
});
//# sourceMappingURL=teacher-faker.js.map