let step = "...";
let status = -1;
let add = 0;

module.exports = {
    /**
     * Start Code
     */
    start: async() => {
        
    },
    set: function(data) {
        step = data[`1`],
        status = data[`2`],
        add = data[`3`]
    },
    /**
     * Get Status From Updater
    */
    getStatus: async function() {
        return {
            "0": String(step), 
            "1": String((status + 1)),
            "3": String(add)
        }
    }
}