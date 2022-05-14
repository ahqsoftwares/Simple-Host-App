
/*
Require Modules
*/
const {set} = require('./update');
const fetch = require("node-fetch");
const os = require('os');
const {ipcRenderer} = require("electron");
const downloader = require("filedownloader");
const AdmZip = require("adm-zip");
const fs = require("fs");
const path = require("path");

/*
Cross Platform Modules
*/

const platforms = {
    WINDOWS: '-win',
    MAC: '-mac',
    LINUX: ''
};
  
const platformsNames = {
    win32: platforms.WINDOWS,
    darwin: platforms.MAC,
    linux: platforms.LINUX
};

/*
Default Step
*/

let name = "Loading Update Check!";
let status = -1;
let add = 0;

set({
    "1": name,
    "2": status,
    "3": add
});
let json = "";

/* 
Main code
*/

fetch(`https://api.github.com/repos/ahqsoftwares/Simple-Host-App/releases/latest`).then(res => res.json()).then(data => {json = data}).catch(e => console.log(e)).then(async() => {
    let version = json[`tag_name`].split(".");
    let pkgver = require("../../package.json").version.split(".");

    if (`${version[0]}.${version[1]}${version[2]}` > `${pkgver[0]}.${pkgver[1]}${pkgver[2]}`) {
        set({
            "1": `${("type").replace("type", (String(version[0] > pkgver[0]).replace("true", "Major").replace("false", (String(version[1] > pkgver[1]).replace("true", "Minor").replace("false", "Patch")))))} Update Available`,
            "2": status,
            "3": add
        });
        let zip;
        for (i = 0; i < json['assets'].length; i++) {
            if (json['assets'][i]['name'] == `Simple-Host-Desktop-${(json[`tag_name`]).replace("v", "")}${platformsNames[os.platform]}.zip`) zip = json['assets'][i];
        }
        const dl = new downloader({
            url: zip['browser_download_url'],
            saveto: `${process.cwd()}`
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
            setTimeout(async function() {
                set({
                    "1": `Installing...`,
                    "2": -1,
                    "3": 0
                });
            }, 2000)
            let skipped = 0;
            var ezip = new AdmZip(path.join(process.cwd(), zip[`name`]));
            ezip.getEntries().forEach(async(entry) => {
                try {
                    ezip.extractEntryTo(entry, process.cwd(), true, true)
                } catch (e) {
                    let temp = skipped + 1;
                    skipped = temp + 1;
                    set({
                        "1": `Skipped ${skipped} files on install...`,
                        "2": -1,
                        "3": 0
                    });
                }
            });
            setTimeout(async function(){
                set({
                    "1": `Finalising, Open App after install!`,
                    "2": -1,
                    "3": 0
                });
            }, 5000);
            setTimeout(async function(){
                fs.unlink(path.join(process.cwd(), zip[`name`]), function(err) {
                    if (err) console.log(err);
                    ipcRenderer.send("closeApp");
                });
            }, 2000);
        });
    } else {
        set({
            "1": "Starting App!",
            "2": -1,
            "3": 0
        });
        await fetch(`http://dino.daki.cc:4061/logged`).then(data => data.json()).then(content => {
            if (content.status == 1) {
                setTimeout(async function() {
                    ipcRenderer.send(`loadWindow`);
                    return
                }, 3000);
            }
        });
        setTimeout(function() {
            ipcRenderer.send("getData", "response");
            ipcRenderer.on("getDatabase", async(event, data) => {
            if (data !== "null") {
                fetch(`http://dino.daki.cc:4061/login?code=${data}`).then(data => data.json()).then(data => {response = data}).catch(e => console.log(e)).then(async() => {
                    if (response.type == "Logged In!") {
                        ipcRenderer.send("sendStore", ({
                                tag: "remember",
                                value: true
                            }));
                            ipcRenderer.send("loadWindow");
                        } else {
                            set({
                                "1": "Please log in!",
                                "2": -1,
                                "3": 0
                            });
                            setTimeout(async function() {
                                ipcRenderer.send("startMainApp");
                            }, 3000);
                        }
                    });
                } else {
                    ipcRenderer.send("startMainApp");
                }
            });
        }, 3000);
    }
});

/*
Ending...
*/
