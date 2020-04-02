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

var MENU = []


//---Evaluamos en que sistema está operando la app
var iconoDesk
if(process.platform === 'win32') {
    iconoDesk = path.join(__dirname, 'assets', 'icon', 'tarea.ico')
} else {
    iconoDesk = path.join(__dirname, 'assets', 'icon', 'tareas.png')

    MENU.push({
        label: app.menu,
        submenu: [
            {role: 'about'},
            {role: 'services'},
            {role: 'separator'},
            {role: 'quit'}
        ]
    })
}

MENU.push(
    
   {
        label: 'Archivo',
        submenu: [
            {
                label: 'Configuraciones',
                accelerator: 'CommandOrControl+S'
            },
            {type: 'separator'},
            {
                label: 'Salir',
                role: 'close',
                accelerator: false
            }
        ]
   },

   {
       label: 'Cuentas',
       submenu: [
           {
               label: 'Gestiona tu cuenta',
               accelerator: 'Shift+CommandOrControl+G',
               click() {
                    docenteWindow = new BrowserWindow({
                        webPreferences: {
                            nodeIntegration: true
                        },
                        width: 1200,
                        height: 700
                    })

                    docenteWindow.loadFile('views/docentes.html')
                    docenteWindow.setMenu(null)
                    docenteWindow.webContents.openDevTools()
               }
           }
       ]
   }
)

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
    mainWindow.webContents.openDevTools()

    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })

    mainWindow.on('closed', () => {
        app.quit()
    })

    var m = Menu.buildFromTemplate(MENU)
    Menu.setApplicationMenu(m)
})