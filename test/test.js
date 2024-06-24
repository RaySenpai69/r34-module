const { safe_search } = require("r34-module")

async function r() {
    console.log(( await safe_search({search_tag : "nakano_miku"})))
} r()