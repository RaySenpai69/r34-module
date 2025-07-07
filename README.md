<div align="center">
<a href="https://github.com/RaySenpai69/r34-module"><img src="https://i.ibb.co/0B5sMcb/download.png" alt="r34-module" border="0"></a>

# **r34-module</er></a></h1>**

[![NPM](https://img.shields.io/badge/Available%20On-NPM-lightgrey.svg?logo=npm&logoColor=339933&labelColor=white&style=flat-square)](https://www.npmjs.com/package/r34-module)

> Fetch images,videos,gifs from [Rule34](https://rule34.xxx/), [xbooru](https://xbooru.com) many more
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

- Make Sure To use tags available in your desire site is more than one page
-  `block_tags` is optional fetature
-  This module supports `cjs, mjs, ts`
-  `gay_block` is optional feature

## All Function(s)
Function | Description
---|---
r34_search | Search Images from [Rule34](https://rule34.xxx/) only using tag
r34_random | Random image from [Rule34](https://rule34.xxx/) 
xbooru_search | Search Images from [Xbooru](https://xbooru.com) only using tag
xbooru_random | Random image from [Xbooru](https://xbooru.com) 
hypno_search | Search Images from [Hypnohub](https://hypnohub.net/)  only using tag
hypno_random | Random image from [Hypnohub](https://hypnohub.net/) 
safe_search | Search Images from [Safebooru](https://safebooru.org/) only using tag
safe_random | Random image from [Safebooru](https://safebooru.org/)
real_search | Search Images from [Realbooru](https://realbooru.com//) only using tag
real_random | Random image from [Realbooru](https://realbooru.com/)


## Update 🚨
### Realbooru official API is currently shutdown please wait some week/months otherwise I will update it to directly fetch from webpage

## Examples

```ts
import { r34_random } from "r34-module"

;(async () => {
    let r34 = await r34_random()
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
import { r34_random } from "r34-module"

;(async () => {
    // Make gay_block true if you want to filter gay,male,furry from array
    // ps No hate from gay people pls
    let r34 = await r34_random({gay_block: true})
    console.log(r34)
})()
/**
 * It should response like this
 * [
  'https://api-cdn.rule34.xxx/images/2378/d408ad0f8719c4e20b9935d0c5f74615.jpeg',
  'https://api-cdn.rule34.xxx/images/2378/80b2cdb790deb05799ffc21165c6ee13.jpeg',
  'https://api-cdn.rule34.xxx/images/2378/95d79bb38d4508642e4186080f2f54b3.png',
  'https://api-cdn.rule34.xxx/images/2378/7759e328bbb9a158dd1b54f65ce55a77.jpeg',
  'https://api-cdn.rule34.xxx/images/2378/ffc00aa8eaedf68e88642d3e21391a93.jpeg',
  'https://api-cdn.rule34.xxx/images/2378/f72ae99dc8ccd123c673e3bbbca57c5f.jpeg',
  ...
]
 */
```

```ts
import { r34_search } from "r34-module"

;(async () => {
    // block_tags is optional feature
    let r34 = await r34_search({search_tags:["anime", "female",], block_tags:["animal", "pennis","dick"]})
    console.log(r34)
})()

/**
 * Here is a example Response
 * [
  'https://api-cdn.rule34.xxx/images/2597/df993b42327464ead2cd09ae736e957a.png',
  'https://api-cdn.rule34.xxx/images/3359/6a52d5989e2334a4dae5902efce3495a.png',
  'https://api-cdn.rule34.xxx/images/1717/5c2a89c768b2db8a0b34c3a01aabb952.png',
  'https://api-cdn.rule34.xxx/images/1717/1800155c57962001054805a40c328fd7.png',
  'https://api-cdn.rule34.xxx/images/1717/e0d026c43187cae0f7bce536ee936688.png',
  'https://api-cdn.rule34.xxx/images/1717/8bbb28d05e6ffc8e0c93d7bf5402228f.png',
  'https://api-cdn.rule34.xxx/images/1717/f1e83b1674be40aeb5b95130f4237507.png',
  'https://api-cdn.rule34.xxx/images/1717/d5f0b324a1eaf5bcf9eca849f0546ad8.png',
  'https://api-cdn.rule34.xxx/images/1717/7f5f56a71b7caa94017697de5bc0cc49.png',
  'https://api-cdn.rule34.xxx/images/1717/18f206bb86da4c8bd181bea75cec8929.png',
  ...
  ]
*/
```