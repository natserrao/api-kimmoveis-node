import AppDataSource from "../../data-source";
import Properties from "../../entities/properties.entity";
import Schedules_user_properties from "../../entities/schedules_user_properties.entity";
import User from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IScheduleRequest } from "../../interfaces/schedules";

const createScheduleService = async (
  { date, hour, propertyId }: IScheduleRequest,
  id: string
) => {
  const userRepository = AppDataSource.getRepository(User);
  const scheduleRepository = AppDataSource.getRepository(
    Schedules_user_properties
  );
  const propertiesRepository = AppDataSource.getRepository(Properties);

  const userFind = await userRepository.findOneBy({
    id,
  });

  const property = await propertiesRepository.findOneBy({
    id: propertyId,
  });

  if (!property) {
    throw new AppError("This property was not found", 404);
  }

  const dateSchedule = require("@lfreneda/eh-dia-util");

  if (!dateSchedule(date)) {
    throw new AppError("This day isn't avaliable");
  }

  if (hour < "08:00:00" || hour > "18:00:00") {
    throw new AppError("This time isn't avaliable");
  }

  const allSchedules = await scheduleRepository.find();
  const scheduleExists = allSchedules.find(
    (schedule) => schedule.date === date && schedule.hour === hour
  );

  if (scheduleExists) {
    throw new AppError("These day and hour are unavaliable");
  }

  const newSchedule = scheduleRepository.create({
    date,
    hour,
    property: property,
    user: userFind!,
  });

  await scheduleRepository.save(newSchedule);
};

export default createScheduleService;
