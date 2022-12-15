import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const softDeleteUserService = async (id: string): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const userFind = await userRepository.findOneBy({
    id,
  });
  if (!userFind) {
    throw new AppError("User not found", 404);
  }
  if (userFind.isActive === false) {
    throw new AppError("You can't activate the user", 400);
  }

  await userRepository.update(id, {
    isActive: false,
  });
};

export default softDeleteUserService;
