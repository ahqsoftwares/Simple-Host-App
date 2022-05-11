const {
    ipcRenderer
} = require("electron");
let response;

confirmbtn.addEventListener("click", async() => {
    const fetch = require("node-fetch");
    console.log(idbox.value.length);
    if (idbox.value.length !== 17) {
        ipcRenderer.send("errorFile", {
            title: "Login Error!",
            req: "Login ID Must be of 17 digits"
        });
    } else {
        fetch(`http://dino-gg.daki.cc:4037/login?code=${idbox.value}`).then(data => data.json()).then(data => {response = data}).catch(e => console.log(e)).then(async() => {
            if (response.type == "Error") {
                ipcRenderer.send("errorFile", {
                    title: response.title,
                    req: response.description
                });
            } else if (response.type == "Logged In!") {
                ipcRenderer.send("sendStore", ({
                    tag: "remember",
                    value: checkbox.checked
                }));
                ipcRenderer.send("sendStore", ({
                    tag: "response",
                    value: String(checkbox.checked).replace("true", idbox.value).replace("false", "null")
                }));
                ipcRenderer.send("loadWindow");
            }
        });
    }
});