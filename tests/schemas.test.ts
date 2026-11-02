import { describe, expect, it } from "vitest";

import { createTicketSchema, setStatusSchema } from "../src/schemas.js";

describe("schemas", () => {
  it("accepts a valid create payload", () => {
    const parsed = createTicketSchema.parse({ title: "T", body: "B", assignee: "a" });
    expect(parsed.title).toBe("T");
  });

  it("rejects an empty title", () => {
    expect(createTicketSchema.safeParse({ title: "", body: "B" }).success).toBe(false);
  });

  it("rejects an unknown status", () => {
    expect(setStatusSchema.safeParse({ id: "T-1", status: "frozen" }).success).toBe(false);
  });

  it("accepts a known status", () => {
    expect(setStatusSchema.safeParse({ id: "T-1", status: "closed" }).success).toBe(true);
  });
});
