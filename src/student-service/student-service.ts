import { errorMsg } from "../constants/constants";
import Student, { StudentSchemaType } from "../schema/student-schema";

export const storeStudentsDetails = (data: StudentSchemaType[]) => {
  return Student.create(data);
};

export const updateStudentDetails = async (data: any) => {
  const updates = Object.keys(data);
  const allowedUpdates = ["name", "birthdate", "password", "marks", "email"];

  const isValidOperation = updates.every((update: string) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    throw Error(errorMsg.isNotValid);
  }
  const { email, name } = data;
  delete data.name;
  delete data.email;
  return Student.findOneAndUpdate({ email, name }, data, { new: true });
};
