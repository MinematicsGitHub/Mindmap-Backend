import * as express from "express";
import nodeMasterRouter from "./nodeMasterRoutes";
import edgeMasterRoutes from "./edgeMasterRoutes";
import canvasMaster from "./canvasMasterRoutes";

let router = express.Router();

router.use("/canvasMaster", canvasMaster);
router.use("/nodeMaster", nodeMasterRouter);
router.use("/edgeMaster", edgeMasterRoutes);

export = router;