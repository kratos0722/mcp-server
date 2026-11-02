import { describe, expect, it } from "vitest";

import { TicketStore } from "../src/store.js";

describe("TicketStore", () => {
  it("creates tickets with incrementing ids and open status", () => {
    const store = new TicketStore();
    const a = store.create({ title: "A", body: "first" });
    const b = store.create({ title: "B", body: "second" });
    expect(a.id).toBe("T-1");
    expect(b.id).toBe("T-2");
    expect(a.status).toBe("open");
  });

  it("returns undefined for a missing ticket", () => {
    expect(new TicketStore().get("T-99")).toBeUndefined();
  });

  it("searches title and body case-insensitively", () => {
    const store = new TicketStore();
    store.create({ title: "Login bug", body: "cannot sign in" });
    store.create({ title: "Export", body: "CSV download fails" });
    expect(store.search("LOGIN").map((t) => t.title)).toEqual(["Login bug"]);
    expect(store.search("csv").map((t) => t.title)).toEqual(["Export"]);
  });

  it("updates status and throws for a missing ticket", () => {
    const store = new TicketStore();
    const t = store.create({ title: "X", body: "y" });
    expect(store.setStatus(t.id, "closed").status).toBe("closed");
    expect(() => store.setStatus("T-404", "open")).toThrow();
  });
});
