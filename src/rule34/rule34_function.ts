import axios from "axios";
import { total_api_pages, r34_pid } from "./rule34_main";


export async function r34_random( {gay_block }: { gay_block: boolean } ) {
  let pages = total_api_pages(168000);
  let random = Math.floor(Math.random() * pages);
  let { data } = await axios(
    `https://api.rule34.xxx/index.php?page=dapi&s=post&pid=${random}&q=index&json=1`
  );
  let ray = [...data.map((obj: { file_url: any }) => obj.file_url)];
  if (gay_block == true) {
    let urlSet = new Set();
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

    data.forEach((obj: { tags: string | any[]; file_url: any }) => {
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
export async function r34_search({ search_tag = "", block_tags = [] }) {
  const pid = await r34_pid(search_tag);
  if (pid == 0  || search_tag.length === 0) return { status: 400 };
  
  const pages = total_api_pages(pid);
  if (pages != 0) {
    const random = Math.floor(Math.random() * pages);
    const { data } = await axios(
      `https://api.rule34.xxx/index.php?page=dapi&s=post&tags=${search_tag}&pid=${random}&q=index&json=1`
    );
    let ray = [...data.map((obj: { file_url: any }) => obj.file_url)];
    if (block_tags.length != 0) {
      let urlSet = new Set();

      data.forEach((obj: { tags: string | any[]; file_url: any }) => {
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
