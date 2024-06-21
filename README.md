<div align="center">
<a href="https://github.com/RaySenpai69/r34-module"><img src="https://i.ibb.co/yX2kq7y/header2.png" alt="r34-module" border="0"></a>

# **r34-module</er></a></h1>**

[![NPM](https://img.shields.io/badge/Available%20On-NPM-lightgrey.svg?logo=npm&logoColor=339933&labelColor=white&style=flat-square)](https://www.npmjs.com/package/r34-module)

> Fetch images,videos,gifs from [Rule34](https://rule34.xxx/) 
</div><br/>
<br/>

---

## Installation

```
yarn add r34-module
```
```
npm install r34-module
```
```
pnpm install r34-module
```

## Note

- Make Sure To use tags available in rule34 is more than one page
-  `block_tags` is optional fetature
-  This module supports `cjs, mjs, ts`

## Examples

```ts
import { r34_random } from "r34-module"

;(async () => {
    // Make gay_block true if you want to filter gay,male,furry from array
    // ps No hate from gay people pls
    let r34 = await r34_random({ gay_block : false })
    console.log(r34)
})()
/**
 * It should response like this
 * [
  'https://api-cdn.rule34.xxx/images/2882/fb802d8ecf52d334eb0055199ab052f6.jpeg',
  'https://api-cdn.rule34.xxx/images/2882/0c273249a4a2d0ebfa51366cad8b2d31.jpeg',
  'https://api-cdn.rule34.xxx/images/2882/b1b3b2e1fe71d576457a735e31d64092.jpeg',
  'https://api-cdn.rule34.xxx/images/2882/d222e3b42e513bddd2031ec15d6d77b6.jpeg',
  ...
  ]
 */
```
```ts
import { r34_search } from "r34-module"

;(async () => {
    // block_tags is optional feature
    let r34 = await r34_search({ search_tag : "hatsune_miku", block_tags: ["male", "trap"] })
    console.log(r34)
})()

/**
 * Here is a example Response
 * [
  'https://api-cdn.rule34.xxx/images/2329/d78f9584656cbaeb56e5b08928c89a09.png',
  'https://api-cdn.rule34.xxx/images/2329/b9bbeefa0f3a4e07adbe7fe8d72a0183.png',
  'https://api-cdn.rule34.xxx/images/2329/54abb08fcd16161549c92f67daa1c3a3.png',
  'https://api-cdn.rule34.xxx/images/2329/c3ccf85503044b6267a17829eb90a043.png',
  'https://api-cdn.rule34.xxx/images/2329/20f54d4dce75d60fadbb07aa001ccc99.png',
  'https://api-cdn.rule34.xxx/images/2329/ebfeb4689e4cccffff5a34b44715f827.png',
  'https://api-cdn.rule34.xxx/images/2329/84298bb20c05282762d1e1f01c3365d6.png',
  'https://api-cdn.rule34.xxx/images/2329/6aed8e0f1663a4dac3ca30532e9e0c29.png',
  'https://api-cdn.rule34.xxx/images/1305/1a966efa123d4ddedb4745d5460fb32d.png',
  'https://api-cdn.rule34.xxx/images/281/9e1c2d77d3dcea3aad822cff79f4720c.jpeg',
  'https://api-cdn.rule34.xxx/images/741/d8dcf52748a519beef3c92e0665c3c1a.png',
  'https://api-cdn.rule34.xxx/images/2685/374654702538437420731957e79ee435.png',
  ...
  ]
*/
```
