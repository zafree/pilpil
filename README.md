# Pilpil - Progressive Image Loading

Pilpil is a tiny, pure javascript libraby for Progressive Image Loading with a blur effect to reduce the page load time; as seen on [Medium](https://medium.com/designing-medium/image-zoom-on-medium-24d146fc0c20).

### Demo
https://zafree.github.io/pilpil

### How

1. Link files to your site or application.

  ```html
  <link rel="stylesheet" href="css/pilpil.css">
  <script src="js/pilpil.js"></script>
  ```

2. Set markup 

  ```html
  <div class="aspectRatioPlaceholder">
    <div class="aspectRatioPlaceholder-fill"></div>
    <div class="progressiveMedia" data-width="1920" data-height="1080">
      <img class="progressiveMedia-thumbnail" src="small-image-path" alt="" />
      <canvas class="progressiveMedia-canvas"></canvas>
      <img class="progressiveMedia-image" data-src="original-image-path" alt="" />
    </div>
  </div>
  ```

3. Set your `src`  small image path for class  `.progressiveMedia-thumbnail` 

  ```html
  <img class="progressiveMedia-thumbnail" src="small-image-path" alt="" />
  ```

4. Set `data-src="path"` original-image-path for class `.progressiveMedia-image` 

  ```html
  <img class="progressiveMedia-image" data-src="original-image-path" alt="" />
  ```

5. Set `data-width` and `data-height` for class `.progressiveMedia` via your api or what. For example:

  ```html
  <div class="progressiveMedia" data-width="1920" data-height="1080">
  ```


### Why

It's the best way to loading an image. No dependancy. Pure javascript. Progressive Image Loading with a blur effect. Reduce the page loading time. Better user experience. Wow.


### Where

Pilpil should (in theory) work in all relevant browsers (ie9+). If not, create an issue! Thanks!


### Who

Written by <a href="http://zafree.github.io/">Zafree</a>, made better by you.
