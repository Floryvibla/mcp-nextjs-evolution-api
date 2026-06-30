import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { evoEvents } from "./services";

export const eventsRegisterTool = (server: McpServer) => {
  server.registerTool(
    "get_webhook",
    {
      title: "get_webhook",
      description: "Get the webhook configuration for the instance",
      inputSchema: z.object({ instanceName: z.string().min(1) }),
    },
    async (args, authInfo) => {
      const service = evoEvents({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);
      const response = await service.getWebhook();
      return { content: [{ type: "text", text: JSON.stringify(response) }] };
    },
  );

  server.registerTool(
    "set_webhook",
    {
      title: "set_webhook",
      description: "Set the webhook configuration and subscribe to events",
      inputSchema: z.object({
        instanceName: z.string().min(1),
        url: z.string().url().min(1),
        webhookByEvents: z.boolean().default(false),
        webhookBase64: z.boolean().default(false),
        events: z
          .array(z.string())
          .describe(
            "Array of event strings to subscribe to (e.g., ['MESSAGES_UPSERT'])",
          ),
      }),
    },
    async (args, authInfo) => {
      const service = evoEvents({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);
      const response = await service.setWebhook(args);
      return { content: [{ type: "text", text: JSON.stringify(response) }] };
    },
  );

  server.registerTool(
    "set_websocket",
    {
      title: "set_websocket",
      description: "Enable or disable WebSocket events for the instance",
      inputSchema: z.object({
        instanceName: z.string().min(1),
        enabled: z.boolean(),
        events: z
          .array(z.string())
          .describe("Array of event strings to subscribe via WS"),
      }),
    },
    async (args, authInfo) => {
      const service = evoEvents({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);
      const response = await service.setWebSocket(args);
      return { content: [{ type: "text", text: JSON.stringify(response) }] };
    },
  );
};
