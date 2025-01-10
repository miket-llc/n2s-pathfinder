declare interface Window {
  mainApi: {
    platform: string;
    send: (channel: string, ...data: any[]) => void;
    on: (channel: string, callback: (event: IpcRendererEvent, ...args: any[]) => void) => void;
    off: (channel: string, callback: (event: IpcRendererEvent, ...args: any[]) => void) => void;
  }
}
