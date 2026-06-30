import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { evoMessage } from "./services";

export const messageRegisterTool = (server: McpServer) => {
  // SEND TEXT MESSAGE
  server.registerTool(
    "send_text",
    {
      title: "send_text",
      description: "Send a simple text message",
      inputSchema: z.object({
        instanceName: z
          .string()
          .min(1)
          .describe("The name of the connected instance"),
        number: z.string().min(1).describe("Recipient's WhatsApp number"),
        text: z.string().min(1).describe("Text message content"),
        delay: z.number().optional().default(1200),
        linkPreview: z.boolean().optional().default(true),
      }),
    },
    async (args, authInfo) => {
      const messageService = evoMessage({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);

      const response = await messageService.sendText(args);

      return {
        content: [{ type: "text", text: JSON.stringify(response) }],
      };
    },
  );

  // SEND MEDIA MESSAGE
  server.registerTool(
    "send_media",
    {
      title: "send_media",
      description: "Send image, video, audio, or document",
      inputSchema: z.object({
        instanceName: z
          .string()
          .min(1)
          .describe("The name of the connected instance"),
        number: z.string().min(1).describe("Recipient's WhatsApp number"),
        mediatype: z.enum(["image", "video", "audio", "document"]),
        media: z.string().describe("Base64 string or URL of the media"),
        caption: z.string().optional(),
        fileName: z.string().optional(),
        delay: z.number().optional().default(1200),
      }),
    },
    async (args, authInfo) => {
      const messageService = evoMessage({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);

      const response = await messageService.sendMedia(args);

      return {
        content: [{ type: "text", text: JSON.stringify(response) }],
      };
    },
  );

  // SEND BUTTONS
  server.registerTool(
    "send_buttons",
    {
      title: "send_buttons",
      description: "Send an interactive buttons message",
      inputSchema: z.object({
        instanceName: z
          .string()
          .min(1)
          .describe("The name of the connected instance"),
        number: z.string().min(1).describe("Recipient's WhatsApp number"),
        title: z.string().optional(),
        description: z.string().min(1),
        footerText: z.string().optional(),
        buttons: z.array(
          z.object({
            buttonId: z.string(),
            buttonText: z.object({ displayText: z.string() }),
            type: z.number().default(1),
          }),
        ),
        delay: z.number().optional().default(1200),
      }),
    },
    async (args, authInfo) => {
      const messageService = evoMessage({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);

      const response = await messageService.sendButtons(args);

      return {
        content: [{ type: "text", text: JSON.stringify(response) }],
      };
    },
  );

  // SEND CONTACT
  server.registerTool(
    "send_contact",
    {
      title: "send_contact",
      description: "Send a contact card (vCard)",
      inputSchema: z.object({
        instanceName: z
          .string()
          .min(1)
          .describe("The name of the connected instance"),
        number: z.string().min(1).describe("Recipient's WhatsApp number"),
        contactName: z.string().min(1),
        contactVcard: z
          .string()
          .min(1)
          .describe("The number of the contact to send"),
        delay: z.number().optional().default(1200),
      }),
    },
    async (args, authInfo) => {
      const messageService = evoMessage({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);

      const payload = {
        number: args.number,
        contactMessage: [
          {
            fullName: args.contactName,
            wuid: args.contactVcard,
            phoneNumber: args.contactVcard,
          },
        ],
        delay: args.delay,
      };

      const response = await messageService.sendContact(payload);

      return {
        content: [{ type: "text", text: JSON.stringify(response) }],
      };
    },
  );

  // SEND LIST
  server.registerTool(
    "send_list",
    {
      title: "send_list",
      description: "Send an interactive list/menu message",
      inputSchema: z.object({
        instanceName: z
          .string()
          .min(1)
          .describe("The name of the connected instance"),
        number: z.string().min(1).describe("Recipient's WhatsApp number"),
        title: z.string(),
        description: z.string(),
        buttonText: z.string(),
        footerText: z.string().optional(),
        sections: z.array(
          z.object({
            title: z.string(),
            rows: z.array(
              z.object({
                title: z.string(),
                description: z.string().optional(),
                rowId: z.string(),
              }),
            ),
          }),
        ),
        delay: z.number().optional().default(1200),
      }),
    },
    async (args, authInfo) => {
      const messageService = evoMessage({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);

      const response = await messageService.sendList(args);

      return {
        content: [{ type: "text", text: JSON.stringify(response) }],
      };
    },
  );

  // SEND LOCATION
  server.registerTool(
    "send_location",
    {
      title: "send_location",
      description: "Send geographical coordinates",
      inputSchema: z.object({
        instanceName: z
          .string()
          .min(1)
          .describe("The name of the connected instance"),
        number: z.string().min(1).describe("Recipient's WhatsApp number"),
        name: z.string().min(1).describe("Name of the location"),
        address: z.string().min(1),
        latitude: z.number(),
        longitude: z.number(),
        delay: z.number().optional().default(1200),
      }),
    },
    async (args, authInfo) => {
      const messageService = evoMessage({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);

      const response = await messageService.sendLocation(args);

      return {
        content: [{ type: "text", text: JSON.stringify(response) }],
      };
    },
  );

  // SEND POLL
  server.registerTool(
    "send_poll",
    {
      title: "send_poll",
      description: "Send a poll with options",
      inputSchema: z.object({
        instanceName: z
          .string()
          .min(1)
          .describe("The name of the connected instance"),
        number: z.string().min(1).describe("Recipient's WhatsApp number"),
        name: z.string().min(1).describe("Poll question"),
        selectableCount: z.number().default(1),
        options: z.array(z.string()).describe("Array of options/answers"),
        delay: z.number().optional().default(1200),
      }),
    },
    async (args, authInfo) => {
      const messageService = evoMessage({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);

      const payload = {
        number: args.number,
        name: args.name,
        selectableCount: args.selectableCount,
        options: args.options.map((opt) => ({ optionName: opt })),
        delay: args.delay,
      };

      const response = await messageService.sendPoll(payload);

      return {
        content: [{ type: "text", text: JSON.stringify(response) }],
      };
    },
  );

  // SEND REACTION
  server.registerTool(
    "send_reaction",
    {
      title: "send_reaction",
      description: "Send an emoji reaction to a specific message",
      inputSchema: z.object({
        instanceName: z
          .string()
          .min(1)
          .describe("The name of the connected instance"),
        number: z.string().min(1).describe("Recipient's WhatsApp number"),
        reaction: z.string().min(1).describe("The emoji to react with"),
        messageId: z
          .string()
          .min(1)
          .describe("The ID of the message being reacted to"),
      }),
    },
    async (args, authInfo) => {
      const messageService = evoMessage({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);

      const response = await messageService.sendReaction(args);

      return {
        content: [{ type: "text", text: JSON.stringify(response) }],
      };
    },
  );

  // SEND TEMPLATE MESSAGE
  server.registerTool(
    "send_template_message",
    {
      title: "send_template_message",
      description: "Send a WhatsApp Business Template message",
      inputSchema: z.object({
        instanceName: z
          .string()
          .min(1)
          .describe("The name of the connected instance"),
        number: z.string().min(1).describe("Recipient's WhatsApp number"),
        templateName: z.string().min(1),
        languageCode: z.string().default("pt_BR"),
        components: z
          .array(z.any())
          .optional()
          .describe("Dynamic variables or components of the template"),
      }),
    },
    async (args, authInfo) => {
      const messageService = evoMessage({
        apikey: authInfo.requestInfo?.headers.apikey,
        baseURL: authInfo.requestInfo?.headers.baseurl,
        instanceName: args.instanceName,
      } as any);

      const response = await messageService.sendTemplateMessage(args);

      return {
        content: [{ type: "text", text: JSON.stringify(response) }],
      };
    },
  );
};
