const {app, BrowserWindow, Menu, ipcMain, Tray} = require('electron')
var path = require('path')

//---------Ventanas a utilizar----------------
var mainWindow = null,
    docenteWindow = null,
    periodoWindow = null,
    claseWindow = null,
    asignaturaWindow = null,
    tareaWindow = null,
    configWindow = null

//---Evaluamos para mostrar un icono tanto en el dock o barra de tarea
var iconoDesk
if(process.platform === 'darwin') {
    iconoDesk = path.join(__dirname, 'assets', 'icon', 'tarea.ico')
} else {
    iconoDesk = path.join(__dirname, 'assets', 'icon', 'tareas.png')
}

app.on('ready', () => {

    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 1366,
        height: 766,
        icon: iconoDesk
    })

    mainWindow.loadFile('views/main.html')
    mainWindow.maximize()
    //mainWindow.webContents.openDevTools()

    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })

    mainWindow.on('closed', () => {
        app.quit()
    })

})