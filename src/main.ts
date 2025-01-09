import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";

import { ApiError } from "./errors/api-errors";
import { userRouter } from "./routes/user.router";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

// app.get(
//   "/users",
//   async (_: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//       const users = await read();
//       res.json(users);
//     } catch (e: any) {
//       next(e);
//     }
//   },
// );
//
// app.post(
//   "/users",
//   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//       const body = req.body;
//       if (!body.name || body.name.length < 3) {
//         throw new ApiError(
//           "Name is required and should be minimum 3 symbols",
//           400,
//         );
//       }
//       if (!body.email || !body.email.includes("@")) {
//         throw new ApiError("Email is required", 400);
//       }
//       if (!body.password || body.password.length < 8) {
//         throw new ApiError(
//           "Password is required and should be minimum 8 symbols",
//           400,
//         );
//       }
//       const users = await read();
//       const newUser = {
//         id: users.length ? users[users.length - 1].id + 1 : 1,
//         name: body.name,
//         email: body.email,
//         password: body.password,
//       };
//       users.push(newUser);
//       await write(users);
//       res.status(201).json(newUser);
//     } catch (e: any) {
//       next(e);
//     }
//   },
// );
//
// app.get(
//   "/users/:userId",
//   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//       const users = await read();
//       const user = users.find(
//         (user: { id: number }) => user.id === Number(req.params.userId),
//       );
//       if (!user) {
//         throw new ApiError("User not found", 404);
//       }
//       res.json(user);
//     } catch (e: any) {
//       next(e);
//     }
//   },
// );
//
// app.put(
//   "/users/:userId",
//   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//       if (!req.body.name || req.body.name.length < 3) {
//         throw new ApiError(
//           "Name is required and should be minimum 3 symbols",
//           400,
//         );
//       }
//       if (!req.body.email || !req.body.email.includes("@")) {
//         throw new ApiError("Email is required", 400);
//       }
//       if (!req.body.password || req.body.password.length < 8) {
//         throw new ApiError(
//           "Password is required and should be minimum 8 symbols",
//           400,
//         );
//       }
//       const users = await read();
//       const index = users.findIndex(
//         (user: { id: number }) => user.id === Number(req.params.userId),
//       );
//
//       if (index === -1) {
//         throw new ApiError("User not found", 404);
//       }
//       const user = users[index];
//       user.name = req.body.name;
//       user.email = req.body.email;
//       user.password = req.body.password;
//
//       await write(users);
//       res.status(201).json(user);
//     } catch (e: any) {
//       next(e);
//     }
//   },
// );
//
// app.delete(
//   "/users/:userId",
//   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//       const users = await read();
//       const index = users.findIndex(
//         (user: { id: number }) => user.id === Number(req.params.userId),
//       );
//
//       if (index === -1) {
//         throw new ApiError("User not found", 404);
//       }
//       users.splice(index, 1);
//       await write(users);
//       res.sendStatus(204);
//     } catch (e: any) {
//       next(e);
//     }
//   },
// );

// * - означає що сюди будуть приходити всі помилки з попередніх запитів та буде оброблюватись як помилка
// інформація про помилка є 4 аргументом, але по факту знаходиться спочатку і з'являється лише якщо є функція next
// ставимо дефолтні значення для обробки помилок: якщо ми їх визначили до(в попередніх), то використовуємо їх, якщо ні, то дефолтні значення
app.use(
  "*",
  (error: ApiError, req: Request, res: Response, next: NextFunction) => {
    const status = error.status ?? 500;
    const message = error.message ?? "Something went wrong";

    res.status(status).json({ status, message });
  },
);

// корисно обробляти помилки, які було забуто оброблено для цього. просто потрібно визначити обробник, який оброблює всі можливі помилки, які були забуті
process.on("uncaughtException", (error) => {
  console.error("UncaughtException: ", error);
  process.exit(1);
});

// CRUD
// Create - POST
// Read - GET
// Update - PUT
// Delete - DELETE

// create-users -> users (POST)
// get-list-users -> users (GET)
// get-user-by-id -> users/:id (GET)
// update-user -> users/:id (PUT)
// delete-user -> users/:id (DELETE)

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server has been started on port ${port}`);
});
