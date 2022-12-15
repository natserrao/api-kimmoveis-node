import AppDataSource from "../../data-source";
import Categories from "../../entities/categories.entity";
import Properties from "../../entities/properties.entity";
import { AppError } from "../../errors/appError";

const getPropertiesByCategoryService = async (
  id: string
): Promise<Categories> => {
  const categoriesRepository = AppDataSource.getRepository(Categories);
  const propertiesRepository = AppDataSource.getRepository(Properties);

  const categories = await categoriesRepository.findOne({
    where: {
      id: id,
    },
  });

  if (!categories) {
    throw new AppError("Category not found", 404);
  }
  const properties = await propertiesRepository.find({
    where: {
      id: categories.id,
    },
  });

  return categories;
};

export default getPropertiesByCategoryService;
