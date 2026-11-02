// Demo MCP client: launches the server over stdio, lists its tools, and calls
// one — the same pattern used to consume in-house and third-party MCP servers.

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function main(): Promise<void> {
  const transport = new StdioClientTransport({ command: "tsx", args: ["src/index.ts"] });
  const client = new Client({ name: "demo-client", version: "0.1.0" });
  await client.connect(transport);

  const { tools } = await client.listTools();
  console.log("available tools:", tools.map((t) => t.name).join(", "));

  const created = await client.callTool({
    name: "create_ticket",
    arguments: { title: "From the MCP client", body: "created over stdio" },
  });
  console.log("create_ticket ->", JSON.stringify(created.content));

  const all = await client.callTool({ name: "list_tickets", arguments: {} });
  console.log("list_tickets ->", JSON.stringify(all.content));

  await client.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
