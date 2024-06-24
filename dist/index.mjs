// src/rule34/rule34.ts
import axios from "axios";

// src/base_functions/base_function.ts
import { load } from "cheerio";
import { create } from "axios";
async function api_pid(base_URL, tags) {
  const customAxios = create({
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.2535.92"
    }
  });
  let { data } = await customAxios(
    `${base_URL}/index.php?page=post&s=list&tags=${tags}+&pid=0`
  );
  const $ = load(data);
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
  let { data } = await axios(
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
    let { data } = await axios(
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
import axios2 from "axios";
var xbooru_search = async ({ search_tag = "", block_tags = [] }) => {
  let pid = await api_pid("https://xbooru.com", search_tag);
  if (pid == 0 || search_tag.length === 0) return { status: 400 };
  let pages = total_api_pages(pid);
  let random = Math.floor(Math.random() * pages);
  let { data } = await axios2(
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
export {
  r34_random,
  r34_search,
  xbooru_search
};
