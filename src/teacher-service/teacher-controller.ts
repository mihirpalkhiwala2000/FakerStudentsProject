import * as express from "express";
import {
  nearStudents,
  storeTeacherDetails,
  totalStudentCount,
} from "./teacher-service";
import { TEACHERS } from "../faker/teacher-faker";
import { successMsgs } from "../constants/constants";

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

// TeacherRouter.get("", async (req, res) => {
//   try {
//     res.send(await nearestTeacherToStudent());
//   } catch (e: any) {
//     console.log(
//       "🚀 ~ file: teacher-controller.ts:14 ~ TeacherRouter.post ~ e:",
//       e
//     );

//     res.send(e.message);
//   }
// });

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

TeacherRouter.post("/nearestStudents/:id", async (req, res) => {
  try {
    const id: string = req.params.id;
    const { distanceToStudent, name } = await nearStudents(id);
    res.send({
      message: `Distance from ${name} of student`,
      distanceToStudent,
    });
  } catch (e: any) {
    res.send(e.message);
  }
});
