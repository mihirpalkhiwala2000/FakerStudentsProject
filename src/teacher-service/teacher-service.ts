import { ObjectId, Schema } from "mongoose";
import Student, { StudentSchemaType } from "../schema/student-schema";
import Teacher, { TeacherSchemaType } from "../schema/teacher-schema";
import { successMsgs } from "../constants/constants";

interface TeacherSchemaTypeWithId extends TeacherSchemaType {
  _id: string;
}

export const storeTeacherDetails = (data: TeacherSchemaType[]) => {
  return Teacher.create(data);
};

export const near = async () => {
  const student = await Student.find({});
  student.map(
    async ({ location, email, teacherId, name }: StudentSchemaType) => {
      const unitValue = 1000;

      const [nearestTeacher]: Array<TeacherSchemaType & { _id: ObjectId }> =
        await Teacher.aggregate([
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
        ]);
      if (teacherId && teacherId.toString() === nearestTeacher._id.toString()) {
      } else {
        await Student.findOneAndUpdate(
          { email, name },
          {
            teacherId: nearestTeacher._id,
            distanceFromNearestTeacher: nearestTeacher.distanceToStudent,
          },
          { new: true }
        );
      }
    }
  );
  return successMsgs.created;
};

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
