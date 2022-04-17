const {get, set} = require('./update');
const fetch = require("node-fetch");
const os = require('os');
const {ipcRenderer} = require("electron");
const downloader = require("filedownloader");
const AdmZip = require("adm-zip");
const fs = require("fs");

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
            if (json['assets'][i]['name'] == `Simple-Host-Desktop-${(json[`tag_name`]).replace("v", "")}${platformsNames[os.platform]}.zip`) zip = json['assets'][i];
        }
        const dl = new downloader({
            url: zip['browser_download_url'],
            saveto: `C:${process.env.HOMEPATH}`
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
            var ezip = new AdmZip(process.env.HOMEPATH + "\\" + zip[`name`]);
            ezip.getEntries().forEach(async(entry) => {
                try {
                    ezip.extractEntryTo(entry, process.cwd(), true, true)
                } catch (e) {
                    let skipped = 0;
                    skipped += 1;
                    set({
                        "1": `Skipped ${skipped} files on install...`,
                        "2": -1,
                        "3": 0
                    });
                }
            });
            set({
                "1": `Restart App`,
                "2": -1,
                "3": 0
            });
            fs.unlink(process.env.HOMEPATH + "\\" + zip[`name`], function(err) {
                if (err) console.log(err);
                ipcRenderer.send("closeApp");
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

