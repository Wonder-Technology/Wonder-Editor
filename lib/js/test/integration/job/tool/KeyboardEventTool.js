'use strict';


function buildKeyboardDomEvent($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, param) {
  var ctrlKey = $staropt$star !== undefined ? $staropt$star : false;
  var altKey = $staropt$star$1 !== undefined ? $staropt$star$1 : false;
  var shiftKey = $staropt$star$2 !== undefined ? $staropt$star$2 : false;
  var metaKey = $staropt$star$3 !== undefined ? $staropt$star$3 : false;
  var keyCode = $staropt$star$4 !== undefined ? $staropt$star$4 : 8;
  var preventDefaultFunc = $staropt$star$5 !== undefined ? $staropt$star$5 : (function (param) {
        return /* () */0;
      });
  return {
          ctrlKey: ctrlKey,
          altKey: altKey,
          shiftKey: shiftKey,
          metaKey: metaKey,
          keyCode: keyCode,
          preventDefault: preventDefaultFunc
        };
}

exports.buildKeyboardDomEvent = buildKeyboardDomEvent;
/* No side effect */
