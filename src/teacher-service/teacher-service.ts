import Student from "../schema/student-schema";
import Teacher, { TeacherSchemaType } from "../schema/teacher-schema";
import { errorMsg } from "../constants/constants";

export const storeTeacherDetails = (data: TeacherSchemaType[]) => {
  return Teacher.create(data);
};

// export const nearestTeacherToStudent = async () => {
//   const student = await Student.find({});
//   const nearestTeacher = student.map(
//     async ({ location }: StudentSchemaType) => {
//       const unitValue = 1000;

//       const [temp] = await Teacher.aggregate([
//         {
//           $geoNear: {
//             near: {
//               type: "Point",
//               coordinates: location.coordinates,
//             },
//             distanceField: "distanceToTeacher",
//             distanceMultiplier: 1 / unitValue,
//           },
//         },
//         {
//           $sort: {
//             distance: 1,
//           },
//         },
//         { $limit: 1 },
//       ]);

//       return temp.distanceToTeacher;
//     }
//   );

//   return await nearestTeacher;
// };

export const totalStudentCount = async () => {
  const studentCount = await Student.aggregate([
    {
      $group: {
        _id: "$teacherId",
        totalStudentCount: { $count: {} },
      },
    },
  ]);
  return studentCount;
};

export const nearStudents = async (id: string) => {
  const teacherDetails = await Teacher.findById(id);

  if (!teacherDetails) {
    throw Error(errorMsg.noTeacher);
  }
  const { location, name, _id } = teacherDetails;

  const unitValue = 1000;

  const distanceToStudent = await Student.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: location.coordinates,
        },
        query: { teacherId: _id },
        distanceField: "distanceToStudent",
        distanceMultiplier: 1 / unitValue,
      },
    },
    {
      $sort: {
        distance: 1,
      },
    },
    { $project: { name: 1, email: 1, distanceToStudent: 1 } },
  ]);

  return { distanceToStudent, name };
};
