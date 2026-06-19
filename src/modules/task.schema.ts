import { z } from 'zod';
 
// Must match the Status enum in prisma/schema.prisma
export const statusEnum = z.enum(['TODO', 'IN_PROGRESS', 'DONE']);
 
export const createTaskSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  description: z.string().trim().optional(),
  status: statusEnum.optional(),
});
 
export const updateStatusSchema = z.object({
  status: statusEnum,
});

export const updateTaskSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').optional(),
  description: z.string().trim().optional(),
  status: statusEnum.optional(),
});
 
// Types inferred directly from the schemas, used by the service layer
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateStatusInput = z.infer<typeof updateStatusSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
