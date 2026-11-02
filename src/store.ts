// A small in-memory "tickets" domain standing in for an internal service
// (NestJS + MongoDB in production). The MCP server exposes this via tools.

export type TicketStatus = "open" | "in_progress" | "closed";

export interface Ticket {
  id: string;
  title: string;
  body: string;
  status: TicketStatus;
  assignee?: string;
  createdAt: string;
}

export class TicketStore {
  private readonly items = new Map<string, Ticket>();
  private seq = 0;

  create(input: { title: string; body: string; assignee?: string }): Ticket {
    this.seq += 1;
    const ticket: Ticket = {
      id: `T-${this.seq}`,
      title: input.title,
      body: input.body,
      assignee: input.assignee,
      status: "open",
      createdAt: new Date().toISOString(),
    };
    this.items.set(ticket.id, ticket);
    return ticket;
  }

  get(id: string): Ticket | undefined {
    return this.items.get(id);
  }

  list(): Ticket[] {
    return [...this.items.values()];
  }

  search(query: string): Ticket[] {
    const q = query.toLowerCase();
    return this.list().filter(
      (t) => t.title.toLowerCase().includes(q) || t.body.toLowerCase().includes(q),
    );
  }

  setStatus(id: string, status: TicketStatus): Ticket {
    const ticket = this.items.get(id);
    if (!ticket) {
      throw new Error(`No ticket with id '${id}'`);
    }
    ticket.status = status;
    return ticket;
  }
}
