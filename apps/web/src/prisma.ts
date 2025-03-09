import { PrismaClient } from "../prisma";
export default new PrismaClient({ log: ["query", "info", "warn", "error"] });
