# Pilpil - Progressive Image Loading

Pilpil is a tiny, pure JavaScript library for Progressive Image Loading with a blur effect to reduce the page load time; as seen on [Medium](https://medium.com/designing-medium/image-zoom-on-medium-24d146fc0c20).

### Demo

https://zafree.github.io/pilpil

### How

1. Link files to your site or application (add `<script>` to bottom of page)

```html
<link rel="stylesheet" href="pilpil.css" />
<script src="pilpil.js"></script>
```

2. Set markup

```html
<div
  class="image"
  data-width="original_width"
  data-height="original_height"
  data-small="small_image_path"
  data-large="original_image_path"
  data-alt="image_alt">
</div>
```

### Why

It's the best way to load an image. No dependencies. Pure JavaScript. Progressive Image Loading with a blur effect. Reduce the page loading time. Better user experience. Wow.

### Where

Pilpil should (in theory) work in all relevant browsers (ie9+). If not, create an issue! Thanks!

### Who

Written by <a href="http://zafree.github.io/">Zafree</a>, made better by you.
