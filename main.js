const { app, ipcMain, BrowserWindow, screen } = require("electron");
const Store = require("electron-store");

let appWin;
const store = new Store();

//If the record does not exist, it is created with a default value of 0.
if (!store.get("clicks")) {
    store.set("clicks", 0);
}
if (!store.get("prices")) {
    store.set("prices", []);
}

//This function creates the window and its properties.
const createWindow = () => {
    let display = screen.getPrimaryDisplay();
    let width = display.bounds.width;
    let height = display.bounds.height;
    appWin = new BrowserWindow({
        width: width/6,
        height: height,
        x: width - parseInt(width/1.95),
        y: 10,
        title: "Angular and Electron",
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            // contextIsolation: true
        }
    });
    
    appWin.loadURL(`file://${__dirname}/dist/index.html`);

    appWin.setMenu(null);

    appWin.webContents.openDevTools();

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

/* ipcMain is listening the "message" channel, and when the message arrives, 
  it replies with "pong" */
ipcMain.on("message", (event) => event.reply("reply", "pong"));