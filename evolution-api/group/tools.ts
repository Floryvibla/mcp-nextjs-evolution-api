// tools-group.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { evoGroup } from "./services";

export const groupRegisterTool = (server: McpServer) => {
  // CREATE GROUP
  server.registerTool(
    "create_group",
    {
      title: "create_group",
      description: "Create a new WhatsApp group",
      inputSchema: z.object({
        instanceName: z
          .string()
          .min(1)
          .describe("The name of the connected instance"),
        subject: z
          .string()
          .min(1)
          .describe("The name/subject of the new group"),
        description: z
          .string()
          .optional()
          .describe("Optional group description"),
        participants: z
          .array(z.string())
          .min(1)
          .describe(
            "Array of participant WhatsApp numbers (e.g., ['5511999999999'])",
          ),
      }),
    },
    async (args, authInfo) => {
      const groupService = evoGroup({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);

      // Mapeia os números para o formato correto caso o usuário envie apenas o número
      const formattedParticipants = args.participants.map((p) =>
        p.includes("@s.whatsapp.net") ? p : `${p}@s.whatsapp.net`,
      );

      const payload = {
        subject: args.subject,
        description: args.description || "",
        participants: formattedParticipants,
      };

      const response = await groupService.createGroup(payload);

      return {
        content: [{ type: "text", text: JSON.stringify(response) }],
      };
    },
  );

  // GET GROUP INFO
  server.registerTool(
    "get_group_info",
    {
      title: "get_group_info",
      description:
        "Fetch metadata and information about a specific WhatsApp group",
      inputSchema: z.object({
        instanceName: z
          .string()
          .min(1)
          .describe("The name of the connected instance"),
        groupJid: z
          .string()
          .min(1)
          .describe("The JID of the group (e.g., 123456789@g.us)"),
      }),
    },
    async (args, authInfo) => {
      const groupService = evoGroup({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);

      const response = await groupService.getGroupInfo(args.groupJid);

      return {
        content: [{ type: "text", text: JSON.stringify(response) }],
      };
    },
  );

  // GET PARTICIPANTS
  server.registerTool(
    "get_participants",
    {
      title: "get_participants",
      description:
        "Fetch the list of participants of a specific WhatsApp group",
      inputSchema: z.object({
        instanceName: z
          .string()
          .min(1)
          .describe("The name of the connected instance"),
        groupJid: z
          .string()
          .min(1)
          .describe("The JID of the group (e.g., 123456789@g.us)"),
      }),
    },
    async (args, authInfo) => {
      const groupService = evoGroup({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);

      const response = await groupService.getParticipants(args.groupJid);

      return {
        content: [{ type: "text", text: JSON.stringify(response) }],
      };
    },
  );

  // UPDATE PARTICIPANT
  server.registerTool(
    "update_participant",
    {
      title: "update_participant",
      description:
        "Add, remove, promote or demote participants in a WhatsApp group",
      inputSchema: z.object({
        instanceName: z
          .string()
          .min(1)
          .describe("The name of the connected instance"),
        groupJid: z
          .string()
          .min(1)
          .describe("The JID of the group (e.g., 123456789@g.us)"),
        action: z
          .enum(["add", "remove", "promote", "demote"])
          .describe("The action to perform"),
        participants: z
          .array(z.string())
          .min(1)
          .describe("Array of participant numbers"),
      }),
    },
    async (args, authInfo) => {
      const groupService = evoGroup({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);

      const formattedParticipants = args.participants.map((p) =>
        p.includes("@s.whatsapp.net") ? p : `${p}@s.whatsapp.net`,
      );

      const payload = {
        groupJid: args.groupJid,
        action: args.action,
        participants: formattedParticipants,
      };

      const response = await groupService.updateParticipant(payload);

      return {
        content: [{ type: "text", text: JSON.stringify(response) }],
      };
    },
  );
};
