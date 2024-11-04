import { Request, Response } from "express";
import { InternalServerError } from "../response/InternalServerErrorResponse";
import * as Joi from "joi";
import { NodeFormula } from "../entity/NodeFormula"; 

const NodeFormulaSchema = Joi.object({
  id: Joi.number(),
  nodeId: Joi.string().required(),
  childnodeid: Joi.string().allow('', null),
  childnode: Joi.string().allow('', null),
  operator: Joi.string().allow('', null),
  constant: Joi.string().allow('', null),
  value: Joi.number().allow('', null),
  modelid: Joi.number().allow('', null),
  userId: Joi.string().allow('', null),

});

export const createNodeFormula = async (req: Request, res: Response) => {
  console.log("request body:", req.body)
  const { error } = NodeFormulaSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {

    const nodeFormula = new NodeFormula();
    nodeFormula.id = req.body.id;
    nodeFormula.nodeId = req.body.nodeId;
    nodeFormula.childnodeid = req.body.childnodeid;
    nodeFormula.childnode = req.body.childnode;
    nodeFormula.operator = req.body.operator;
    nodeFormula.constant = req.body.constant;
    nodeFormula.value = req.body.value;
    
    await nodeFormula.save();
    return res.status(201).json(nodeFormula);
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const createBulkNodeFormula = async (req: Request, res: Response) => {

  if (req.body.nodes) {
    const nodeData = req.body.nodes

    let responseData: any = []

    for (let i = 0; i < nodeData.length; i++) {
      const element = nodeData[i];
      const { error } = NodeFormulaSchema.validate(element);

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
    }
    try {
      for (let i = 0; i < nodeData.length; i++) {
        const element = nodeData[i];
        const nodeFormula = new NodeFormula();
        nodeFormula.id = element.id;
        nodeFormula.nodeId = element.nodeId;
        nodeFormula.childnodeid = element.childnodeid;
        nodeFormula.childnode = element.childnode;
        nodeFormula.operator = element.operator;
        nodeFormula.constant = element.constant;
        nodeFormula.value = element.value;
        responseData.push(await nodeFormula.save());
      }
      return res.status(201).json(responseData);
    } catch (error) {
      return InternalServerError(res, error);
    }
  }

};

export const getAllNodeFormulaData = async (_: Request, res: Response) => {
  console.log("getallnodes",)
  try {
    const nodeFormulaData = await NodeFormula.find();
    return res.json(nodeFormulaData);
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const updateNodeFomrula = async (req: Request, res: Response) => {

  const { error } = NodeFormulaSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const nodeFormula = await NodeFormula.findOne(req.params.nodeId);
    if (!nodeFormula) {
      return res.status(404).json({ error: 'nodeMaster not found' });
    }

    nodeFormula.id = req.body.id;
    nodeFormula.nodeId = req.body.nodeId;
    nodeFormula.childnodeid = req.body.childnodeid;
    nodeFormula.childnode = req.body.childnode;
    nodeFormula.operator = req.body.operator;
    nodeFormula.constant = req.body.constant;
    nodeFormula.value = req.body.value;

    await nodeFormula.save();
    return res.json(nodeFormula);
  } catch (error) {
    return InternalServerError(res, error);
  }
};
export const updateBulkNodeFormula = async (req: Request, res: Response) => {
  if (req.body.nodes.length) {
    const nodeData = req.body.nodes;
    const promises = [];

    for (let i = 0; i < nodeData.length; i++) {
      const element = nodeData[i];
      const { error } = NodeFormulaSchema.validate(element);

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      if (element.id) {
        promises.push(updateDataNodeFormula(element));
      } else {
        promises.push(createDataNodeFormula(element));
      }
    }

    try {
      const responseData = await Promise.all(promises);
      return res.status(201).json(responseData);
    } catch (error) {
      return InternalServerError(res, error);
    }
  }
};


const updateDataNodeFormula = async (data: any) => {
  const { error } = NodeFormulaSchema.validate(data);
  if (error) {
    return { error: error.details[0].message }
  }

  try {
    const nodeFormula = await NodeFormula.findOne(data.id);
    if (!nodeFormula) {
      return { error: 'nodeMaster not found' }
    }
    nodeFormula.id = data.id;
    nodeFormula.nodeId = data.nodeId;
    nodeFormula.childnodeid = data.childnodeid;
    nodeFormula.childnode = data.childnode;
    nodeFormula.operator = data.operator;
    nodeFormula.constant = data.constant;
    nodeFormula.value = data.value;

    await nodeFormula.save();
    return nodeFormula
  } catch (error) {
    return error
  }
};

const createDataNodeFormula = async (data: any) => {
  const { error } = NodeFormulaSchema.validate(data);

  if (error) {
    return { error: error.details[0].message }
  }

  try {
    const nodeFormula = new NodeFormula();
    nodeFormula.id = data.id;
    nodeFormula.nodeId = data.nodeId;
    nodeFormula.childnodeid = data.childnodeid;
    nodeFormula.childnode = data.childnode;
    nodeFormula.operator = data.operator;
    nodeFormula.constant = data.constant;
    nodeFormula.value = data.value;
    await nodeFormula.save();

    return nodeFormula
  } catch (error) {
    console.log("create node error:",error)
    return error
  }
};

export const deleteNodeFormula = async (req: Request, res: Response) => {
  try {
    const nodeFormula = await NodeFormula.findOne(req.params.id);
    if (!nodeFormula) {
      return res.status(404).json({ error: 'nodeFormula not found' });
    }

    await nodeFormula.remove();
    return res.status(204).end();
  } catch (error) {
    return InternalServerError(res, error);
  }
};


