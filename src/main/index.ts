import { app, WebContents, RenderProcessGoneDetails, BrowserWindow } from 'electron'
import Constants from './utils/Constants'
import { createErrorWindow, createMainWindow } from './MainRunner'

let mainWindow: BrowserWindow | null = null
// eslint-disable-next-line
let errorWindow: BrowserWindow | null = null

app.on('ready', async () => {
  if (Constants.IS_DEV_ENV) {
    import('./index.dev')
  }

  // Disable special menus on macOS by uncommenting the following, if necessary
  /*
  if (Constants.IS_MAC) {
    systemPreferences.setUserDefault('NSDisabledDictationMenuItem', 'boolean', true)
    systemPreferences.setUserDefault('NSDisabledCharacterPaletteMenuItem', 'boolean', true)
  }
  */

  mainWindow = await createMainWindow()
})

app.on('activate', async () => {
  if (!mainWindow) {
    mainWindow = await createMainWindow()
  }
})

app.on('window-all-closed', () => {
  mainWindow = null
  errorWindow = null

  if (!Constants.IS_MAC) {
    app.quit()
  }
})
;(app as any).on(
  'render-process-gone',
  async (event: Event, webContents: WebContents, details: RenderProcessGoneDetails) => {
    errorWindow = await createErrorWindow(mainWindow, details)
  }
)

process.on('uncaughtException', async () => {
  errorWindow = await createErrorWindow(mainWindow)
})
