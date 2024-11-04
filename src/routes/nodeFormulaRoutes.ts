import * as express from "express";
import {
    createNodeFormula,
  getAllNodeFormulaData,
  // updateNodeMaster,
  deleteNodeFormula,
  // createBulkNodeMaster,
  updateBulkNodeFormula,
  // uploadFile
} from "../controllers/NodeFormulaControllers";

let router = express.Router();
router.get("/",getAllNodeFormulaData);
router.post("/", createNodeFormula);
router.put("/bulk", updateBulkNodeFormula);
router.delete("/:id", deleteNodeFormula);


export = router;
