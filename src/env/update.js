/*
Driver Default Data
*/
let step = "undefined";
let status = -1;
let add = 0;

/**
 * Driver Exports
 */
module.exports = {
    /**
     * Start Code
     */
    start: async() => {
        (require("./back"))
    },
    /**
     * Set data in driver
     * @param {*} data 
     */
    set: function(data) {
        step = data[`1`],
        status = data[`2`],
        add = data[`3`]
    },
    /**
     * Get Data From Background Process
    */
    getStatus: async function() {
        return {
            "0": String(step), 
            "1": String((status + 1)),
            "3": String(add)
        }
    }
}