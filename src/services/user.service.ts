import { ApiError } from "../errors/api-errors";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getList(): Promise<any[]> {
    return await userRepository.getList();
  }
  public async create(dto: Partial<any>): Promise<any> {
    return await userRepository.create(dto);
  }
  public async getUser(userId: Partial<string>): Promise<any> {
    const user = await userRepository.getUser(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }

  public async change(
    dto: Partial<any>,
    userId: Partial<string>,
  ): Promise<any> {
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

    const user = await userRepository.change(dto, userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }

  public async remove(dto: Partial<any>): Promise<void> {
    await userRepository.remove(dto);
  }
}

export const userService = new UserService();
