import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { buildServer } from "./server.js";
import { TicketStore } from "./store.js";

async function main(): Promise<void> {
  const store = new TicketStore();
  store.create({ title: "Welcome", body: "Example seed ticket", assignee: "system" });

  const server = buildServer(store);
  await server.connect(new StdioServerTransport());
  // The server now serves tools/resources over stdio until the client disconnects.
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
