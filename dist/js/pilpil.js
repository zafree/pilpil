/**
 * Pilpil v1.0.0 - Progressive Image Loading
 * @link https://zafree.github.io/pilpil
 * @copyright 2015-2023 Zafree
 * @license MIT
 */(function () {
  "use strict";

  // canvas blur function
  var CanvasImage = function (e, t) {
    this.image = t;
    this.element = e;
    e.width = t.width;
    e.height = t.height;
    this.context = e.getContext("2d");
    this.context.drawImage(t, 0, 0);
  };
  CanvasImage.prototype = {
    blur: function (e) {
      this.context.globalAlpha = 0.5;
      for (var t = -e; t <= e; t += 2) {
        for (var n = -e; n <= e; n += 2) {
          this.context.drawImage(this.element, n, t);
          var blob = n >= 0 && t >= 0 && this.context.drawImage(this.element, -(n - 1), -(t - 1));
        }
      }
    },
  };

  // aspect ratio
  function aspectRation(image) {
    var image_width = image.dataset.width,
      image_height = image.dataset.height,
      image_aspectRatio = (image_height / image_width) * 100,
      el = document.createElement("div");
    el.className = "image__aspect-ratio";
    image.appendChild(el).setAttribute("style", "padding-bottom:" + image_aspectRatio + "%;");
    image.setAttribute("style", "max-width:" + image_width + "px;max-height:" + image_height + "px;");
  }

  // canvas blur image
  function canvasBlurImage(image) {
    var image_width = image.dataset.width,
      image_height = image.dataset.height,
      image_small = image.dataset.small,
      thumbnail_width = 30,
      thumbnail_height = (image_height / image_width) * thumbnail_width,
      el = document.createElement("canvas");
    el.className = "image__canvas";
    image.appendChild(el);

    var canvas = image.appendChild(el),
      context = canvas.getContext("2d");

    canvas.height = thumbnail_height;
    canvas.width = thumbnail_width;

    var image_thumbnail = new Image();
    image_thumbnail.src = image_small;
    image_thumbnail.onload = function () {
      var canvasImage = new CanvasImage(canvas, image_thumbnail);
      canvasImage.blur(2);
      image.classList.add("canvas--loaded");
    };
  }

  // render original image
  function renderOriginalImage(image) {
    window.addEventListener("load", function () {
      var image_large = image.dataset.large,
        image_alt = image.dataset.alt,
        // image_title = image.dataset.title,
        image_origanal = new Image();
      image.appendChild(image_origanal);
      image_origanal.className = "image__original";
      image_origanal.src = image_large;
      image.classList.add("image--loading");
      image_origanal.onload = function () {
        image.classList.add("image--loaded");
        image.classList.remove("image--loading");
        image_origanal.alt = image_alt;
        // image_origanal.title = image_title;
      };
    });
  }

  // all image
  function hasImage(image) {
    // var imageDataset = image.dataset;
    var imageWidth = image.getAttribute("data-width"),
      imageHeight = image.getAttribute("data-height"),
      imageSmall = image.getAttribute("data-small"),
      imageLarge = image.getAttribute("data-large"),
      imageAlt = image.getAttribute("data-alt");
    // imageTitle = image.getAttribute('data-title');

    // check if dataset has and not empty
    if (
      imageWidth !== "" &&
      imageWidth !== null &&
      imageHeight !== "" &&
      imageHeight !== null &&
      imageSmall !== "" &&
      imageSmall !== null &&
      imageLarge !== "" &&
      imageLarge !== null
    ) {
      return true;
    }
    return false;
  }

  // Image
  function image() {
    var images = document.querySelectorAll(".image");

    // if dataset exist
    for (var i = 0; i < images.length; i++) {
      hasImage(images[i]);

      if (hasImage(images[i])) {
        aspectRation(images[i]);
        canvasBlurImage(images[i]);
        renderOriginalImage(images[i]);
      }
    }
  }

  // initialize prograssive image loading
  image();
})();
