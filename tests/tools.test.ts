import { describe, expect, it } from "vitest";

import { TicketStore } from "../src/store.js";
import { createTicket, getTicket, listTickets, searchTickets, setTicketStatus } from "../src/tools.js";

describe("tools", () => {
  it("creates and lists tickets", () => {
    const store = new TicketStore();
    createTicket(store, { title: "A", body: "b", assignee: "me" });
    const all = listTickets(store);
    expect(all).toHaveLength(1);
    expect(all[0].assignee).toBe("me");
  });

  it("getTicket throws for unknown id", () => {
    expect(() => getTicket(new TicketStore(), { id: "nope" })).toThrow(/No ticket/);
  });

  it("searchTickets filters by query", () => {
    const store = new TicketStore();
    createTicket(store, { title: "Payment", body: "stripe webhook" });
    createTicket(store, { title: "Email", body: "smtp retry" });
    expect(searchTickets(store, { query: "stripe" }).map((t) => t.title)).toEqual(["Payment"]);
  });

  it("setTicketStatus transitions a ticket", () => {
    const store = new TicketStore();
    const t = createTicket(store, { title: "A", body: "b" });
    expect(setTicketStatus(store, { id: t.id, status: "in_progress" }).status).toBe("in_progress");
  });
});
