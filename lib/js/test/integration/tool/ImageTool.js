'use strict';


function buildImage($staropt$star, param) {
  return {
          name: $staropt$star !== undefined ? $staropt$star : ""
        };
}

function buildImageWithSrc(src) {
  return {
          src: src,
          onload: null,
          complete: true
        };
}

exports.buildImage = buildImage;
exports.buildImageWithSrc = buildImageWithSrc;
/* No side effect */
