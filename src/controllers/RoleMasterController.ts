import { Request, Response } from "express";
import { InternalServerError } from "../response/InternalServerErrorResponse";
import * as Joi from "joi";
import { Role_Master } from "../entity/RoleMaster";

const RolesSchema = Joi.object({
  roleType: Joi.string().required()
});

export const createRoles = async (req: Request, res: Response) => {
  const { error } = RolesSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const roles = new Role_Master();
    roles.roleType = req.body.roleType;
    await roles.save();
    return res.status(201).json(roles);
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const getAllRoles = async (_: Request, res: Response) => {
  try {
    const roles = await Role_Master.find();
    console.log(roles,"roles")
    return res.json(roles);
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const updateRoles = async (req: Request, res: Response) => {
  const { error } = RolesSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const roles = await Role_Master.findOne(req.params.id);
    if (!roles) {
      return res.status(404).json({ error: 'roles not found' });
    }
    roles.roleType = req.body.roleType;

    await roles.save();
    return res.json(roles);
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const deleteRoles = async (req: Request, res: Response) => {
  try {
    const roles = await Role_Master.findOne(req.params.id);
    if (!roles) {
      return res.status(404).json({ error: 'roles not found' });
    }

    await roles.remove();
    return res.status(204).end();
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const RolesById = async (req: Request, res: Response) => {
  try {
    const roles = await Role_Master.findOne(req.params.id);
    if (!roles) {
      return res.status(404).json({ error: 'roles type not found' });
    }
    return res.json(roles);
  } catch (error) {
    return InternalServerError(res, error);
  }
};

// export const updateBulkRoles = async (req: Request, res: Response) => {
//   console.log(123);
//   if (req.body.roles.length) {
//     const rolesData = req.body.roles

//     let responseData: any = []

//     for (let i = 0; i < rolesData.length; i++) {
//       const element = rolesData[i];
//       const { error } = RolesSchema.validate(element);

//       if (error) {
//         return res.status(400).json({ error: error.details[0].message });
//       }
//     }
//     try {
//       for (let i = 0; i < rolesData.length; i++) {
//         const element = rolesData[i];
//         let rolesUpdateData: any;
//         const userId = await Role_Master.findOne({ userId: element.userId });

//         if (userId || element.Id) {
//           console.log("update");
//           rolesUpdateData = await updateDataRoles(element)
//         }

//         else {
//           rolesUpdateData = await createDataRoles(element)
//           console.log("add");
//         }

//         responseData.push(rolesUpdateData);

//       }
//       return res.status(201).json(responseData);
//     } catch (error) {
//       return InternalServerError(res, error);
//     }
//   }

// };

// const updateDataRoles = async (req: Request, res: Response) => {
//   const { error } = RolesSchema.validate(req.body);

//   if (error) {
//     return { error: error.details[0].message }
//   }

//   try {
//     const roles = await Role_Master.findOne(req.params.id);  
//     if (!roles) {
//       return { error: error.details[0].message }
//     }

//     roles.roleType = data.roleType;
//     roles.userId = data.userId;
//     await roles.save();

//     return roles

//   } catch (error) {
//     return error
//   }
// };

// const createDataRoles = async (data: any) => {
//   const { error } = RolesSchema.validate(data);

//   if (error) {
//     return { error: error.details[0].message }
//   }
//   try {
//     const roles = new Role_Master();
//     roles.roleType = data.roleType;
//     roles.userId = data.userId;
//     await roles.save();
//     return roles
//   } catch (error) {
//     console.log(error)
//     return error
//   }
// };
