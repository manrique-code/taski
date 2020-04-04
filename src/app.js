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
var viewsPath = `file://${__dirname}/views/`


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
        submenu:[
            {
                label: 'Añadir clases',
                accelerator: 'CommandOrControl+Shift+C',
                click() {
                    claseWindow = new BrowserWindow({
                        webPreferences:{
                            nodeIntegration:true
                        },
                        width: 1200,
                        height: 700
                    })
 
                    claseWindow.loadURL(viewsPath + 'clases.html')
                    claseWindow.setMenu(null)
                    claseWindow.webContents.openDevTools()
                }
            },

            {

                label: 'Añadir tareas',
                accelerator: 'CommandOrControl+T',
                click() {
                    tareaWindow = new BrowserWindow({
                        webPreferences:{
                            nodeIntegration: true
                        },
                        width: 1200,
                        height: 700
                    })

                    tareaWindow.loadURL(viewsPath + 'tareas.html')
                    tareaWindow.setMenu(null)
                    tareaWindow.webContents.openDevTools()
                }

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
        label: 'Editar',
        submenu: [
            {
                label: 'Configuraciones',
                accelerator: 'CommandOrControl+S',
                click() {
                    configWindow = new BrowserWindow({
                        webPreferences:{
                            nodeIntegration: true
                        },
                        width: 1200, 
                        height: 700
                    })

                    configWindow.loadURL(viewsPath + 'configs.html')
                    configWindow.webContents.openDevTools()
                }
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

                    docenteWindow.loadURL(viewsPath + 'docentes.html')
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

    mainWindow.loadURL(viewsPath + 'main.html')
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