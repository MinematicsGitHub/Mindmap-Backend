import * as express from "express";
import nodeMasterRouter from "./nodeMasterRoutes";
import edgeMasterRoutes from "./edgeMasterRoutes";
import canvasMaster from "./canvasMasterRoutes";
import nodesConfiguration from "./NodesConfigRoutes";
import egdesConfig from "./edgesConfigRoutes";
import canvasConfig from "./canvasConfigRoutes"
import dataconnectionRoutes from "./DataConnectionRouter"

let router = express.Router();

router.use("/canvasMaster", canvasMaster);
router.use("/nodeMaster", nodeMasterRouter);
router.use("/edgeMaster", edgeMasterRoutes);
router.use("/nodesConfig", nodesConfiguration);
router.use("/edgesConfig", egdesConfig);
router.use("/canvasConfig", canvasConfig);
router.use("/datasettings", dataconnectionRoutes);

export = router;