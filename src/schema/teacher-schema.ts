import { Schema, model } from "mongoose";
import validator from "validator";
import { errorMsg } from "../constants/constants";

export interface Addresstype {
  type: string;
  coordinates: [number, number];
}
export interface TeacherSchemaType {
  name: string;
  email: string;
  location: Addresstype;
  _id?: Schema.Types.ObjectId;
}
const teacherSchema = new Schema<TeacherSchemaType>({
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
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number, Number],
    },
  },
});

teacherSchema.index({ location: "2dsphere" });
const Teacher = model("Teacher", teacherSchema);
export default Teacher;
