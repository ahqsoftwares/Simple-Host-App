const {ipcRenderer} = require("electron");
const ipc = ipcRenderer;


ipc.send("darkStore");
ipc.on("dark_data", (event, value) => {
    if (value === true) {
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
        ipc.send("sendStore", {
            tag: "dark",
            value: true
        });
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
        ipc.send("sendStore", {
            tag: "dark",
            value: false
        });
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

rBot.addEventListener("click", () => {
    const fetch = require("node-fetch");
    ipcRenderer.send("errorFile", {
        title: "Coming Soon!",
        req: "Function Coming Soon in next release!"
    });
});

cBot.addEventListener("click", () => {
    ipcRenderer.send("errorFile", {
        title: "Coming Soon!",
        req: "Function Coming Soon in next release!"
    });
});

brBot.addEventListener("click", () => {
    const fetch = require("node-fetch");
    ipcRenderer.send("errorFile", {
        title: "Coming Soon!",
        req: "Function Coming Soon in next release!"
    });
});

bcBot.addEventListener("click", () => {
    ipcRenderer.send("errorFile", {
        title: "Coming Soon!",
        req: "Function Coming Soon in next release!"
    });
});

ipc.send("loadedMain");
ipc.on("max", () => {
    dockBTN.innerText = "◱"
});
ipc.on("min", () => {
    dockBTN.innerText = "▢"
});