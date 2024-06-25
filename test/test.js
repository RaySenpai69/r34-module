const { xbooru_random, hypno_random, r34_random } = require("r34-module")

async function r() {
    console.log(( await r34_random({gay_block: true})))
} r()