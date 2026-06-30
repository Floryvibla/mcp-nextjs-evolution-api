import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { evoTemplate } from "./services";

export const templateRegisterTool = (server: McpServer) => {
  server.registerTool(
    "create_template",
    {
      title: "create_template",
      description: "Create a new WhatsApp template",
      inputSchema: z.object({
        instanceName: z.string().min(1),
        name: z.string().min(1),
        category: z.string().min(1),
        language: z.string().default("pt_BR"),
        components: z.array(z.any()),
      }),
    },
    async (args, authInfo) => {
      const service = evoTemplate({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);
      const response = await service.createTemplate(args);
      return { content: [{ type: "text", text: JSON.stringify(response) }] };
    },
  );

  server.registerTool(
    "delete_template",
    {
      title: "delete_template",
      description: "Delete an existing WhatsApp template",
      inputSchema: z.object({
        instanceName: z.string().min(1),
        templateName: z.string().min(1),
      }),
    },
    async (args, authInfo) => {
      const service = evoTemplate({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);
      const response = await service.deleteTemplate(args.templateName);
      return { content: [{ type: "text", text: JSON.stringify(response) }] };
    },
  );

  server.registerTool(
    "edit_template",
    {
      title: "edit_template",
      description: "Edit a WhatsApp template",
      inputSchema: z.object({
        instanceName: z.string().min(1),
        name: z.string().min(1),
        components: z.array(z.any()),
      }),
    },
    async (args, authInfo) => {
      const service = evoTemplate({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);
      const response = await service.editTemplate(args);
      return { content: [{ type: "text", text: JSON.stringify(response) }] };
    },
  );

  server.registerTool(
    "find_templates",
    {
      title: "find_templates",
      description: "List all WhatsApp templates for the instance",
      inputSchema: z.object({
        instanceName: z.string().min(1),
      }),
    },
    async (args, authInfo) => {
      const service = evoTemplate({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);
      const response = await service.findTemplates();
      return { content: [{ type: "text", text: JSON.stringify(response) }] };
    },
  );
};
