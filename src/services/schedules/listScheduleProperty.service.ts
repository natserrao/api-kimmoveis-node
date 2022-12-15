import AppDataSource from "../../data-source";
import Schedules_user_properties from "../../entities/schedules_user_properties.entity";
import Properties from "../../entities/properties.entity";
import { AppError } from "../../errors/appError";
import User from "../../entities/user.entity";

const listSchedulePropertyService = async (
  id: string
): Promise<Schedules_user_properties[]> => {
  const scheduleRepository = AppDataSource.getRepository(
    Schedules_user_properties
  );
  const propertiesRepository = AppDataSource.getRepository(Properties);
  const userRepository = AppDataSource.getRepository(User);

  const property = await propertiesRepository.findOneBy({
    id,
  });
  if (!property) {
    throw new AppError("Property not found", 404);
  }

  const user = userRepository.findOneBy({
    id: id,
  });
  const allSchedules = await scheduleRepository.find({
    relations: {
      property: true,
      user: true,
    },
  });
  return allSchedules;
};

export default listSchedulePropertyService;
