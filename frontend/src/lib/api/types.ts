import { Formula } from "@prisma/client";

export type RequestFormula = Omit<Formula, "id" | "authorId" | "createdAt">;
