import * as express from "express";
import {
  storeStudentsDetails,
  studentById,
  updateStudentDetails,
} from "./student-service";
import { errorMsg, successMsgs } from "../constants/constants";
import { createRandomStudents } from "../faker/student-faker";
const StudentRouter = express.Router();
export default StudentRouter;

StudentRouter.post("", async (req, res) => {
  try {
    const studentsData = await createRandomStudents();
    await storeStudentsDetails(studentsData);
    res.send(successMsgs.created);
  } catch (e: any) {
    console.log(
      "🚀 ~ file: controller.ts:11 ~ StudentRouter.post ~ e:",
      e.message
    );
    res.send(e.message);
  }
});

StudentRouter.patch("/update", async (req, res) => {
  try {
    const updatedStudent = await updateStudentDetails(req.body);
    if (!updatedStudent) {
      res.send(errorMsg.noUserFound);
    } else {
      res.send(updatedStudent);
    }
  } catch (e: any) {
    console.log(
      "🚀 ~ file: controller.ts:26 ~ StudentRouter.patch ~ e:",
      e.message
    );
    res.send(e.message);
  }
});

StudentRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    res.send(await studentById(id));
  } catch (e: any) {
    res.send(e.message);
  }
});
