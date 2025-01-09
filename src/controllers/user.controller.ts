import { NextFunction, Request, Response } from "express";

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
      const dto = req.body as any;
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
      const dto = req.body as any;
      const userId = req.params.userId as string;
      const user = await userService.change(dto, userId);
      res.status(201).json(user);
    } catch (e: any) {
      next(e);
    }
  }

  public async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as any;
      await userService.remove(dto);
      res.status(201).json("delete!");
    } catch (e: any) {
      next(e);
    }
  }
}

export const userController = new UserController();
