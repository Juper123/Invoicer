const { app, BrowserWindow } = require('electron')
const path = require('node:path')


let appWindow

function createWindow() {
    appWindow = new BrowserWindow({
        width: 1290,
        height: 800,
        autoHideMenuBar: true,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: true
        }

    })

    appWindow.loadFile('dist/invoicer/browser/index.html')
    // appWindow.webContents.openDevTools()
    appWindow.on('closed', function () {
        appWindow = null
    })
}

app.whenReady().then(() => {
    createWindow()
})
