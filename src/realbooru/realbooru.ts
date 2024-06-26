import axios from "axios";
import { api_pid, total_api_pages } from "../base_functions/base_function";

export const real_search = async ({ search_tag = "", block_tags = [] }) => {
  let pid = await api_pid("https://realbooru.com", search_tag);
  if (pid == 0 || search_tag.length === 0) return { status: 400 };
  let pages = total_api_pages(pid);
  let random = Math.floor(Math.random() * pages);
  let { data } = await axios(
    `https://realbooru.com/index.php?page=dapi&s=post&tags=${search_tag}&pid=${random}&q=index&json=1`
  );
  let ray = [
    ...data.map(
      (obj: { directory: any; image: any; hash: any }) =>
        `https://realbooru.com/images/${obj.directory}/${obj.hash}.${
          obj.image.split(".")[1]
        }`
    ),
  ];
  if (block_tags.length != 0) {
    let urlSet = new Set();

    data.forEach(
      (obj: {
        tags: string | any[];
        directory: any;
        image: any;
        hash: any;
      }) => {
        if (block_tags.some((element) => obj.tags.includes(element))) {
          urlSet.add(
            `https://realbooru.com/images/${obj.directory}/${obj.hash}.${
              obj.image.split(".")[1]
            }`
          );
        }
      }
    );
    const clean_array = ray.filter((url) => !urlSet.has(url));
    return clean_array;
  }
  return ray;
};

export const real_random = async (
  { gay_block }: { gay_block?: boolean } = { gay_block: false }
) => {
  let pages = total_api_pages(168000);
  let random = Math.floor(Math.random() * pages);
  let { data } = await axios(
    `https://realbooru.com/index.php?page=dapi&s=post&pid=${random}&q=index&json=1`
  );
  let ray = [
    ...data.map(
      (obj: { directory: any; image: any; hash: any }) =>
        `https://realbooru.com/images/${obj.directory}/${obj.hash}.${
          obj.image.split(".")[1]
        }`
    ),
  ];
  if (gay_block == true) {
    let urlSet = new Set();
    let block = [
      "shemale",
      "gay",
      "trap",
      "trans_female",
      "transgender",
      "fake_breasts",
      "male_only",
      "dick",
    ];

    data.forEach(
      (obj: {
        tags: string | any[];
        directory: any;
        image: any;
        hash: any;
      }) => {
        if (block.some((element) => obj.tags.includes(element))) {
          urlSet.add(
            `https://realbooru.com/images/${obj.directory}/${obj.hash}.${
              obj.image.split(".")[1]
            }`
          );
        }
      }
    );
    ray = ray.filter((url) => !urlSet.has(url));
    return ray;
  }
  return ray;
};
