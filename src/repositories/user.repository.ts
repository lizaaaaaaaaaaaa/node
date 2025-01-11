import { ApiError } from "../errors/api-errors";
import { IUser, IUserDto } from "../interfaces/IUser";
import { read, write } from "../services/fs.service";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await read();
  }
  // dto - data transfer object
  public async create(dto: IUserDto): Promise<IUser[]> {
    const users: IUser[] = await read();
    const newUser: IUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      name: dto.name,
      email: dto.email,
      password: dto.password,
    };
    users.push(newUser);
    await write(users);
    return users;
  }

  public async getUser(userId: string): Promise<IUser | undefined> {
    const users: IUser[] = await read();
    return users.find(
      (user: { id: number }): boolean => user.id === Number(userId),
    );
  }

  public async change(dto: IUserDto, userId: Partial<string>): Promise<IUser> {
    const users: IUser[] = await read();
    const index: number = users.findIndex(
      (user: { id: number }): boolean => user.id === Number(userId),
    );

    if (index === -1) {
      throw new ApiError("User not found", 404);
    }

    const user: IUser = users[index];
    user.name = dto.name;
    user.email = dto.email;
    user.password = dto.password;

    await write(users);
    return user;
  }

  public async remove(userId: string): Promise<void> {
    const users: IUser[] = await read();
    const index: number = users.findIndex(
      (user: { id: number }) => user.id === Number(userId),
    );

    if (index === -1) {
      throw new ApiError("User not found", 404);
    }

    users.splice(index, 1);
    await write(users);
  }
}

export const userRepository = new UserRepository();
