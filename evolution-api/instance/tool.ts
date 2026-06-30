// tools-instance.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { evoInstance } from "./service";

export const instanceRegisterTool = (server: McpServer) => {
  // CREATE INSTANCE
  server.registerTool(
    "create_instance",
    {
      title: "create_instance",
      description: "Create a new WhatsApp instance",
      inputSchema: z.object({
        instanceName: z
          .string()
          .min(1)
          .describe("The name of the instance to create"),
        token: z
          .string()
          .optional()
          .describe("Optional token for the instance"),
        number: z
          .string()
          .optional()
          .describe("Optional WhatsApp number to bind to the instance"),
      }),
    },
    async (args, authInfo) => {
      const instance = evoInstance({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);

      const response = await instance.createInstance(args);

      return {
        content: [{ type: "text", text: JSON.stringify(response) }],
      };
    },
  );

  // CONNECT INSTANCE
  server.registerTool(
    "connect_instance",
    {
      title: "connect_instance",
      description: "Connect a WhatsApp instance and get QR Code/Pairing Code",
      inputSchema: z.object({
        instanceName: z
          .string()
          .min(1)
          .describe("The name of the instance to connect"),
      }),
    },
    async ({ instanceName }, authInfo) => {
      const instance = evoInstance({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName,
      } as any);

      const response = await instance.connectInstance();

      return {
        content: [{ type: "text", text: JSON.stringify(response) }],
      };
    },
  );

  // FETCH INSTANCES
  server.registerTool(
    "fetch_instances",
    {
      title: "fetch_instances",
      description: "Fetch all configured WhatsApp instances",
      inputSchema: z.object({}), // Não precisa de parâmetros
    },
    async (_, authInfo) => {
      const instance = evoInstance({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
      } as any);

      const response = await instance.fetchInstances();

      return {
        content: [{ type: "text", text: JSON.stringify(response) }],
      };
    },
  );

  // LOGOUT INSTANCE
  server.registerTool(
    "logout_instance",
    {
      title: "logout_instance",
      description: "Logout a connected WhatsApp instance",
      inputSchema: z.object({
        instanceName: z
          .string()
          .min(1)
          .describe("The name of the instance to logout"),
      }),
    },
    async ({ instanceName }, authInfo) => {
      const instance = evoInstance({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName,
      } as any);

      const response = await instance.logoutInstance();

      return {
        content: [{ type: "text", text: JSON.stringify(response) }],
      };
    },
  );

  // DELETE INSTANCE
  server.registerTool(
    "delete_instance",
    {
      title: "delete_instance",
      description: "Delete a WhatsApp instance from the server",
      inputSchema: z.object({
        instanceName: z
          .string()
          .min(1)
          .describe("The name of the instance to delete"),
      }),
    },
    async ({ instanceName }, authInfo) => {
      const instance = evoInstance({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName,
      } as any);

      const response = await instance.deleteInstance();

      return {
        content: [{ type: "text", text: JSON.stringify(response) }],
      };
    },
  );

  // RESTART INSTANCE
  server.registerTool(
    "restart_instance",
    {
      title: "restart_instance",
      description: "Restart a specific WhatsApp instance",
      inputSchema: z.object({
        instanceName: z
          .string()
          .min(1)
          .describe("The name of the instance to restart"),
      }),
    },
    async ({ instanceName }, authInfo) => {
      const instance = evoInstance({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName,
      } as any);

      const response = await instance.restartInstance();

      return {
        content: [{ type: "text", text: JSON.stringify(response) }],
      };
    },
  );

  // CONNECTION STATE
  server.registerTool(
    "connection_state",
    {
      title: "connection_state",
      description: "Get the current connection state of a WhatsApp instance",
      inputSchema: z.object({
        instanceName: z
          .string()
          .min(1)
          .describe("The name of the instance to check state"),
      }),
    },
    async ({ instanceName }, authInfo) => {
      const instance = evoInstance({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName,
      } as any);

      const response = await instance.connectionState();

      return {
        content: [{ type: "text", text: JSON.stringify(response) }],
      };
    },
  );
};
