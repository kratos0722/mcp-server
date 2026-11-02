import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { createTicketShape, getTicketShape, searchShape, setStatusShape } from "./schemas.js";
import { TicketStore } from "./store.js";
import { createTicket, getTicket, listTickets, searchTickets, setTicketStatus } from "./tools.js";

function jsonResult(data: unknown) {
  return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
}

/**
 * Builds the MCP server, exposing the ticket service as tools + a resource.
 * Zod shapes from {@link schemas} validate every tool input before it reaches
 * the domain, which is the whole point of putting an MCP boundary in front of
 * an internal service.
 */
export function buildServer(store: TicketStore = new TicketStore()): McpServer {
  const server = new McpServer({ name: "tickets-mcp", version: "0.1.0" });

  server.registerTool(
    "list_tickets",
    { description: "List all tickets" },
    async () => jsonResult(listTickets(store)),
  );

  server.registerTool(
    "get_ticket",
    { description: "Get a ticket by id", inputSchema: getTicketShape },
    async (args) => jsonResult(getTicket(store, args)),
  );

  server.registerTool(
    "create_ticket",
    { description: "Create a new ticket", inputSchema: createTicketShape },
    async (args) => jsonResult(createTicket(store, args)),
  );

  server.registerTool(
    "search_tickets",
    { description: "Search tickets by text in title or body", inputSchema: searchShape },
    async (args) => jsonResult(searchTickets(store, args)),
  );

  server.registerTool(
    "set_ticket_status",
    { description: "Change a ticket's status", inputSchema: setStatusShape },
    async (args) => jsonResult(setTicketStatus(store, args)),
  );

  server.registerResource(
    "tickets",
    "tickets://all",
    { description: "All tickets as JSON", mimeType: "application/json" },
    async (uri) => ({
      contents: [{ uri: uri.href, mimeType: "application/json", text: JSON.stringify(listTickets(store)) }],
    }),
  );

  return server;
}
