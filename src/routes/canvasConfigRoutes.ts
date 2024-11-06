import * as express from "express";
import {
  createCanvasConfig, getAllCanvasConfig, updateCanvasConfig,deleteCanvasConfig, canvasConfigById,
  updateBulkCanvasConfig
} from "../controllers/CanvasConfigControllers";

let router = express.Router();

router.put("/bulk", updateBulkCanvasConfig);
router.get("/",getAllCanvasConfig);
router.post("/",createCanvasConfig);
router.get("/:id",canvasConfigById);
router.put("/:id", updateCanvasConfig);
router.delete("/:id",deleteCanvasConfig);

export = router;
