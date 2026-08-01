import z from "zod";
import { TaskPriority, TaskStatus } from "../task.types.js";

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters.")
    .max(150, "Title cannot exceed 150 characters."),

  description: z.string().max(1000).optional(),

  priority: z.enum(TaskPriority).optional(),

  assignee: z.string().optional(),

  dueDate: z.coerce.date().optional(),

  labels: z.array(z.string()).optional(),
});

export const updateTaskSchema = createTaskSchema.partial();

export const taskIdSchema = z.any();

export const listTasksSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
  status: z.enum(TaskStatus).optional(),
  priority: z.enum(TaskPriority).optional(),
  assignee: z.string().optional(),
  label: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export const updateTaskStatusSchema = z.object({
  status: z.enum(TaskStatus),
});

export const assignTaskSchema = z.object({
  assignee: z.string().nullable(),
});
