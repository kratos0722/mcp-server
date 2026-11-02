// Tool implementations as plain functions over the store. The MCP server wraps
// these; keeping them framework-free makes them trivially unit-testable.

import type { Ticket, TicketStatus } from "./store.js";
import { TicketStore } from "./store.js";

export function listTickets(store: TicketStore): Ticket[] {
  return store.list();
}

export function getTicket(store: TicketStore, args: { id: string }): Ticket {
  const ticket = store.get(args.id);
  if (!ticket) {
    throw new Error(`No ticket with id '${args.id}'`);
  }
  return ticket;
}

export function createTicket(
  store: TicketStore,
  args: { title: string; body: string; assignee?: string },
): Ticket {
  return store.create(args);
}

export function searchTickets(store: TicketStore, args: { query: string }): Ticket[] {
  return store.search(args.query);
}

export function setTicketStatus(
  store: TicketStore,
  args: { id: string; status: TicketStatus },
): Ticket {
  return store.setStatus(args.id, args.status);
}
