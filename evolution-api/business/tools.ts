import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { evoBusiness } from "./services";

export const businessRegisterTool = (server: McpServer) => {
  server.registerTool(
    "get_catalog",
    {
      title: "get_catalog",
      description: "Get the business catalog of a specific WhatsApp number",
      inputSchema: z.object({
        instanceName: z.string().min(1),
        number: z
          .string()
          .min(1)
          .describe("The WhatsApp number of the business"),
      }),
    },
    async (args, authInfo) => {
      const service = evoBusiness({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);

      const payload = { remoteJid: `${args.number}@s.whatsapp.net` };
      const response = await service.getCatalog(payload);
      return { content: [{ type: "text", text: JSON.stringify(response) }] };
    },
  );

  server.registerTool(
    "get_collections",
    {
      title: "get_collections",
      description: "Get the business collections of a specific WhatsApp number",
      inputSchema: z.object({
        instanceName: z.string().min(1),
        number: z.string().min(1),
      }),
    },
    async (args, authInfo) => {
      const service = evoBusiness({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);

      const payload = { remoteJid: `${args.number}@s.whatsapp.net` };
      const response = await service.getCollections(payload);
      return { content: [{ type: "text", text: JSON.stringify(response) }] };
    },
  );
};
