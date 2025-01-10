import { ipcMain, shell, IpcMainEvent, dialog, BrowserWindow } from 'electron'
import Constants from './utils/Constants'

/*
 * IPC Communications
 * */
export default class IPCs {
  static initialize(): void {
    // Get application version
    ipcMain.handle('msgRequestGetVersion', () => {
      return Constants.APP_VERSION
    })

    // Open url via web browser
    ipcMain.on('msgOpenExternalLink', async (event: IpcMainEvent, url: string) => {
      await shell.openExternal(url)
    })

    // Open file
    ipcMain.handle('msgOpenFile', async (event: IpcMainEvent, filter: string) => {
      const filters = []
      if (filter === 'text') {
        filters.push({ name: 'Text', extensions: ['txt', 'json'] })
      } else if (filter === 'zip') {
        filters.push({ name: 'Zip', extensions: ['zip'] })
      }
      const dialogResult = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters
      })
      return dialogResult
    })

    // Window state
    ipcMain.on('window-state', (event) => {
      const win = BrowserWindow.fromWebContents(event.sender)
      event.reply('window-focused', win?.isFocused())
    })

    // Add focus/blur listeners
    BrowserWindow.getAllWindows().forEach(win => {
      win.on('focus', () => {
        win.webContents.send('window-focused', true)
      })
      win.on('blur', () => {
        win.webContents.send('window-focused', false)
      })
    })
  }
}
