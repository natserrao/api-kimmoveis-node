import AppDataSource from "../../data-source";
import Properties from "../../entities/properties.entity";

const listAllPropertiesService = (): Promise<Properties[]> => {
  const propertiesRepository = AppDataSource.getRepository(Properties);
  const allProperties = propertiesRepository.find();

  return allProperties;
};

export default listAllPropertiesService;
