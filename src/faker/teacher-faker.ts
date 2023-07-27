import { faker } from "@faker-js/faker";
import { TeacherSchemaType } from "../schema/teacher-schema";

function createRandomTeachers(): TeacherSchemaType {
  const [latitude, longitude] = faker.location.nearbyGPSCoordinate();
  return {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    location: {
      type: "Point",
      coordinates: [longitude, latitude],
    },
  };
}

export const TEACHERS: TeacherSchemaType[] = faker.helpers.multiple(
  createRandomTeachers,
  {
    count: 100,
  }
);
