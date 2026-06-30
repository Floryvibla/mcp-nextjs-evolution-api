export interface ConnectInstanceResponseSuccess {
  pairingCode: null;
  code: string;
  base64: string;
  count: number;
}

export type ConnectInstanceResponseError = {
  success: boolean;
  error: {
    code: string;
    message: string;
  };
  meta: {
    timestamp: string;
    path: string;
    method: string;
  };
};
