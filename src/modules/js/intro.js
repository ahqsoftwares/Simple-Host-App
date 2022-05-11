const {ipcRenderer} = require("electron");
/*const os = require("os");
document.getElementById("name").innerHTML = `Simple Host App for ` + os.type().replace("Windows_NT", `Windows ${os.release().split(".")[0]}`).replace("Linux", `Linux ${os.release()}`).replace("Darwin", "MacOs X");*/

setTimeout(async function() {
         ipcRenderer.send(`loadMainWindowUpdater`);
},  6000);