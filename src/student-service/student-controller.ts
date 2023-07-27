import * as express from "express";
import { storeStudentsDetails, updateStudentDetails } from "./student-service";
import { STUDENTS } from "../faker/student-faker";
import { errorMsg, successMsgs } from "../constants/constants";
const StudentRouter = express.Router();
export default StudentRouter;

StudentRouter.post("", async (req, res) => {
  try {
    await storeStudentsDetails(STUDENTS);
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
