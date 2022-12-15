import AppDataSource from "../../data-source";
import Categories from "../../entities/categories.entity";
import Properties from "../../entities/properties.entity";
import { AppError } from "../../errors/appError";
import { ICategoryRequest } from "../../interfaces/categories";

const createCategorieService = async ({
  name,
}: ICategoryRequest): Promise<Categories> => {
  const categoriesRepository = AppDataSource.getRepository(Categories);

  const category = await categoriesRepository.findOne({
    where: { name },
  });
  if (category) {
    throw new AppError("This category is already registered");
  }
  const newCategory = categoriesRepository.create({
    name,
  });
  await categoriesRepository.save(newCategory);
  return newCategory;
};

export default createCategorieService;
