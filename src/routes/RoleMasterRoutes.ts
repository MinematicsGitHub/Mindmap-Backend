import * as express from "express";
import {
  createRoles,
  deleteRoles,
  getAllRoles,
  RolesById,
  updateRoles
} from "../controllers/RoleMasterController";


let router = express.Router();

router.get("/", getAllRoles);
router.post("/", createRoles);
router.get("/:id", RolesById);
router.put("/:id", updateRoles);
router.delete("/:id", deleteRoles);


export = router;
