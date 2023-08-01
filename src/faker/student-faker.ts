import { faker } from "@faker-js/faker";
import { StudentSchemaType } from "../schema/student-schema";
import Teacher from "../schema/teacher-schema";
import { errorMsg } from "../constants/constants";

export const createRandomStudents = async (): Promise<StudentSchemaType[]> => {
  const teacherList = await Teacher.find({}, "_id")
    .exec()
    .then((data) => {
      return data.map((teacher) => teacher._id.toString());
    });
  if (!teacherList.length) {
    throw Error(errorMsg.teachersNotCreated);
  }
  return faker.helpers.multiple(
    () => {
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
        teacherId: faker.helpers.arrayElement(teacherList),
      };
    },
    {
      count: 100000,
    }
  );
};
