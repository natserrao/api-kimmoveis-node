import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import { IUser, IUserRequest } from "../../interfaces/users";
import { hash } from "bcryptjs";
import { AppError } from "../../errors/appError";

const createUserService = async ({
  name,
  email,
  password,
  isAdm,
}: IUserRequest): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();
  const emailExists = users.find((user) => user.email === email);

  if (emailExists) {
    throw new AppError("This email is already being used");
  }

  const hashedPassword = await hash(password, 10);
  const user = userRepository.create({
    name,
    email,
    password: hashedPassword,
    isAdm,
  });

  await userRepository.save(user);
  return user;
};

export default createUserService;
