import { NextFunction, Request, Response } from "express";

import { IUser } from "../interfaces/IUser";
import { userService } from "../services/user.service";

class UserController {
  public async getList(_: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.getList();
      res.json(result);
    } catch (error: any) {
      next(error);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUser;
      const result = await userService.create(dto);
      res.status(201).json(result);
    } catch (error: any) {
      next(error);
    }
  }

  public async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId as string;
      const result = await userService.getUser(userId);
      res.status(201).json(result);
    } catch (error: any) {
      next(error);
    }
  }

  public async change(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUser;
      const userId = req.params.userId as string;
      const user = await userService.change(dto, userId);
      res.status(201).json(user);
    } catch (e: any) {
      next(e);
    }
  }

  public async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as { id: number };
      await userService.remove(dto);
      res.sendStatus(201);
    } catch (e: any) {
      next(e);
    }
  }
}

export const userController = new UserController();
