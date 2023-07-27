import { faker } from "@faker-js/faker";
import { StudentSchemaType } from "../schema/student-schema";

function createRandomStudents(): StudentSchemaType {
  const [latitude, longitude] = faker.location.nearbyGPSCoordinate();

  return {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    marks: faker.number.int({ max: 100 }),
    gender: faker.person.sexType(),
    location: {
      type: "Point",
      coordinates: [longitude, latitude],
    },
  };
}

export const STUDENTS: StudentSchemaType[] = faker.helpers.multiple(
  createRandomStudents,
  {
    count: 50000,
  }
);
