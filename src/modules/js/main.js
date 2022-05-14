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
            a_text.classList.add("darktext");
            b_text.classList.add("darktext");
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
        a_text.classList.remove("darktext");
        b_text.classList.remove("darktext");
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
        a_text.classList.add("darktext");
        b_text.classList.add("darktext");
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
        a_text.classList.remove("darktext");
        b_text.classList.remove("darktext");
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

rBot.addEventListener("click", async() => {
    ipc.send("infoBox", {
        opt: {
            type: "warning",
            message: "Are you sure you want to delete your bot?",
            buttons: ["Yes", "No"],
            defaultId: 1,
            title: "Delete Bot",
            detail: "This will parmanently delete your bot",
            noLink: true,
            cancelId: 1
        },
        replyId: "removeFirstBot"
    });
    ipc.on("removeFirstBot", async(event, data) => {
        if (data.response == 1) {
            ipc.send(`loadAgain`);
            return;
        }
        const fetch = require("node-fetch");
        await fetch(`http://dino.daki.cc:4061/action?action=2&bot=1`).then(data => data.json()).then(async(res) => {
            if (res.type == "Error") {
                ipcRenderer.send("errorFile", {
                    title: res.title,
                    req: res.description
                });
            } else {
                ipcRenderer.send("infoBox", {
                    opt: {
                        type: "info",
                        message: "Bot removed from Simple Host!",
                        title: String(res.title),
                        buttons: ["Ok"],
                        noLink: true,
                        detail: String(res.description),
                        icon: "src/modules/images/logo.png"
                    },
                    replyId: "onConfirmEventt"
                });
                ipcRenderer.on("onConfirmEventt", () => {
                    setTimeout(async function() {
                        ipcRenderer.send("loadAgain");
                    }, 20)
                });
            }
    });
    });
});

cBot.addEventListener("click", async() => {
    const fetch = require("node-fetch");
    await fetch(`http://dino.daki.cc:4061/action?action=1&bot=1`).then(data => data.json()).then(async(res) => {
        if (res.type == "Error") {
            ipcRenderer.send("errorFile", {
                title: res.title,
                req: res.description
            });
        } else {
            ipcRenderer.send("infoBox", {
                opt: {
                    type: "info",
                    message: "Latest console log!",
                    title: "Latest log from your bot server",
                    buttons: ["Ok"],
                    noLink: true,
                    detail: String(res.value),
                    icon: "src/modules/images/logo.png"
                },
                replyId: "noEvent"
            });
        }
    });
});

brBot.addEventListener("click", async() => {
ipc.send("infoBox", {
        opt: {
            type: "warning",
            message: "Are you sure you want to delete your bot?",
            buttons: ["Yes", "No"],
            defaultId: 1,
            title: "Delete Bot",
            detail: "This will parmanently delete your bot",
            noLink: true,
            cancelId: 1
        },
        replyId: "removeSecondBot"
    });
    ipc.on("removeSecondBot", async(event, data) => {
        if (data.response == 1) {
            ipc.send(`loadAgain`);
            return;
        }
        const fetch = require("node-fetch");
        await fetch(`http://dino.daki.cc:4061/action?action=2&bot=2`).then(data => data.json()).then(async(res) => {
            if (res.type == "Error") {
                ipcRenderer.send("errorFile", {
                    title: res.title,
                    req: res.description
                });
            } else {
                ipcRenderer.send("infoBox", {
                    opt: {
                        type: "info",
                        message: "Bot removed from Simple Host!",
                        title: String(res.title),
                        buttons: ["Ok"],
                        noLink: true,
                        detail: String(res.description),
                        icon: "src/modules/images/logo.png"
                    },
                    replyId: "onConfirmEvent"
                });
                ipcRenderer.on("onConfirmEvent", () => {
                    setTimeout(async function() {
                        ipcRenderer.send("loadAgain");
                    }, 20)
                });
            }
    });
    });
});

bcBot.addEventListener("click", async() => {
    const fetch = require("node-fetch");
    await fetch(`http://dino.daki.cc:4061/action?action=1&bot=2`).then(data => data.json()).then(async(res) => {
        if (res.type == "Error") {
            ipcRenderer.send("errorFile", {
                title: res.title,
                req: res.description
            });
        } else {
            ipcRenderer.send("infoBox", {
                opt: {
                    type: "info",
                    message: "Latest console log!",
                    title: "Latest log from your bot server",
                    buttons: ["Ok"],
                    noLink: true,
                    detail: String(res.value),
                    icon: "src/modules/images/logo.png"
                },
                replyId: "noEvent"
            });
        }
    });
});

ipc.send("loadedMain");
ipc.on("max", () => {
    dockBTN.innerText = "◱"
});
ipc.on("min", () => {
    dockBTN.innerText = "▢"
});
