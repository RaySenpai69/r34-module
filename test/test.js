const { r34_search, r34_random } = require("r34-module")

async function r() {
    console.log(( await r34_search({ search_tag : "hatsune_miku", block_tags: ["male", "trap"] })))
} r()