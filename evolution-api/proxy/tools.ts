import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { evoProxy } from "./services";

export const proxyRegisterTool = (server: McpServer) => {
  server.registerTool(
    "get_proxy",
    {
      title: "get_proxy",
      description: "Get the proxy configuration for the instance",
      inputSchema: z.object({ instanceName: z.string().min(1) }),
    },
    async (args, authInfo) => {
      const service = evoProxy({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);
      const response = await service.getProxy();
      return { content: [{ type: "text", text: JSON.stringify(response) }] };
    },
  );

  server.registerTool(
    "set_proxy",
    {
      title: "set_proxy",
      description: "Set the proxy configuration for the instance",
      inputSchema: z.object({
        instanceName: z.string().min(1),
        host: z.string().min(1),
        port: z.number(),
        protocol: z.string().default("http"),
        username: z.string().optional(),
        password: z.string().optional(),
      }),
    },
    async (args, authInfo) => {
      const service = evoProxy({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);
      const response = await service.setProxy(args);
      return { content: [{ type: "text", text: JSON.stringify(response) }] };
    },
  );
};
