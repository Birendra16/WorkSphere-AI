import z from "zod";
import { ProjectPriority, ProjectStatus } from "../project.types.js";

// Validates YYYY-MM-DD format and coerces to a Date object
const dateOnly = z.iso.date().pipe(z.coerce.date());

export const createProjectSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(150),
  description: z.string().max(1000).optional(),
  priority: z.enum(ProjectPriority).optional().default(ProjectPriority.MEDIUM),
  startDate: dateOnly.optional(),
  dueDate: dateOnly.optional(),
});

export const updateProjectSchema = z.object({
  name: z.string().min(3).max(150).optional(),
  description: z.string().max(1000).optional(),
  status: z.enum(ProjectStatus).optional(),
  priority: z.enum(ProjectPriority).optional(),
  startDate: dateOnly.optional(),
  dueDate: dateOnly.optional(),
});

export const listProjectsSchema = z.any();
export const getProjectSchema = z.any();
export const deleteProjectSchema = z.any();
