const {app, BrowserWindow, ipcMain} = require("electron");
/**
 * Updater
 */
async function update() {
const { autoUpdater } = require("electron");
const {set} = require('./env/update');
let step = "Initialising...";
let status = -1;
let add = 0;


set({
    "1": step,
    "2": status,
    "3": add
});

autoUpdater.setFeedURL({
    url: "https://github.com/ahqostwares/Simple-Host-App/releases/latest",
    serverType: "json"
});
autoUpdater.checkForUpdates()
autoUpdater.on("checking-for-update", () => {
    step = "Checking For Updates..."
    set({
        "1": step,
        "2": status,
        "3": add
    });
});
autoUpdater.on("update-available", () => {
    step = `Update Found!`;
    add = 1;
    set({
        "1": step,
        "2": status,
        "3": add
    });
});
autoUpdater.on("update-not-available", () => {
    step = "Launching App!";
    set({
        "1": step,
        "2": status,
        "3": add
    });
});
autoUpdater.on("download-progress", (p) => {
    step = "Downloading...";
    add = 1;
    status = (Math.floor(p.percent)) - 1
    set({
        "1": step,
        "2": status,
        "3": add
    });
});
autoUpdater.on("update-downloaded", () => {
    step = "Starting Install Soon...."
    status = -1;
    add = 0;
    set({
        "1": step,
        "2": status,
        "3": add
    });
    setTimeout(function() {
    autoUpdater.quitAndInstall()
    }, 3000);
});

autoUpdater.on("error", () => {
    step = "Error!"
    status = -1;
    add = 1;
    set({
        "1": step,
        "2": status,
        "3": add
    });
});
}
/**
 * Main
 */

app.whenReady().then(async() => {
    update()
    ipcMain.on("closeApp", () => {
        app.quit()
    });
    // ipcMain.on("dockApp", () => {

    // });
    // ipcMain.on("minimiseApp", () => {

    // });
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

});