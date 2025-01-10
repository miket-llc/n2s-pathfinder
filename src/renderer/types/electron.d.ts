import type { IpcRendererEvent } from 'electron'

// Valid IPC channels
export type MainChannel =
  | 'msgRequestGetVersion'
  | 'msgOpenExternalLink'
  | 'msgOpenFile'
  | 'window-controls'
  | 'window-state'

export type RendererChannel = 'window-focused' | 'window-state' | 'drawer-updated'

// Payload type mapping
export interface IpcPayloadMap {
  msgRequestGetVersion: void
  msgOpenExternalLink: string
  msgOpenFile: string
  'window-controls': 'minimize' | 'maximize' | 'close'
  'window-state': boolean
  'window-focused': boolean
  'drawer-updated': { drawer: string; visible: boolean }
}

export interface MainApi {
  readonly platform: string
  send: <T extends MainChannel>(
    channel: T,
    ...data: IpcPayloadMap[T] extends void ? [] : [IpcPayloadMap[T]]
  ) => void
  on: <T extends RendererChannel>(
    channel: T,
    callback: (event: IpcRendererEvent, data: IpcPayloadMap[T]) => void
  ) => void
  off: <T extends RendererChannel>(
    channel: T,
    callback: (event: IpcRendererEvent, data: IpcPayloadMap[T]) => void
  ) => void
}

declare global {
  interface Window {
    readonly mainApi: MainApi
  }
}
