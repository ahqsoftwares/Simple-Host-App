const {ipcRenderer} = require("electron");

const ipc = ipcRenderer;

/**
 * Clock App
 * @param {} click
 */
closeBTN.addEventListener("click", () => {
    ipc.send("closeApp");
});

/**
 * Minimise App
 * @param {} click
 */
minimiseBTN.addEventListener("click", () => {
    ipc.send("minimiseApp");
});

/**
 * Dock App
 * @param {} click
 */
dockBTN.addEventListener("click", () => {
    ipc.send("dockApp");
});

ipc.send("loadedMain");
ipc.on("max", () => {
    dockBTN.innerText = "◱"
});
ipc.on("min", () => {
    dockBTN.innerText = "▢"
});