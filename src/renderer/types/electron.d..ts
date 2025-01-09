declare interface Window {
  electronAPI: {
    platform: string;
    send: (channel: string, data: any) => void;
  }
}
