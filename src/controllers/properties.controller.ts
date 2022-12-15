import { Request, Response } from "express";
import { IPropertyRequest } from "../interfaces/properties";
import createPropertyService from "../services/properties/createProperty.service";
import listAllPropertiesService from "../services/properties/listAllProperties.service";

export const createPropertyController = async (req: Request, res: Response) => {
  const data: IPropertyRequest = req.body;
  const createdProperty = await createPropertyService(data);
  return res.status(201).json(createdProperty);
};

export const listAllPropertiesController = async (
  req: Request,
  res: Response
) => {
  const allProperties = await listAllPropertiesService();
  return res.status(200).json(allProperties);
};
