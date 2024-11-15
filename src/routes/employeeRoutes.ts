import * as express from "express";
import {
  createEmployee, getAllEmployee, updateEmployee,deleteEmployee, employeeById
} from "../controllers/userController";

let router = express.Router();

router.put("/:id", updateEmployee);
router.get("/", getAllEmployee);
router.post("/", createEmployee);
router.get("/:id", employeeById);
router.delete("/:id", deleteEmployee);


export = router;
