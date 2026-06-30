import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { evoLabel } from "./services";

export const labelRegisterTool = (server: McpServer) => {
  server.registerTool(
    "get_labels",
    {
      title: "get_labels",
      description: "Get all WhatsApp labels for the instance",
      inputSchema: z.object({ instanceName: z.string().min(1) }),
    },
    async (args, authInfo) => {
      const service = evoLabel({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);
      const response = await service.getLabels();
      return { content: [{ type: "text", text: JSON.stringify(response) }] };
    },
  );

  server.registerTool(
    "handle_label",
    {
      title: "handle_label",
      description: "Add or remove labels to a specific chat/message",
      inputSchema: z.object({
        instanceName: z.string().min(1),
        number: z.string().min(1),
        options: z.object({
          labelId: z.string(),
          action: z.enum(["add", "remove"]),
        }),
      }),
    },
    async (args, authInfo) => {
      const service = evoLabel({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);
      const payload = { number: args.number, options: args.options };
      const response = await service.handleLabel(payload);
      return { content: [{ type: "text", text: JSON.stringify(response) }] };
    },
  );
};
