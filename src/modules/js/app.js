const {
    ipcRenderer
} = require("electron");
const fetch = require("node-fetch");
let response;

confirmbtn.addEventListener("click", () => {
    console.log(idbox.value.length);
    if (idbox.value.length < 18) {
        ipcRenderer.send("errorFile", {
            title: "Login Error!",
            req: "Login ID Must be of 18 digits"
        });
    } else if (idbox.value.length > 18) {
        ipcRenderer.send("errorFile", {
            title: "Login Error!",
            req: "Login ID Must be of 18 digits"
        });
    } else {
        fetch(`https://simplehost.com:5652/login?code=${idbox.value}`).then(data => data.json()).then(data => {response = data}).catch(e => console.log(e)).then(async() => {
            if (response.type == "Error") {
                ipcRenderer.send("errorFile", {
                    title: response.title,
                    req: response.description
                });
            } else if (response.type == "Logged In!") {

            }
        });
    }
});