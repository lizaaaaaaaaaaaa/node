import fs from "node:fs/promises";
import path from "node:path";

import { IUser } from "../interfaces/IUser";

const pathToFile: string = path.resolve(process.cwd(), "db", "users.json");

const read = async (): Promise<IUser[]> => {
  try {
    const json: string = await fs.readFile(pathToFile, "utf-8");
    return json ? JSON.parse(json) : [];
  } catch (error: any) {
    console.log("Error:", error.message);
    return [];
  }
};

const write = async (users: IUser[]): Promise<void> => {
  try {
    await fs.writeFile(pathToFile, JSON.stringify(users, null, 2));
  } catch (error: any) {
    console.log("Error:", error.message);
  }
};

export { read, write };
