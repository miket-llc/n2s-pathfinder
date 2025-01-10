import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'

// Whitelist of valid channels used for IPC communication (Send message from Renderer to Main)
const mainAvailChannels: string[] = [
  'msgRequestGetVersion',
  'msgOpenExternalLink',
  'msgOpenFile',
  'window-controls',
  'window-state'
]

const rendererAvailChannels: string[] = [
  'window-focused'
]

contextBridge.exposeInMainWorld('mainApi', {
  platform: process.platform,
  send: (channel: string, ...data: any[]): void => {
    if (mainAvailChannels.includes(channel)) {
      ipcRenderer.send(channel, ...data)
    } else {
      throw new Error(`Unknown ipc channel name: ${channel}`)
    }
  },
  on: (channel: string, callback: (event: IpcRendererEvent, ...args: any[]) => void): void => {
    if (rendererAvailChannels.includes(channel)) {
      ipcRenderer.on(channel, (event: IpcRendererEvent, ...args: any[]) => callback(event, ...args))
    } else {
      throw new Error(`Unknown ipc channel name: ${channel}`)
    }
  },
  off: (channel: string, callback: (event: IpcRendererEvent, ...args: any[]) => void): void => {
    if (rendererAvailChannels.includes(channel)) {
      ipcRenderer.removeListener(channel, callback)
    } else {
      throw new Error(`Unknown ipc channel name: ${channel}`)
    }
  }
})

// Merge into single API exposure
contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform
})
