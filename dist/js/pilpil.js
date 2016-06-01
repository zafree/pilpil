/**
 * Pilpil v1.0.0 - Progressive Image Loading
 * @link https://zafree.github.io/pilpil
 * @copyright 2015-2016 Zafree
 * @license MIT
 */
;(function() {
    'use strict';

    // set progressive image loading
    var progressiveMedias = document.querySelectorAll('.progressiveMedia');
    for (var i = 0; i < progressiveMedias.length; i++) {
        loadImage(progressiveMedias[i]);
    }

    // global function
    function loadImage(progressiveMedia) {

        // calculate aspect ratio
        // for the aspectRatioPlaceholder-fill
        // that helps to set a fixed fill for loading images
        var width = progressiveMedia.dataset.width,
        height = progressiveMedia.dataset.height,
        fill = height / width * 100,
        placeholderFill = progressiveMedia.previousElementSibling;

        placeholderFill.setAttribute('style', 'padding-bottom:'+fill+'%;');


        // set max-height and max-width to aspectRatioPlaceholder
        // that is fun
        var aspectRatioPlaceholder = progressiveMedia.parentElement,
        maxWidth = aspectRatioPlaceholder.offsetWidth,
        maxHeight = aspectRatioPlaceholder.offsetHeight;

        aspectRatioPlaceholder.setAttribute('style', 'max-width:'+maxWidth+'px; max-height:'+maxHeight+'px;');


        // get thumbnail height wight
        // make canvas fun part
        var thumbnail = progressiveMedia.querySelector('.progressiveMedia-thumbnail'),
        smImageWidth = thumbnail.width,
        smImageheight = thumbnail.height,

        canvas = progressiveMedia.querySelector('.progressiveMedia-canvas'),
        context = canvas.getContext('2d');

        canvas.height = smImageheight;
        canvas.width = smImageWidth;

        var img = new Image();
        img.src = thumbnail.src;

        img.onload = function () {
            // context.drawImage(img, 0, 0);
            // draw canvas
            var canvasImage = new CanvasImage(canvas, img);
            canvasImage.blur(2);

            // load canvas visible
            progressiveMedia.classList.add('is-canvasLoaded');
        };


        // grab data-src from original image
        // from progressiveMedia-image
        var lgImage = progressiveMedia.querySelector('.progressiveMedia-image');
        lgImage.src = lgImage.dataset.src;

        // onload image visible
        lgImage.onload = function() {
            progressiveMedia.classList.add('is-imageLoaded');
        }
    }

})();

// canvas blur function
CanvasImage = function (e, t) {
    this.image = t;
    this.element = e;
    e.width = t.width;
    e.height = t.height;
    this.context = e.getContext('2d');
    this.context.drawImage(t, 0, 0);
};

CanvasImage.prototype = {
    blur:function(e) {
        this.context.globalAlpha = 0.5;
        for(var t = -e; t <= e; t += 2) {
            for(var n = -e; n <= e; n += 2) {
                this.context.drawImage(this.element, n, t);
                var blob = n >= 0 && t >= 0 && this.context.drawImage(this.element, -(n -1), -(t-1));
            }
        }
    }
};
