# require-id-hash

## Introduction

This library aims to split up the files you require using node `require`. By intercepting the require call on hashed files (with the extention provided), later parsing and creating a new file based on the hash, one is able to split files into smaller chunks. 

## Movivation

Maintaining a large collection of files can get messy and this library tries to make it easier for you to have all your files stored in one place, like `svg` files. By using the library, one could write a lot of icon classes which would get resolved to one svg file. In the future, we are going to integrate this in bundlers ( webpack, rollup), to make chunkSplitting easier than before. This could save a lot of space on the client side if done properly! For instance, by integrating this in webpack with webworkers or service workers, one could cache files that changes icons based on the file that is required. If you as a developer decides to have dynamic icons that change from time to time, we can swap the cache content based on one file with a hash instead of tons of icons that wouldn't get used again.

The library itself writes physical files (not that performant), but we might support in-memory requires later on natively. In the browser we are planning to integrate splitting out of the box, so that you as a developer can write dynamic or static imports/requires using this library. This will reduce your total filesize!

## Installation

```sh
npm install --save require-id-hash
yarn add require-id-hash
```

## Example

`myFile.svg`
```svg
<svg>
    <symbol viewBox="0 0 9 13" id="ico_backarrow_purple">
        <style>.st0{fill:#990ae3}</style>
        <path d="M2.3 9.5l2.9 2.9c.8.8 2 .8 2.8 0 .8-.8.8-2 0-2.8L5.1 6.7 8 3.8c.8-.8.8-2 0-2.8-.8-.7-2-.7-2.7 0l-3 3L1 5.3c-.8.8-.8 2.1 0 2.8l1.3 1.4z" class="st0"/>
    </symbol>
</svg>
```
`index.js`
```js
module.exports = {
    someMethod: () => console.log("wow!!")
}
```
```js

const svg = require('./myFile.svg#ico_backarrow_purple');
// returns the svg symbol #ico_backarrow_purple

const jsFile = require('./index.js#someMethod');
jsFile() // wow!!
```
## Contributing

This project is open to any contributions, minor, major, docs, any type of contribution is welcome! It is licensed under [MIT](https://opensource.org/licenses/MIT), and you are free to use it however you'd like!


## Future

In the future we are bringing this to bundlers and we will support other extensions. Please submit any feedback you might have!