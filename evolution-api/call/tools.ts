import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { evoCall } from "./services";

export const callRegisterTool = (server: McpServer) => {
  server.registerTool(
    "offer_call",
    {
      title: "offer_call",
      description: "Offer an audio or video call",
      inputSchema: z.object({
        instanceName: z.string().min(1),
        number: z.string().min(1),
      }),
    },
    async (args, authInfo) => {
      const service = evoCall({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);
      const response = await service.offerCall({ number: args.number });
      return { content: [{ type: "text", text: JSON.stringify(response) }] };
    },
  );
};
