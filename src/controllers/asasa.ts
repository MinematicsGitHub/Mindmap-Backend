import { Request, Response } from "express";
import { InternalServerError } from "../response/InternalServerErrorResponse";
import * as Joi from "joi";
import { NodeMaster } from "../entity/NodeMaster";

const nodeMasterSchema = Joi.object({
  nodeId: Joi.number(),
  id: Joi.string().required(),
  branchId: Joi.string().required(),
  nodeCategoryId: Joi.string().required(),
  nodeName: Joi.string().required(),
  itemDescription: Joi.string().allow('', null),
  nodeType: Joi.string().allow('', null),
  nodeCategory: Joi.string().allow('', null),
  width: Joi.string().required(),
  height: Joi.string().required(),
  xPosition: Joi.number().required(),
  yPosition: Joi.number().required(),
  borderColor: Joi.string().required(),
  borderWidth: Joi.string().required(),
  borderStyle: Joi.string().required(),
  fillColor: Joi.string().required(),
  fillTransparency: Joi.string().required(),
  isRootNode: Joi.boolean().required(),
  isParent: Joi.boolean().required(),
  formula: Joi.string().required(),
  fuelUsed: Joi.string().required(),
  fuelUnitsId: Joi.string().required(),
  capacity: Joi.string().required(),
  capacityUnitsId: Joi.string().required(),
  sourcePosition: Joi.string().required(),
  targetPosition: Joi.string().required(),
  FontColor: Joi.string().required(),
  FontStyle: Joi.string().required(),
  FontSize: Joi.string().required(),
  userId: Joi.string().required(),
  nodeTextAlign: Joi.string().required(),
  hidden: Joi.boolean().required(),
  type: Joi.string().required(),
  nodePaddingTop: Joi.string().required(),
  borderRadius: Joi.string().allow('', null),
  units1: Joi.string().allow('', null),
  units2: Joi.string().allow('', null),
  unit1Measurable: Joi.string().allow('', null),
  unit2Mandatory: Joi.string().allow('', null),
  value:Joi.number().allow('', null),

});

export const createNodeMaster = async (req: Request, res: Response) => {
  const { error } = nodeMasterSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const nodeMaster = new NodeMaster();
    nodeMaster.id = req.body.id;
    nodeMaster.branchId = req.body.branchId;
    nodeMaster.nodeCategoryId = req.body.nodeCategoryId;
    nodeMaster.nodeCategory = req.body.nodeCategory;
    nodeMaster.nodeType = req.body.nodeType;
    nodeMaster.nodeName = req.body.nodeName;
    nodeMaster.itemDescription = req.body.itemDescription;
    nodeMaster.width = req.body.width;
    nodeMaster.height = req.body.height;
    nodeMaster.xPosition = req.body.xPosition;
    nodeMaster.yPosition = req.body.yPosition;
    nodeMaster.borderColor = req.body.borderColor;
    nodeMaster.borderWidth = req.body.borderWidth;
    nodeMaster.borderStyle = req.body.borderStyle;
    nodeMaster.fillColor = req.body.fillColor;
    nodeMaster.fillTransparency = req.body.fillTransparency;
    nodeMaster.isRootNode = req.body.isRootNode;
    nodeMaster.isParent = req.body.isParent;
    nodeMaster.formula = req.body.formula;
    // nodeMaster.inputMaterialId = req.body.inputMaterialId;
    // nodeMaster.outputMaterialId = req.body.outputMaterialId;
    // nodeMaster.inputMaterialUnitId = req.body.inputMaterialUnitId;
    // nodeMaster.outputMaterialUnitId = req.body.outputMaterialUnitId;
    nodeMaster.fuelUsed = req.body.fuelUsed;
    nodeMaster.fuelUnitsId = req.body.fuelUnitsId;
    nodeMaster.capacity = req.body.capacity;
    nodeMaster.capacityUnitsId = req.body.capacityUnitsId;
    nodeMaster.sourcePosition = req.body.sourcePosition;
    nodeMaster.targetPosition = req.body.targetPosition;
    nodeMaster.FontColor = req.body.FontColor
    nodeMaster.FontStyle = req.body.FontStyle
    nodeMaster.FontSize = req.body.FontSize
    nodeMaster.userId = req.body.userId
    nodeMaster.borderRadius = req.body.borderRadius
    nodeMaster.units1 = req.body.units1
    nodeMaster.units2 = req.body.units2
    nodeMaster.unit1Measurable = req.body.unit1Measurable
    nodeMaster.unit2Mandatory = req.body.unit2Mandatory
    nodeMaster.value = req.body.value
    nodeMaster.nodeTextAlign = req.body.nodeTextAlign
    nodeMaster.hidden = req.body.hidden
    nodeMaster.type = req.body.type
    nodeMaster.nodePaddingTop = req.body.nodePaddingTop
    await nodeMaster.save();
    return res.status(201).json(nodeMaster);
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const createBulkNodeMaster = async (req: Request, res: Response) => {

  if (req.body.nodes.length) {
    const nodeData = req.body.nodes

    let responseData: any = []

    for (let i = 0; i < nodeData.length; i++) {
      const element = nodeData[i];
      const { error } = nodeMasterSchema.validate(element);

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

    }
    try {

      for (let i = 0; i < nodeData.length; i++) {
        const element = nodeData[i];
        const nodeMaster = new NodeMaster();
        nodeMaster.id = element.id;
        nodeMaster.branchId = element.branchId;
        nodeMaster.nodeCategoryId = element.nodeCategoryId;
        nodeMaster.nodeCategory = element.nodeCategory;
        nodeMaster.nodeType = element.nodeType;
        nodeMaster.nodeName = element.nodeName;
        nodeMaster.itemDescription = element.itemDescription;
        nodeMaster.width = element.width;
        nodeMaster.height = element.height;
        nodeMaster.xPosition = element.xPosition;
        nodeMaster.yPosition = element.yPosition;
        nodeMaster.borderColor = element.borderColor;
        nodeMaster.borderWidth = element.borderWidth;
        nodeMaster.borderStyle = element.borderStyle;
        nodeMaster.fillColor = element.fillColor;
        nodeMaster.fillTransparency = element.fillTransparency;
        nodeMaster.isRootNode = element.isRootNode;
        nodeMaster.isParent = element.isParent;
        nodeMaster.formula = element.formula;
        // nodeMaster.inputMaterialId = element.inputMaterialId;
        // nodeMaster.outputMaterialId = element.outputMaterialId;
        // nodeMaster.inputMaterialUnitId = element.inputMaterialUnitId;
        // nodeMaster.outputMaterialUnitId = element.outputMaterialUnitId;
        nodeMaster.fuelUsed = element.fuelUsed;
        nodeMaster.fuelUnitsId = element.fuelUnitsId;
        nodeMaster.capacity = element.capacity;
        nodeMaster.capacityUnitsId = element.capacityUnitsId;
        nodeMaster.sourcePosition = element.sourcePosition;
        nodeMaster.targetPosition = element.targetPosition;
        nodeMaster.FontColor = element.FontColor
        nodeMaster.FontStyle = element.FontStyle
        nodeMaster.FontSize = element.FontSize
        nodeMaster.userId = element.userId
        nodeMaster.borderRadius = element.borderRadius
        nodeMaster.units1 = req.body.units1
        nodeMaster.units2 = req.body.units2
        nodeMaster.unit1Measurable = req.body.unit1Measurable
        nodeMaster.unit2Mandatory = req.body.unit2Mandatory
        nodeMaster.value = req.body.value
        nodeMaster.nodeTextAlign = req.body.nodeTextAlign
        nodeMaster.hidden = req.body.hidden
        nodeMaster.type = req.body.type
        nodeMaster.nodePaddingTop = req.body.nodePaddingTop


        responseData.push(await nodeMaster.save());

      }
      return res.status(201).json(responseData);
    } catch (error) {
      return InternalServerError(res, error);
    }
  }

};

// for data base tables fetching...
const sql = require('mssql');

const config = {
  user: 'Nodejs1',
  password: 'Nodes123',
  server: 'DELL-PC\\MSSQL',
  database: 'Nodes_V0.1',
  // options: {
  //   encrypt: true, // For Azure SQL Database
  // },
};

export const getAllNodeMaster = async (_: Request, res: Response) => {
  try {
    const nodeMasteres = await NodeMaster.find();
     
    return res.json(nodeMasteres);
  } catch (error) {
    return InternalServerError(res, error);
  }
}

export const getAllTableMaster = async (_: Request, res: Response) => {  
  try{
    await sql.connect(config)
    let result = await new sql.Request().query(`SELECT * FROM information_schema.tables WHERE table_type = 'BASE TABLE';`);
    
    const tableNames = result.recordset.map((table:any) => table.TABLE_NAME);    
    return res.json(tableNames.sort());
  }catch (error) {
    return InternalServerError(res, error);
  } 
};

export const getSelectedTableData = async (req: Request, res: Response) => {
  const selectedTable = req.params.selectedTable;

  try{
    await sql.connect(config);
    let result = await new sql.Request().query( `SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${selectedTable}'`);
    // console.log("queryString",result);
    const column_names = result.recordset.map((row:any) => row.COLUMN_NAME);
    return res.json(column_names);
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const getSelectedQuery = async (req: Request, res: Response) => {
  const selectedTable = req.query.Table;
  const selectedColumn = req.query.column;
  const queryname = req.query.queryname;
  // console.log(selectedTable);
  // console.log(selectedColumn);
  // console.log(queryname);
  let result_data :any = []

  try{
    await sql.connect(config);
    if (queryname === "Sum"){
      const result = await new sql.Request().query(`SELECT SUM(${selectedColumn}) as sumcolumn FROM [${selectedTable}]`);
      // console.log("result",result);
      result_data = result.recordset.map((row:any) => row.sumcolumn);
      
    }
    else if (queryname === "Average"){
      const result = await new sql.Request().query(`SELECT AVG(${selectedColumn}) as avgcolumn FROM [${selectedTable}]`);
      // console.log("result",result);
      result_data = result.recordset.map((row:any) => row.avgcolumn);
      
    }
    else if (queryname === "Count"){
      const result = await new sql.Request().query(`SELECT COUNT(*) as countofrows FROM [${selectedTable}]`);
      // console.log("result",result);
      result_data = result.recordset.map((row:any) => row.countofrows); 
    }
    else if (queryname === "Minimum"){
      const result = await new sql.Request().query(`SELECT MIN(${selectedColumn}) as mincolumn FROM [${selectedTable}]`);
      // console.log("result",result);
      result_data = result.recordset.map((row:any) => row.mincolumn);
    }
    else if (queryname === "Maximum"){
      const result = await new sql.Request().query(`SELECT MAX(${selectedColumn}) as maxcolumn FROM [${selectedTable}]`);
      // console.log("result",result);
      result_data = result.recordset.map((row:any) => row.maxcolumn);
    }
    else if (queryname === "Distinct"){
      const result = await new sql.Request().query(`SELECT DISTINCT ${selectedColumn} as Distinctcolumn FROM [${selectedTable}]`);
      // console.log("result",result);
      result_data = result.recordset.map((row:any) => row.Distinctcolumn);
    }
    else if (queryname === "ORDER BY(Ascending)"){
      const result = await new sql.Request().query(`SELECT * FROM [${selectedTable}]  ORDER BY ${selectedColumn} ASC`);
      // console.log("result",result);
      result_data = result.recordset
    }
    else if (queryname === "ORDER BY(Descending)"){
      const result = await new sql.Request().query(`SELECT * FROM [${selectedTable}]  ORDER BY ${selectedColumn} DESC`);
      // console.log("result",result);
      result_data = result.recordset
    }
    return res.json(result_data);
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const updateNodeMaster = async (req: Request, res: Response) => {

  const { error } = nodeMasterSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const nodeMaster = await NodeMaster.findOne(req.params.id);
    if (!nodeMaster) {
      return res.status(404).json({ error: 'nodeMaster not found' });
    }

    nodeMaster.id = req.body.id;
    nodeMaster.branchId = req.body.branchId;
    nodeMaster.nodeCategoryId = req.body.nodeCategoryId;
    nodeMaster.nodeCategory = req.body.nodeCategory;
    nodeMaster.nodeType = req.body.nodeType;
    nodeMaster.nodeName = req.body.nodeName;
    nodeMaster.itemDescription = req.body.itemDescription;
    nodeMaster.width = req.body.width;
    nodeMaster.borderRadius = req.body.borderRadius;
    nodeMaster.height = req.body.height;
    nodeMaster.xPosition = req.body.xPosition;
    nodeMaster.yPosition = req.body.yPosition;
    nodeMaster.borderColor = req.body.borderColor;
    nodeMaster.borderWidth = req.body.borderWidth;
    nodeMaster.borderStyle = req.body.borderStyle;
    nodeMaster.fillColor = req.body.fillColor;
    nodeMaster.fillTransparency = req.body.fillTransparency;
    nodeMaster.isRootNode = req.body.isRootNode;
    nodeMaster.isParent = req.body.isParent;
    nodeMaster.formula = req.body.formula;
    // nodeMaster.inputMaterialId = req.body.inputMaterialId;
    // nodeMaster.outputMaterialId = req.body.outputMaterialId;
    // nodeMaster.inputMaterialUnitId = req.body.inputMaterialUnitId;
    // nodeMaster.outputMaterialUnitId = req.body.outputMaterialUnitId;
    nodeMaster.fuelUsed = req.body.fuelUsed;
    nodeMaster.fuelUnitsId = req.body.fuelUnitsId;
    nodeMaster.capacity = req.body.capacity;
    nodeMaster.capacityUnitsId = req.body.capacityUnitsId;
    nodeMaster.sourcePosition = req.body.sourcePosition;
    nodeMaster.targetPosition = req.body.targetPosition;
    nodeMaster.FontColor = req.body.FontColor
    nodeMaster.FontStyle = req.body.FontStyle
    nodeMaster.FontSize = req.body.FontSize
    nodeMaster.userId = req.body.userId
    nodeMaster.units1 = req.body.units1
    nodeMaster.units2 = req.body.units2
    nodeMaster.unit1Measurable = req.body.unit1Measurable
    nodeMaster.unit2Mandatory = req.body.unit2Mandatory
    nodeMaster.value = req.body.value
    nodeMaster.nodeTextAlign = req.body.nodeTextAlign
    nodeMaster.hidden = req.body.hidden
    nodeMaster.type = req.body.type
    nodeMaster.nodePaddingTop = req.body.nodePaddingTop

    await nodeMaster.save();
    return res.json(nodeMaster);
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const updateBulkNodeMaster = async (req: Request, res: Response) => {

  if (req.body.nodes.length) {
    const nodeData = req.body.nodes
    console.log(nodeData, "adding")

    let responseData: any = []


    for (let i = 0; i < nodeData.length; i++) {
      const element = nodeData[i];
      console.log(element);

      const { error } = nodeMasterSchema.validate(element);

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

    }


    try {

      for (let i = 0; i < nodeData.length; i++) {
        const element = nodeData[i];
        let nodeUpdateData: any;

        if (element.nodeId) {
          console.log("update");
          nodeUpdateData = await updateDataNodeMaster(element)
        }

        else {
          nodeUpdateData = await createDataNodeMaster(element)
          console.log("add");
        }
        // const nodeMaster = await NodeMaster.findOne(element.id);
        // if (!nodeMaster) {
        //   return res.status(404).json({ error: 'nodeMaster not found' });
        // }
        // nodeMaster.nodeId = element.nodeId;

        // nodeMaster.branchId = element.branchId;
        // nodeMaster.nodeCategoryId = element.nodeCategoryId;
        // nodeMaster.nodeName = element.nodeName;
        // nodeMaster.width = element.width;
        // nodeMaster.height = element.height;
        // nodeMaster.xPosition = element.xPosition;
        // nodeMaster.yPosition = element.yPosition;
        // nodeMaster.borderColor = element.borderColor;
        // nodeMaster.borderWidth = element.borderWidth;
        // nodeMaster.borderStyle = element.borderStyle;
        // nodeMaster.fillColor = element.fillColor;
        // nodeMaster.fillTransparency = element.fillTransparency;
        // nodeMaster.isRootNode = element.isRootNode;
        // nodeMaster.isParent = element.isParent;
        // nodeMaster.formula = element.formula;
        // nodeMaster.inputMaterialId = element.inputMaterialId;
        // nodeMaster.outputMaterialId = element.outputMaterialId;
        // nodeMaster.inputMaterialUnitId = element.inputMaterialUnitId;
        // nodeMaster.outputMaterialUnitId = element.outputMaterialUnitId;
        // nodeMaster.fuelUsed = element.fuelUsed;
        // nodeMaster.fuelUnitsId = element.fuelUnitsId;
        // nodeMaster.capacity = element.capacity;
        // nodeMaster.capacityUnitsId = element.capacityUnitsId;
        responseData.push(nodeUpdateData);

      }
      return res.status(201).json(responseData);
    } catch (error) {
      return InternalServerError(res, error);
    }
  }

};

const updateDataNodeMaster = async (data: any) => {
  const { error } = nodeMasterSchema.validate(data);

  if (error) {
    return { error: error.details[0].message }
  }

  try {
    const nodeMaster = await NodeMaster.findOne(data.nodeId);
    if (!nodeMaster) {
      return { error: 'nodeMaster not found' }
    }
    console.log(data.borderRadius, "borderRadius,,,,")
    nodeMaster.id = data.id;
    nodeMaster.branchId = data.branchId;
    nodeMaster.nodeCategoryId = data.nodeCategoryId;
    nodeMaster.nodeCategory = data.nodeCategory;
    nodeMaster.nodeType = data.nodeType;
    nodeMaster.nodeName = data.nodeName;
    nodeMaster.itemDescription = data.itemDescription;
    nodeMaster.width = data.width;
    nodeMaster.height = data.height;
    nodeMaster.borderRadius = data.borderRadius;
    nodeMaster.xPosition = data.xPosition;
    nodeMaster.yPosition = data.yPosition;
    nodeMaster.borderColor = data.borderColor;
    nodeMaster.borderWidth = data.borderWidth;
    nodeMaster.borderStyle = data.borderStyle;
    nodeMaster.fillColor = data.fillColor;
    nodeMaster.fillTransparency = data.fillTransparency;
    nodeMaster.isRootNode = data.isRootNode;
    nodeMaster.isParent = data.isParent;
    nodeMaster.formula = data.formula;
    // nodeMaster.inputMaterialId = data.inputMaterialId;
    // nodeMaster.outputMaterialId = data.outputMaterialId;
    // nodeMaster.inputMaterialUnitId = data.inputMaterialUnitId;
    // nodeMaster.outputMaterialUnitId = data.outputMaterialUnitId;
    nodeMaster.fuelUsed = data.fuelUsed;
    nodeMaster.fuelUnitsId = data.fuelUnitsId;
    nodeMaster.capacity = data.capacity;
    nodeMaster.capacityUnitsId = data.capacityUnitsId;
    nodeMaster.sourcePosition = data.sourcePosition;
    nodeMaster.targetPosition = data.targetPosition;
    nodeMaster.FontColor = data.FontColor
    nodeMaster.FontStyle = data.FontStyle
    nodeMaster.FontSize = data.FontSize
    nodeMaster.userId = data.userId
    nodeMaster.units1 = data.units1
    nodeMaster.units2 = data.units2
    nodeMaster.unit1Measurable = data.unit1Measurable
    nodeMaster.unit2Mandatory = data.unit2Mandatory
    nodeMaster.value = data.value
    nodeMaster.nodeTextAlign = data.nodeTextAlign
    nodeMaster.hidden = data.hidden
    nodeMaster.type = data.type
    nodeMaster.nodePaddingTop = data.nodePaddingTop

    await nodeMaster.save();
    return nodeMaster
  } catch (error) {
    return error
  }
};

const createDataNodeMaster = async (data: any) => {
  const { error } = nodeMasterSchema.validate(data);

  if (error) {
    return { error: error.details[0].message }
  }

  try {
    const nodeMaster = new NodeMaster();
    nodeMaster.id = data.id;
    nodeMaster.branchId = data.branchId;
    nodeMaster.nodeCategoryId = data.nodeCategoryId;
    nodeMaster.nodeCategory = data.nodeCategory;
    nodeMaster.nodeType = data.nodeType;
    nodeMaster.nodeName = data.nodeName;
    nodeMaster.itemDescription = data.itemDescription;
    nodeMaster.width = data.width;
    nodeMaster.height = data.height;
    nodeMaster.borderRadius = data.borderRadius;
    nodeMaster.xPosition = data.xPosition;
    nodeMaster.yPosition = data.yPosition;
    nodeMaster.borderColor = data.borderColor;
    nodeMaster.borderWidth = data.borderWidth;
    nodeMaster.borderStyle = data.borderStyle;
    nodeMaster.fillColor = data.fillColor;
    nodeMaster.fillTransparency = data.fillTransparency;
    nodeMaster.isRootNode = data.isRootNode;
    nodeMaster.isParent = data.isParent;
    nodeMaster.formula = data.formula;
    // nodeMaster.inputMaterialId = data.inputMaterialId;
    // nodeMaster.outputMaterialId = data.outputMaterialId;
    // nodeMaster.inputMaterialUnitId = data.inputMaterialUnitId;
    // nodeMaster.outputMaterialUnitId = data.outputMaterialUnitId;
    nodeMaster.fuelUsed = data.fuelUsed;
    nodeMaster.fuelUnitsId = data.fuelUnitsId;
    nodeMaster.capacity = data.capacity;
    nodeMaster.capacityUnitsId = data.capacityUnitsId;
    nodeMaster.sourcePosition = data.sourcePosition;
    nodeMaster.targetPosition = data.targetPosition;
    nodeMaster.FontColor = data.FontColor
    nodeMaster.FontStyle = data.FontStyle
    nodeMaster.FontSize = data.FontSize
    nodeMaster.userId = data.userId
    nodeMaster.units1 = data.units1
    nodeMaster.units2 = data.units2
    nodeMaster.unit1Measurable = data.unit1Measurable
    nodeMaster.unit2Mandatory = data.unit2Mandatory
    nodeMaster.value = data.value
    nodeMaster.nodeTextAlign = data.nodeTextAlign
    nodeMaster.hidden = data.hidden
    nodeMaster.type = data.type
    nodeMaster.nodePaddingTop = data.nodePaddingTop

    await nodeMaster.save();

    return nodeMaster
  } catch (error) {
    console.log(error)
    return error
  }
};

export const deleteNodeMaster = async (req: Request, res: Response) => {
  try {
    const nodeMaster = await NodeMaster.findOne(req.params.id);
    if (!nodeMaster) {
      return res.status(404).json({ error: 'nodeMaster not found' });
    }

    await nodeMaster.remove();
    return res.status(204).end();
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const nodeMasterById = async (req: Request, res: Response) => {
  try {
    const nodeMaster = await NodeMaster.findOne(req.params.id);
    if (!nodeMaster) {
      return res.status(404).json({ error: 'Node master not found' });
    }
    return res.json(nodeMaster);
  } catch (error) {
    return InternalServerError(res, error);
  }
};



// export const getAllTableNames = async (req: Request, res:Response) => {
//   console.log("results..");
//   try {
//     await sql.connect(config);


//     // Get a list of all table names in the database
//     const result = await sql.query`
//     SELECT * FROM information_schema.tables WHERE table_schema = N'Taxonanalytica'`;
//     // const tableNames = result.recordset.map((table:any) => table.table_name);

//     return res.json({ result });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   } finally {
//     // Close the connection
//     await sql.close();
//   }
// };

