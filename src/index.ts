import * as express from "express";
import StudentRouter from "./student-service/student-controller";
import TeacherRouter from "./teacher-service/teacher-controller";
import("./db/mongoose");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/students", StudentRouter);
app.use("/teachers", TeacherRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
