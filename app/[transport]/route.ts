import { businessRegisterTool } from "@/evolution-api/business/tools";
import { callRegisterTool } from "@/evolution-api/call/tools";
import { chatRegisterTool } from "@/evolution-api/chat/tools";
import { eventsRegisterTool } from "@/evolution-api/events/tools";
import { groupRegisterTool } from "@/evolution-api/group/tools";
import { instanceRegisterTool } from "@/evolution-api/instance/tool";
import { labelRegisterTool } from "@/evolution-api/label/tools";
import { messageRegisterTool } from "@/evolution-api/message/tool";
import { proxyRegisterTool } from "@/evolution-api/proxy/tools";
import { settingsRegisterTool } from "@/evolution-api/settings/tools";
import { templateRegisterTool } from "@/evolution-api/template/tools";
import { createMcpHandler, withMcpAuth } from "mcp-handler";

// StreamableHttp server
const baseHandler = createMcpHandler(
  async (server) => {
    instanceRegisterTool(server);
    messageRegisterTool(server);
    groupRegisterTool(server);
    chatRegisterTool(server);
    labelRegisterTool(server);
    eventsRegisterTool(server);
    businessRegisterTool(server);
    callRegisterTool(server);
    proxyRegisterTool(server);
    settingsRegisterTool(server);
    templateRegisterTool(server);
  },
  {},
  {
    basePath: "",
    verboseLogs: true,
    maxDuration: 3000,
    disableSse: true,
  },
);

// CORREÇÃO: Satisfez a interface exigida sem expor dados extras
const authenticatedHandler = withMcpAuth(
  baseHandler,
  async (_req, bearerToken) => {
    console.log("req: ", _req.headers);
    console.log("bearerToken: ", bearerToken);

    // Substitua pela sua validação real (Ex: process.env.MCP_SECRET_TOKEN)
    if (!bearerToken || bearerToken !== "seu-token-secreto-de-teste") {
      return undefined; // Retornar undefined bloqueia a requisição com HTTP 401
    }
    const instanceName = (await _req.headers.get("instanceName")) || "";
    const apiKey = (await _req.headers.get("apiKey")) || "";

    // Retornamos o mínimo exigido pelo tipo AuthInfo para passar na compilação
    return {
      instanceName,
      apiKey,
      token: bearerToken,
      clientId: "",
      scopes: [],
    };
  },
);

export {
  authenticatedHandler as GET,
  authenticatedHandler as POST,
  authenticatedHandler as DELETE,
};
