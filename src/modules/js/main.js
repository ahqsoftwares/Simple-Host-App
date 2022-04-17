const {ipcRenderer} = require("electron");
console.log(lightdark.classList);
const ipc = ipcRenderer;

/**
 * Dark Mode
 */
mode.addEventListener("click", () => {
    if (mode.innerHTML != "☀") {
        mode.innerHTML = "☀";
        header.classList.remove("darktext");
        header.classList.add("lighttext");
        lightdark.classList.add("dark");
        mainnav.classList.add("navdark");
        const data = document.getElementsByClassName("button");
        for(i = 0; i < data.length; i++){
            data[i].classList.add(`darkbtn`);
        }
    } else {
        header.classList.add("darktext");
        header.classList.remove("lighttext");
        lightdark.classList.remove("dark");
        mainnav.classList.remove("navdark");
        const data = document.getElementsByClassName("button");
        for(i = 0; i < data.length; i++){
            data[i].classList.remove(`darkbtn`);
        }
        mode.innerHTML = "🌒";
    }
});
/**
 * Close App
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