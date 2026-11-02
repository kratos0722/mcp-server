import { z } from "zod";

// Zod schemas validate every tool input before it reaches the domain — the
// trust boundary between an AI assistant's arguments and internal services.

export const createTicketShape = {
  title: z.string().min(1).max(200),
  body: z.string().min(1),
  assignee: z.string().min(1).optional(),
};

export const getTicketShape = {
  id: z.string().min(1),
};

export const searchShape = {
  query: z.string().min(1),
};

export const setStatusShape = {
  id: z.string().min(1),
  status: z.enum(["open", "in_progress", "closed"]),
};

export const createTicketSchema = z.object(createTicketShape);
export const getTicketSchema = z.object(getTicketShape);
export const searchSchema = z.object(searchShape);
export const setStatusSchema = z.object(setStatusShape);
