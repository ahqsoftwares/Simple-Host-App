const {getStatus, start} = require("../../env/update");
ver.innerHTML = `Version: ${require("../../../package.json").version.replace("v", "")}`
start()

    setInterval(async function() {
        await getStatus().then(data => {
            update.innerHTML = `${data[`0`]}`;
            if (data[`1`] == "0" && data[`3`] == "0") {
                bar.removeAttribute(`value`);
            } else {
                bar.value = `${data[`1`]}`;
            }
        });
    }, 250)