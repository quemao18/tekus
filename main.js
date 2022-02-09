const { app, ipcMain, BrowserWindow, screen } = require("electron");
const Store = require("electron-store");

let appWin;
const store = new Store();

if (!store.get("prices")) {
    store.set("prices", []);
}

//This function creates the window and its properties.
const createWindow = () => {
    let display = screen.getPrimaryDisplay();
    let width = display.bounds.width;
    let height = display.bounds.height;
    appWin = new BrowserWindow({
        width: parseInt(width/4),
        height: height,
        x: width - parseInt(width/3.7),
        y: 10,
        title: "Tekus - Angular and Electron",
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        }
    });
    
    appWin.loadURL(`file://${__dirname}/dist/index.html`);

    appWin.setMenu(null);
    /* hide console
    appWin.webContents.openDevTools();
    */
    appWin.on("closed", () => {
        appWin = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
});
