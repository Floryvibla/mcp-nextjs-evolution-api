import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { evoSettings } from "./services";

export const settingsRegisterTool = (server: McpServer) => {
  server.registerTool(
    "get_settings",
    {
      title: "get_settings",
      description: "Get instance settings",
      inputSchema: z.object({ instanceName: z.string().min(1) }),
    },
    async (args, authInfo) => {
      const service = evoSettings({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);
      const response = await service.getSettings();
      return { content: [{ type: "text", text: JSON.stringify(response) }] };
    },
  );

  server.registerTool(
    "set_settings",
    {
      title: "set_settings",
      description: "Set instance settings (e.g., rejectCall, readMessages)",
      inputSchema: z.object({
        instanceName: z.string().min(1),
        settings: z.any().describe("Object containing settings to update"),
      }),
    },
    async (args, authInfo) => {
      const service = evoSettings({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);
      const response = await service.setSettings(args.settings);
      return { content: [{ type: "text", text: JSON.stringify(response) }] };
    },
  );
};
