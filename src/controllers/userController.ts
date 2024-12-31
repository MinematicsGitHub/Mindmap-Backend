import { Request, Response } from "express";
import { InternalServerError } from "../response/InternalServerErrorResponse";
import * as Joi from "joi";
import { UserDetails } from "../entity/User";
import bcrypt from "bcrypt";


const employeeSchema = Joi.object({
  designation: Joi.string().allow('',null),
  userName: Joi.string().required(),
  password: Joi.string().required(),
  phoneno: Joi.string().allow('',null),
  email: Joi.string().allow('',null),
  roleId: Joi.number().allow('',null),
});

export const createEmployee = async (req: Request, res: Response) => {
  const { error } = employeeSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is the salt rounds for bcrypt
    const employee = new UserDetails();
    employee.designation = req.body.designation;
    employee.userName = req.body.userName;
    employee.password = hashedPassword;
    employee.phoneno = req.body.phoneno;
    employee.email = req.body.email;
    employee.roleId = req.body.roleId;
    await employee.save();
    return res.status(201).json(employee);
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const getAllEmployee = async (_: Request, res: Response) => {
  try {
    const Employees = await UserDetails.find();
    return res.json(Employees);
  }  catch (error) {
    return InternalServerError(res, error);
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  console.log(employeeSchema,"employeeeee")
  const { error } = employeeSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const employee = await UserDetails.findOne(req.params.id);
    console.log(employee,"emp")
    if (!UserDetails) {
      return res.status(404).json({ error: 'UserDetails not found' });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is the salt rounds for bcrypt
    employee.designation = req.body.designation;
    employee.userName = req.body.userName;
    employee.password = hashedPassword;
    employee.phoneno = req.body.phoneno;
    employee.email = req.body.email;
    employee.roleId = req.body.roleId;

    await employee.save();
    return res.json(UserDetails);
  }  catch (error) {
    return InternalServerError(res, error);
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await UserDetails.findOne(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'UserDetails not found' });
    }

    await employee.remove();
    return res.status(204).end();
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const employeeById = async (req: Request, res: Response) => {
  try {
    const employee = await UserDetails.findOne(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'UserDetails not found' });
    }
    return res.json(employee);
  }  catch (error) {
    return InternalServerError(res, error);
  }
};



