const {app, BrowserWindow, ipcMain, dialog} = require("electron");
require('electron-reload')(__dirname);
/**
 * Main
 */

app.whenReady().then(async() => {
    ipcMain.on("closeApp", () => {
        app.quit()
    });
    const updater = new BrowserWindow({
        width: 300,
        height: 400,
        minWidth: 300,
        minHeight: 400,
        maxHeight: 300,
        maxWidth: 400,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: true
        }
    });
    updater.loadFile("./src/modules/html/updater.html");
    //updater.loadFile("index.html");
    ipcMain.on("errorFile", (event, data) => {
        dialog.showErrorBox(data.title, data.req);
    });
    ipcMain.on("startMainApp", () => {
        updater.loadFile("./src/modules/html/app.html");
    });
    ipcMain.on("loadWindow", () => {
        const main = new BrowserWindow({
            width: 1200,
            height: 800,
            minWidth: 800,
            minHeight: 600,
            frame: false,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                devTools: true
            }
        });
        main.loadFile("./src/modules/html/main.html");
        ipcMain.on("dockApp", () => {
            if (main.isMaximized()) {
                main.unmaximize()
            } else {
                main.maximize()
            }
        });
        ipcMain.on("loadedMain", (event) => {
            main.on("maximize", () => {
                event.reply("max");
            });
            main.on("unmaximize", () => {
                event.reply("min");
            });
        });
        ipcMain.on("minimiseApp", () => {
            main.minimize()
        });
        updater.close()
    });
});