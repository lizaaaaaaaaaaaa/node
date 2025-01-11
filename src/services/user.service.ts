import { ApiError } from "../errors/api-errors";
import { IUser, IUserDto } from "../interfaces/IUser";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }

  public async create(dto: IUserDto): Promise<IUser[]> {
    return await userRepository.create(dto);
  }

  public async getUser(userId: string): Promise<IUser> {
    const user: IUser | undefined = await userRepository.getUser(userId);

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    return user;
  }

  public async change(dto: IUserDto, userId: string): Promise<IUser> {
    if (!dto.name || dto.name.length < 3) {
      throw new ApiError(
        "Name is required and should be minimum 3 symbols",
        400,
      );
    }
    if (!dto.email || !dto.email.includes("@")) {
      throw new ApiError("Email is required", 400);
    }
    if (!dto.password || dto.password.length < 8) {
      throw new ApiError(
        "Password is required and should be minimum 8 symbols",
        400,
      );
    }

    const user: IUser = await userRepository.change(dto, userId);

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    return user;
  }

  public async remove(userId: string): Promise<void> {
    await userRepository.remove(userId);
  }
}

export const userService = new UserService();
