import { ObjectId, Schema, model } from "mongoose";
import validator from "validator";
import { errorMsg } from "../constants/constants";
import { Addresstype } from "./teacher-schema";

export interface StudentSchemaType {
  name: string;
  email: string;
  birthdate: Date;
  password: string;
  gender: string;
  marks: number;
  location: Addresstype;
  teacherId?: ObjectId;
  distanceFromNearestTeacher?: number;
}
const studentSchema = new Schema<StudentSchemaType>({
  name: {
    type: String,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate(value: string) {
      if (!validator.isEmail(value)) {
        throw new Error(errorMsg.emailError);
      }
    },
  },
  birthdate: {
    type: Date,
  },
  password: {
    type: String,
  },
  gender: {
    type: String,
  },
  marks: {
    type: Number,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
    },
  },
  teacherId: {
    type: Schema.Types.ObjectId,
  },
  distanceFromNearestTeacher: {
    type: Number,
  },
});
studentSchema.index({ location: "2dsphere" });
studentSchema.index({ email: 1, name: 1 });

const Student = model("Student", studentSchema);
export default Student;
