import { Request, Response } from "express";
import { InternalServerError } from "../response/InternalServerErrorResponse";
import * as Joi from "joi";
import { CanvasConfig } from "../entity/CanvasConfig";



const canvasCongifSchema = Joi.object({
  Id: Joi.number().optional(),  // Add this line to allow Id
  BackgroundColor: Joi.string().allow(null,''),
  Pattern: Joi.string().allow(null,''),
  TextSize: Joi.number().allow(null,''),
  FontStyle: Joi.string().allow(null,''),
  userId: Joi.string().allow('', null),
  modelid: Joi.string().allow('', null),
  modelName: Joi.string().allow('', null)
});


export const createCanvasConfig = async (req: Request, res: Response) => {
  const { error } = canvasCongifSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    
    const canvasconfig = new CanvasConfig();
    canvasconfig.BackgroundColor = req.body.BackgroundColor;
    canvasconfig.Pattern = req.body.Pattern;
    canvasconfig.TextSize = req.body.TextSize;
    canvasconfig.FontStyle = req.body.FontStyle;
    canvasconfig.userId = req.body.userId;
    canvasconfig.modelid = req.body.modelid;
    canvasconfig.modelName = req.body.modelName;
    await canvasconfig.save();
    return res.status(201).json(canvasconfig);
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const getAllCanvasConfig = async (_: Request, res: Response) => {
  try {
    const canvasconfig = await CanvasConfig.find();
    return res.json(canvasconfig);
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const updateCanvasConfig = async (req: Request, res: Response) => {

  const { error } = canvasCongifSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const canvasconfig = await CanvasConfig.findOne(req.params.nodeId);
    if (!canvasconfig) {
      return res.status(404).json({ error: 'canvasconfig not found' });
    }

    canvasconfig.BackgroundColor = req.body.BackgroundColor;
    canvasconfig.Pattern = req.body.Pattern;
    canvasconfig.TextSize = req.body.TextSize;
    canvasconfig.FontStyle = req.body.FontStyle;
    canvasconfig.userId = req.body.userId;
    canvasconfig.modelid = req.body.modelid;
    canvasconfig.modelName = req.body.modelName;

    await canvasconfig.save();
    return res.json(canvasconfig);
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const deleteCanvasConfig = async (req: Request, res: Response) => {
  try {
    const canvasconfig = await CanvasConfig.findOne(req.params.id);
    if (!canvasconfig) {
      return res.status(404).json({ error: 'canvasconfig not found' });
    }

    await canvasconfig.remove();
    return res.status(204).end();
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const canvasConfigById = async (req: Request, res: Response) => {
  try {
    const canvasconfig = await CanvasConfig.findOne(req.params.id);
    if (!canvasconfig) {
      return res.status(404).json({ error: 'canvasconfig not found' });
    }
    return res.json(canvasconfig);
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const updateBulkCanvasConfig = async (req: Request, res: Response) => {
  console.log(123);
  if (req.body.canvasconfig.length) {
    const canvasconfigData = req.body.canvasconfig

    let responseData: any = []

    for (let i = 0; i < canvasconfigData.length; i++) {
      const element = canvasconfigData[i];
      const { error } = canvasCongifSchema.validate(element);

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
    }
    try {
      for (let i = 0; i < canvasconfigData.length; i++) {
        const element = canvasconfigData[i];
        let colorConfigUpdateData: any;
        const modelId = await CanvasConfig.findOne({ modelid: element.modelid });

        if (modelId || element.Id) {
          console.log("update");
          colorConfigUpdateData = await updateDataCanvasConfig(element)
        }

        else {
          colorConfigUpdateData = await createDataCanvasConfig(element)
          console.log("add");
        }

        responseData.push(colorConfigUpdateData);

      }
      return res.status(201).json(responseData);
    } catch (error) {
      return InternalServerError(res, error);
    }
  }

};

const updateDataCanvasConfig = async (data: any) => {
  const { error } = canvasCongifSchema.validate(data);

  if (error) {
    return { error: error.details[0].message }
  }

  try {
    const canvasconfig = await CanvasConfig.findOne({modelid : data.modelid});
    // const newBatch = await Batch.findOne({ activityId: data.activityId });
    if (!canvasconfig) {
      return { error: error.details[0].message }
    }

    canvasconfig.BackgroundColor = data.BackgroundColor;
    canvasconfig.Pattern = data.Pattern;
    canvasconfig.TextSize = data.TextSize;
    canvasconfig.FontStyle = data.FontStyle;
    canvasconfig.userId = data.userId;
    canvasconfig.modelid = data.modelid;
    canvasconfig.modelName = data.modelName;
    await canvasconfig.save();

    return canvasconfig

  } catch (error) {
    return error
  }
};

const createDataCanvasConfig = async (data: any) => {
  const { error } = canvasCongifSchema.validate(data);

  if (error) {
    return { error: error.details[0].message }
  }

  try {

    const canvasconfig = new CanvasConfig();
    canvasconfig.BackgroundColor = data.BackgroundColor;
    canvasconfig.Pattern = data.Pattern;
    canvasconfig.TextSize = data.TextSize;
    canvasconfig.FontStyle = data.FontStyle;
    canvasconfig.userId = data.userId;
    canvasconfig.modelid = data.modelid;
    canvasconfig.modelName = data.modelName;
    await canvasconfig.save();

    return canvasconfig
  } catch (error) {
    console.log(error)
    return error
  }
};

