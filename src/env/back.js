const {get, set} = require('./update');
const fetch = require("node-fetch");
const os = require('os');
const {app, ipcRenderer} = require("electron");
const downloader = require("filedownloader");
const { execFile } = require('child_process');


const platforms = {
    WINDOWS: '.exe',
    MAC: '.dmg',
    LINUX: '.AppImage'
  };
  
  const platformsNames = {
    win32: platforms.WINDOWS,
    darwin: platforms.MAC,
    linux: platforms.LINUX
  };

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
    let version = json[`tag_name`].split(".");
    let pkgver = require("../../package.json").version.split(".");

    if (version.join(".") !== pkgver.join(".")) {
        set({
            "1": `${("type").replace("type", (String(version[0] > pkgver[0]).replace("true", "Major").replace("false", (String(version[1] > pkgver[1]).replace("true", "Minor").replace("false", "Patch")))))} Update Available`,
            "2": status,
            "3": add
        });
        let zip;
        for (i = 0; i < json['assets'].length; i++) {
            if (json['assets'][i]['name'].endsWith(platformsNames[os.platform()])) zip = json['assets'][i];
        }
        const dl = new downloader({
            url: zip['browser_download_url'],
            saveto: __dirname
        });

        dl.on("start", () => {
            set({
                "1": `Downloading...`,
                "2": status,
                "3": add
            });
        });

        dl.on("progress", (a) => {
            set({
                "1": `Downloading...`,
                "2": a.progress,
                "3": 1
            });
        });


        dl.on("end", async function(){
            set({
                "1": `Installing...`,
                "2": -1,
                "3": 0
            });
            ipcRenderer.send("updateApp");
            const child = require('child_process').execFileSync;
            child(`src\\env\\${zip[`name`]}`).then(data => {
                console.log(data);
            }).catch(e => {
                console.log(e);
            });
        });
    } else {
        set({
            "1": "Starting App!",
            "2": -1,
            "3": 0
        });
        setInterval(function() {
            ipcRenderer.send("startMainApp");
        }, 3000);
    }
});

