import * as express from "express";
import {
  near,
  storeTeacherDetails,
  totalStudentCount,
} from "./teacher-service";
import { TEACHERS } from "../faker/teacher-faker";
import { successMsgs } from "../constants/constants";
import Teacher from "../schema/teacher-schema";

const TeacherRouter = express.Router();
export default TeacherRouter;

TeacherRouter.post("", async (req, res) => {
  try {
    const created = await storeTeacherDetails(TEACHERS);
    res.send(successMsgs.created);
  } catch (e: any) {
    console.log(
      "🚀 ~ file: teacher-controller.ts:14 ~ TeacherRouter.post ~ e:",
      e
    );

    res.send(e.message);
  }
});

TeacherRouter.get("", async (req, res) => {
  try {
    res.send(await near());
  } catch (e: any) {
    console.log(
      "🚀 ~ file: teacher-controller.ts:14 ~ TeacherRouter.post ~ e:",
      e
    );

    res.send(e.message);
  }
});

TeacherRouter.get("/totalCount", async (req, res) => {
  try {
    const temp = await totalStudentCount();
    console.log(
      "🚀 ~ file: teacher-controller.ts:44 ~ TeacherRouter.get ~ temp:",
      temp
    );
    res.send(temp);
  } catch (e: any) {
    throw Error(e.message);
  }
});
