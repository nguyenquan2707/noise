import { app, BrowserWindow, shell } from 'electron'
import { join } from 'node:path'
import { release } from 'node:os'

process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
    ? join(process.env.DIST_ELECTRON, '../public')
    : process.env.DIST

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
    app.quit()
    process.exit(0)
}

let win = null

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

const preload = join(__dirname, './preload.js')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')
    
function createWindow() {
    win = new BrowserWindow({
        webPreferences: {
            preload,
            nodeIntegration: true,
            contextIsolation: false,
        },
    })
    
    if (process.env.VITE_DEV_SERVER_URL) {
        win.loadURL(url)
        win.webContents.openDevTools()
    } else {
        win.loadFile(indexHtml)
    }

    win.webContents.on('did-finish-load', () => {
        if (url.startsWith('https:')) {
            shell.openExternal(url)
        }
        return { action: 'deny' }
    })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    win = null
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('second-instance', () => {
    if (win) {
        if (win.isMinimized()) {
            win.restore()
        }
        win.focus()
    }
})

app.on('activate', () => {
    const allWindows = BrowserWindow.getAllWindows()
    if (allWindows.length) {
        allWindows[0].focus()
    } else {
        createWindow()
    }
})