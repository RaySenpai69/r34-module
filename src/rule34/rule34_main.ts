import axios from "axios";
import { load } from "cheerio";

export async function r34_pid(tags: string) {
  const customAxios = axios.create({
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.2535.92",
    },
  });
  const response = await customAxios.get(
    `https://rule34.xxx/index.php?page=post&s=list&tags=${tags}+&pid=0`
  );
  const $ = load(response.data);
  const last = $(".pagination a")
    .map((i, el) => $(el).attr("href"))
    .get();
  if (last.length != 0) {
    let rem = Number(last[last.length - 1].split("=")[4]);
    if (rem > 168000) rem = 168000;
    return rem;
  }
  return 0;
}

export function total_api_pages(pid: number) {
  const totalImages = pid;
  const imagesPerPage = 100;
  const numberOfPages = Math.ceil(totalImages / imagesPerPage);
  return numberOfPages;
}


