// tools-chat.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { evoChat } from "./services";

export const chatRegisterTool = (server: McpServer) => {
  // ARCHIVE CHAT
  server.registerTool(
    "archive_chat",
    {
      title: "archive_chat",
      description: "Archive or unarchive a specific chat",
      inputSchema: z.object({
        instanceName: z
          .string()
          .min(1)
          .describe("The name of the connected instance"),
        number: z
          .string()
          .min(1)
          .describe("The recipient's WhatsApp number to archive/unarchive"),
        archive: z
          .boolean()
          .default(true)
          .describe("Set to true to archive, false to unarchive"),
      }),
    },
    async (args, authInfo) => {
      const chatService = evoChat({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);

      // A API Evolution espera o remoteJid dentro de lastMessage ou similar dependendo da versão
      // Montando o payload padrão esperado:
      const payload = {
        lastMessage: { remoteJid: `${args.number}@s.whatsapp.net` },
        archive: args.archive,
      };

      const response = await chatService.archiveChat(payload);

      return {
        content: [{ type: "text", text: JSON.stringify(response) }],
      };
    },
  );

  // FIND CHATS
  server.registerTool(
    "find_chats",
    {
      title: "find_chats",
      description:
        "Fetch chats from the instance whatsapp with optional filters and pagination",
      inputSchema: z.object({
        instanceName: z
          .string()
          .min(1)
          .describe("The name of the connected instance"),
        where: z
          .record(z.any())
          .optional()
          .describe(
            "Optional Prisma-like where clause to filter chats (e.g., { unreadMessages: { gt: 0 } } or { isGroup: true })",
          ),
        page: z
          .number()
          .optional()
          .default(1)
          .describe("Page number for pagination"),
        limit: z
          .number()
          .optional()
          .default(20)
          .describe("Number of chats to return per page"),
      }),
    },
    async (args, authInfo) => {
      const chatService = evoChat({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);

      // Montando o payload com base no que foi enviado.
      // Se não enviar where, enviamos um objeto vazio que traz tudo.
      const payload = {
        where: args.where || {},
        page: args.page,
        limit: args.limit,
      };

      const response = await chatService.findChats(payload);

      return {
        content: [{ type: "text", text: JSON.stringify(response) }],
      };
    },
  );

  // FIND CONTACTS
  server.registerTool(
    "find_contacts",
    {
      title: "find_contacts",
      description: "Fetch all contacts from the whatsapp",
      inputSchema: z.object({
        instanceName: z
          .string()
          .min(1)
          .describe("The name of the connected instance"),
      }),
    },
    async (args, authInfo) => {
      const chatService = evoChat({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);

      const response = await chatService.findContacts({});

      return {
        content: [{ type: "text", text: JSON.stringify(response) }],
      };
    },
  );

  // FIND MESSAGES
  server.registerTool(
    "find_messages",
    {
      title: "find_messages",
      description: "Fetch messages from a specific chat",
      inputSchema: z.object({
        instanceName: z
          .string()
          .min(1)
          .describe("The name of the connected instance"),
        number: z.string().min(1).describe("The remote WhatsApp number"),
        page: z.number().optional().default(1),
        limit: z.number().optional().default(20),
      }),
    },
    async (args, authInfo) => {
      const chatService = evoChat({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);

      const payload = {
        where: { remoteJid: `${args.number}@s.whatsapp.net` },
        page: args.page,
        limit: args.limit,
      };

      const response = await chatService.findMessages(payload);

      return {
        content: [{ type: "text", text: JSON.stringify(response) }],
      };
    },
  );

  // MARK MESSAGE AS READ
  server.registerTool(
    "mark_message_as_read",
    {
      title: "mark_message_as_read",
      description: "Mark a specific message or chat as read",
      inputSchema: z.object({
        instanceName: z
          .string()
          .min(1)
          .describe("The name of the connected instance"),
        number: z.string().min(1).describe("The WhatsApp number of the sender"),
        messageId: z
          .string()
          .min(1)
          .describe("The ID of the message to mark as read"),
      }),
    },
    async (args, authInfo) => {
      const chatService = evoChat({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);

      const payload = {
        readMessages: [
          {
            remoteJid: `${args.number}@s.whatsapp.net`,
            id: args.messageId,
            fromMe: false, // Assumindo que queremos ler mensagens recebidas
          },
        ],
      };

      const response = await chatService.markMessageAsRead(payload);

      return {
        content: [{ type: "text", text: JSON.stringify(response) }],
      };
    },
  );

  // UPDATE PROFILE NAME
  server.registerTool(
    "update_profile_name",
    {
      title: "update_profile_name",
      description: "Update the WhatsApp profile name of the instance",
      inputSchema: z.object({
        instanceName: z
          .string()
          .min(1)
          .describe("The name of the connected instance"),
        name: z.string().min(1).describe("The new profile name"),
      }),
    },
    async (args, authInfo) => {
      const chatService = evoChat({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);

      const response = await chatService.updateProfileName({ name: args.name });

      return {
        content: [{ type: "text", text: JSON.stringify(response) }],
      };
    },
  );

  // UPDATE PROFILE PICTURE
  server.registerTool(
    "update_profile_picture",
    {
      title: "update_profile_picture",
      description: "Update the WhatsApp profile picture of the instance",
      inputSchema: z.object({
        instanceName: z
          .string()
          .min(1)
          .describe("The name of the connected instance"),
        picture: z
          .string()
          .min(1)
          .describe("Base64 string or URL of the new profile picture"),
      }),
    },
    async (args, authInfo) => {
      const chatService = evoChat({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);

      const response = await chatService.updateProfilePicture({
        picture: args.picture,
      });

      return {
        content: [{ type: "text", text: JSON.stringify(response) }],
      };
    },
  );

  // UPDATE PROFILE STATUS
  server.registerTool(
    "update_profile_status",
    {
      title: "update_profile_status",
      description: "Update the WhatsApp profile status (about) of the instance",
      inputSchema: z.object({
        instanceName: z
          .string()
          .min(1)
          .describe("The name of the connected instance"),
        status: z.string().min(1).describe("The new profile status/about text"),
      }),
    },
    async (args, authInfo) => {
      const chatService = evoChat({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);

      const response = await chatService.updateProfileStatus({
        status: args.status,
      });

      return {
        content: [{ type: "text", text: JSON.stringify(response) }],
      };
    },
  );

  // CHECK WHATSAPP NUMBERS
  server.registerTool(
    "check_whatsapp_numbers",
    {
      title: "check_whatsapp_numbers",
      description: "Check if one or more numbers are registered on WhatsApp",
      inputSchema: z.object({
        instanceName: z
          .string()
          .min(1)
          .describe("The name of the connected instance"),
        numbers: z
          .array(z.string())
          .describe("Array of phone numbers to check"),
      }),
    },
    async (args, authInfo) => {
      const chatService = evoChat({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);

      const response = await chatService.checkWhatsAppNumbers({
        numbers: args.numbers,
      });

      return {
        content: [{ type: "text", text: JSON.stringify(response) }],
      };
    },
  );
};
