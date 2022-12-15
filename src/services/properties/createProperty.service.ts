import { IPropertyRequest } from "../../interfaces/properties";
import AppDataSource from "../../data-source";
import Properties from "../../entities/properties.entity";
import { AppError } from "../../errors/appError";
import Categories from "../../entities/categories.entity";
import Addresses from "../../entities/adresses.entity";

const createPropertyService = async ({
  value,
  size,
  address,
  categoryId,
}: IPropertyRequest): Promise<Properties> => {
  const propertiesRepository = AppDataSource.getRepository(Properties);
  const categoriesRepository = AppDataSource.getRepository(Categories);
  const addressRepository = AppDataSource.getRepository(Addresses);

  const newAdress = addressRepository.create({
    district: address.district,
    zipCode: address.zipCode,
    number: address.number,
    city: address.city,
    state: address.state,
  });

  await addressRepository.save(newAdress);

  const property = await propertiesRepository.findOne({
    where: { address },
  });

  if (property) {
    throw new AppError("This property is already registered");
  }
  if (newAdress.state.length > 2) {
    throw new AppError("Inform the state with only 2 characters");
  }
  if (newAdress.zipCode.length > 8) {
    throw new AppError("Inform the zipCode with only 8 characters");
  }

  const categories = await categoriesRepository.findOne({
    where: {
      id: categoryId,
    },
  });

  if (!categories) {
    throw new AppError("Category not found", 404);
  }

  const newProperty = propertiesRepository.create({
    value,
    size,
    address: newAdress,
    category: categories!,
  });
  await propertiesRepository.save(newProperty);
  return newProperty;
};

export default createPropertyService;
