import * as express from "express";
import nodeMasterRouter from "./nodeMasterRoutes";
import edgeMasterRoutes from "./edgeMasterRoutes";
import canvasMaster from "./canvasMasterRoutes";
import nodesConfiguration from "./NodesConfigRoutes";
import egdesConfig from "./edgesConfigRoutes";
import canvasConfig from "./canvasConfigRoutes"
import dataconnectionRoutes from "./DataConnectionRouter"
import authRoutes from "./authRoutes";
import EmployeeRoutes from "./employeeRoutes"
import roleMasterRouter from "./RoleMasterRoutes";
import rolesPermission from "./rolePermissionRoutes"

let router = express.Router();

router.use("/canvasMaster", canvasMaster);
router.use("/nodeMaster", nodeMasterRouter);
router.use("/edgeMaster", edgeMasterRoutes);
router.use("/nodesConfig", nodesConfiguration);
router.use("/edgesConfig", egdesConfig);
router.use("/canvasConfig", canvasConfig);
router.use("/datasettings", dataconnectionRoutes);
router.use("/auth", authRoutes);
router.use("/employee", EmployeeRoutes);
router.use("/roles", roleMasterRouter);
router.use("/rolespermission", rolesPermission);

export = router;