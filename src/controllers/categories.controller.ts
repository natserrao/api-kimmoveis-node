import { Request, Response } from "express";
import { ICategoryRequest } from "../interfaces/categories";
import createCategorieService from "../services/categories/createCategorie.service";
import getPropertiesByCategoryService from "../services/categories/getPropertiesByCategory.service";
import listAllCategoriesService from "../services/categories/listAllCategories.service";

export const createCategorieController = async (
  req: Request,
  res: Response
) => {
  const data: ICategoryRequest = req.body;
  const createdCategorie = await createCategorieService(data);
  return res.status(201).json(createdCategorie);
};

export const listAllCategoriesController = async (
  req: Request,
  res: Response
) => {
  const allCategories = await listAllCategoriesService();
  return res.status(200).json(allCategories);
};

export const getPropertiesByCategoryController = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  const propertiesByCategory = await getPropertiesByCategoryService(id);
  return res.status(200).json(propertiesByCategory);
};
