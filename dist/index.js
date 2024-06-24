"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  r34_random: () => r34_random,
  r34_search: () => r34_search,
  xbooru_search: () => xbooru_search
});
module.exports = __toCommonJS(src_exports);

// src/rule34/rule34.ts
var import_axios2 = __toESM(require("axios"));

// src/base_functions/base_function.ts
var import_cheerio = require("cheerio");
var import_axios = require("axios");
async function api_pid(base_URL, tags) {
  const customAxios = (0, import_axios.create)({
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.2535.92"
    }
  });
  let { data } = await customAxios(
    `${base_URL}/index.php?page=post&s=list&tags=${tags}+&pid=0`
  );
  const $ = (0, import_cheerio.load)(data);
  let last = $(".pagination a").map((i, el) => $(el).attr("href")).get();
  if (last.length != 0) {
    let rem = Number(last[last.length - 1].split("=")[4]);
    if (rem > 168e3) rem = 168e3;
    return rem;
  }
  return 0;
}
function total_api_pages(pid) {
  let totalImages = pid;
  let imagesPerPage = 100;
  let numberOfPages = Math.ceil(totalImages / imagesPerPage);
  return numberOfPages;
}

// src/rule34/rule34.ts
async function r34_random({ gay_block }) {
  let pages = total_api_pages(168e3);
  let random = Math.floor(Math.random() * pages);
  let { data } = await (0, import_axios2.default)(
    `https://api.rule34.xxx/index.php?page=dapi&s=post&pid=${random}&q=index&json=1`
  );
  let ray = [...data.map((obj) => obj.file_url)];
  if (gay_block == true) {
    let urlSet = /* @__PURE__ */ new Set();
    let block = [
      "male",
      "gay",
      "trap",
      "yaoi",
      "balls",
      "dick",
      "boy",
      "trap",
      "furry",
      "bovid",
      "demon",
      "dog",
      "penis"
    ];
    data.forEach((obj) => {
      if (block.some((element) => obj.tags.includes(element))) {
        urlSet.add(obj.file_url);
      }
    });
    ray = ray.filter((url) => !urlSet.has(url));
    return ray;
  } else {
    return ray;
  }
}
async function r34_search({ search_tag = "", block_tags = [] }) {
  const pid = await api_pid("https://rule34.xxx", search_tag);
  if (pid == 0 || search_tag.length === 0) return { status: 400 };
  let pages = total_api_pages(pid);
  if (pages != 0) {
    let random = Math.floor(Math.random() * pages);
    let { data } = await (0, import_axios2.default)(
      `https://api.rule34.xxx/index.php?page=dapi&s=post&tags=${search_tag}&pid=${random}&q=index&json=1`
    );
    let ray = [...data.map((obj) => obj.file_url)];
    if (block_tags.length != 0) {
      let urlSet = /* @__PURE__ */ new Set();
      data.forEach((obj) => {
        if (block_tags.some((element) => obj.tags.includes(element))) {
          urlSet.add(obj.file_url);
        }
      });
      const clean_array = ray.filter((url) => !urlSet.has(url));
      return clean_array;
    } else {
      return ray;
    }
  }
}

// src/xbooru/xbooru.ts
var import_axios3 = __toESM(require("axios"));
var xbooru_search = async ({ search_tag = "", block_tags = [] }) => {
  let pid = await api_pid("https://xbooru.com", search_tag);
  if (pid == 0 || search_tag.length === 0) return { status: 400 };
  let pages = total_api_pages(pid);
  let random = Math.floor(Math.random() * pages);
  let { data } = await (0, import_axios3.default)(
    `https://xbooru.com/index.php?page=dapi&s=post&tags=${search_tag}&pid=${random}&q=index&json=1`
  );
  let ray = [
    ...data.map(
      (obj) => `https://img.xbooru.com/images/${obj.directory}/${obj.image}`
    )
  ];
  if (block_tags.length != 0) {
    let urlSet = /* @__PURE__ */ new Set();
    data.forEach(
      (obj) => {
        if (block_tags.some((element) => obj.tags.includes(element))) {
          urlSet.add(
            `https://img.xbooru.com/images/${obj.directory}/${obj.image}`
          );
        }
      }
    );
    const clean_array = ray.filter((url) => !urlSet.has(url));
    return clean_array;
  }
  return ray;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  r34_random,
  r34_search,
  xbooru_search
});
