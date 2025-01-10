import type { IpcRendererEvent } from 'electron'

export interface MainApi {
  platform: string
  send: (channel: string, ...data: any[]) => void
  on: (channel: string, callback: (event: IpcRendererEvent, ...args: any[]) => void) => void
  off: (channel: string, callback: (event: IpcRendererEvent, ...args: any[]) => void) => void
}

declare global {
  interface Window {
    readonly mainApi: MainApi
  }
}
