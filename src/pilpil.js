;(function() {
  "use strict";

  // aspect ratio
  function aspectRation(image) {
    const image_width = image.dataset.width,
          image_height = image.dataset.height,
          image_aspectRatio = image_height / image_width * 100,
          el =  document.createElement("div")
          el.className = "image__aspect-ratio"
          image.appendChild(el).setAttribute("style", "padding-bottom:"+image_aspectRatio+"%;");
          image.setAttribute("style", "max-width:"+image_width+"px;max-height:"+image_height+"px;");
  }

  // canvas blur image
  function canvasBlurImage(image) {
    const image_width = image.dataset.width,
          image_height = image.dataset.height,
          image_small = image.dataset.small,
          thumbnail_width = 30,
          thumbnail_height= image_height / image_width * thumbnail_width,
          el =  document.createElement('canvas')
          el.className = 'image__canvas'
          image.appendChild(el);

    const canvas = image.appendChild(el),
          context = canvas.getContext("2d");

    canvas.height = thumbnail_height;
    canvas.width = thumbnail_width;

    const image_thumbnail = new Image();
    image_thumbnail.src = image_small;
    image_thumbnail.onload = function () {
      var canvasImage = new CanvasImage(canvas, image_thumbnail);
      canvasImage.blur(2);
      image.classList.add('canvas--loaded');
    }
  }

  // canvas blur function
  class CanvasImage {
    constructor(e, t) {
      this.image = t;
      this.element = e;
      e.width = t.width;
      e.height = t.height;
      this.context = e.getContext("2d");
      this.context.drawImage(t, 0, 0);
    }
    blur(e) {
      this.context.globalAlpha = 0.5;
      for (var t = -e; t <= e; t += 2) {
        for (var n = -e; n <= e; n += 2) {
          this.context.drawImage(this.element, n, t);
          var blob = n >= 0 && t >= 0 && this.context.drawImage(this.element, -(n - 1), -(t - 1));
        }
      }
    }
  }

  // render original image
  function renderOriginalImage(image) {
    const image_large = image.dataset.large,
          image_alt = image.dataset.alt,
          image_origanal = new Image();
    image_origanal.className = 'image__original';
    image_origanal.src = image_large;
    image.appendChild(image_origanal);
    image.classList.add('image--loading');
    image_origanal.alt = image_alt;
    image_origanal.onload = function() {
      setTimeout(function() {
        image.classList.add('image--loaded');
        image.classList.remove('image--loading');
      }, 600);
    }
  }

  // observer
  function observerImage(image) {
    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    };
    
    let observer = new IntersectionObserver(intersectionCallback, options);
    function intersectionCallback(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let elem = entry.target;
          canvasBlurImage(elem);
          renderOriginalImage(elem);
          observer.unobserve(elem);
        }
      });
    }
    observer.observe(image);
  }

  // check image
  function hasImage(image) {
      const imageWidth = image.getAttribute('data-width'),
            imageHeight = image.getAttribute('data-height'),
            imageSmall = image.getAttribute('data-small'),
            imageLarge = image.getAttribute('data-large'),
            imageAlt = image.getAttribute('data-alt');

      // check if dataset has and not empty
      if (imageWidth  !== "" && imageWidth  !== null &&
          imageHeight !== "" && imageHeight !== null &&
          imageSmall  !== "" && imageSmall  !== null &&
          imageLarge  !== "" && imageLarge  !== null) {
              return true;
      }
      return false;
  }

  // get image
  function image() {
      const images = document.querySelectorAll(".image");

      // if dataset exist
      images.forEach(image => {
        if(hasImage(image)) {
          aspectRation(image);
          observerImage(image);
        }
      });
  }
  // initialize progressive image loading
  image();
})();
