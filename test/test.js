const { real_random } = require("r34-module")

async function r() {
    console.log(( await real_random()).length)
} r()