const {set} = require('./update');
const fetch = require("node-fetch");
const {ipcRenderer} = require("electron");
const downloader = require("filedownloader");

let name = "Loading Update Check!";
let status = -1;
let add = 0;

set({
    "1": name,
    "2": status,
    "3": add
});
let json = "";

fetch(`https://api.github.com/repos/ahqsoftwares/Simple-Host-App/releases/latest`).then(res => res.json()).then(data => {json = data}).catch(e => console.log(e)).then(async() => {
    if (json[`tag_name`] !== require("../../package.json").version) {
        set({
            "1": "Update Available",
            "2": status,
            "3": add
        });
    } else {
        set({
            "1": "Starting App!",
            "2": 101,
            "3": 0
        });
        setInterval(function() {
            ipcRenderer.send("startMainApp");
        }, 3000);
    }
});

