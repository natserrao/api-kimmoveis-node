import AppDataSource from "../../data-source";
import Categories from "../../entities/categories.entity";

const listAllCategoriesService = async (): Promise<Categories[]> => {
  const categoriesRepository = AppDataSource.getRepository(Categories);
  const allCategories = await categoriesRepository.find();
  return allCategories;
};

export default listAllCategoriesService;
