import * as express from "express";
import {
  createCanvasConfig, getAllCanvasConfig, updateCanvasConfig,deleteCanvasConfig, canvasConfigById,
  updateBulkCanvasConfig
} from "../controllers/CanvasConfigControllers";

let router = express.Router();

router.get("/",getAllCanvasConfig);
router.post("/",createCanvasConfig);
router.get("/:id",canvasConfigById);
router.put("/bulk", updateBulkCanvasConfig);
router.put("/:id", updateCanvasConfig);
router.delete("/:id",deleteCanvasConfig);

export = router;
