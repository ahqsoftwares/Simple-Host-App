const Store = require("electron-store");
const store = new Store({
    schema: {
        remember: {
            type: "boolean",
            default: false
        },
        response: {
            type: "string",
            default: "null"
        },
        dark: {
            type: "boolean",
            default: false
        }
    }
});
const {app, BrowserWindow, ipcMain, dialog} = require("electron");
require('electron-reload')(__dirname);
/**
 * Main
 */

app.whenReady().then(async() => {
    app.on("all-window-closed", () => {
        app.close()
    });
    ipcMain.on("sendStore", (event, param) => {
        store.set(param.tag, param.value);
        event.reply("doneWorkStore");
    });
    ipcMain.on("getData", (event, key) => {
        event.reply("getDatabase", store.get(key));
    });
    ipcMain.on("closeApp", () => {
        app.quit()
    });
    ipcMain.on("darkStore", (event) => {
        event.reply("dark_data", store.get("dark"));
    });
    const updater = new BrowserWindow({
        width: 300,
        height: 400,
        minWidth: 300,
        minHeight: 400,
        maxHeight: 400,
        maxWidth: 300,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: false
        }
    });
    updater.loadFile("./src/modules/html/intro.html");
    //updater.loadFile("index.html");
    ipcMain.on("loadMainWindowUpdater", () => {
        updater.loadFile("./src/modules/html/updater.html");
    });
    ipcMain.on("errorFile", (event, data) => {
        dialog.showErrorBox(data.title, data.req);
    });
    ipcMain.on("closeUpdater", () => {
        updater.close()
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
                devTools: false
            }
        });
        main.loadFile("./src/modules/html/main.html");
        
        ipcMain.on("infoBox", (event, data) => {
            dialog.showMessageBox(main, data.opt).then(res => {
                console.log(res);
                event.reply(data.replyId, res);
            });
        });
        ipcMain.on("loadAgain", () => {
            main.loadFile("./src/modules/html/main.html");
        });
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
