import { load } from "cheerio";
import { create } from "axios";

export async function api_pid(base_URL: string, tags: string) {
  const customAxios = create({
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.2535.92",
    },
  });
  let { data } = await customAxios(
    `${base_URL}/index.php?page=post&s=list&tags=${tags}+&pid=0`
  );
  const $ = load(data);
  let last = $(".pagination a")
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
  let totalImages = pid;
  let imagesPerPage = 100;
  let numberOfPages = Math.ceil(totalImages / imagesPerPage);
  return numberOfPages;
}
