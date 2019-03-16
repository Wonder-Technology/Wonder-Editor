

import * as StringService$WonderEditor from "../../service/atom/StringService.js";

function getBody (param){
  return document.body
};

function getAttribute (dom,prop){
  return dom.getAttribute(prop);
};

function locationReload (param){
  window.location.reload(true);
};

var apply = (
    function(dataArray, func) {
      return func.apply(null, dataArray);
    }
  );

var deleteKeyInMap = (
    function (key,map) {
      delete map[key];
      return map;
    }
  );

var getDomClientRect = (
  function(ele){
    if (!ele.getClientRects().length) {
      return { top: 0, left: 0 };
    }

    let rect = ele.getBoundingClientRect();
    if (rect.width || rect.height) {
        let doc = ele.ownerDocument;
        let win = doc.defaultView;
        let docElem = doc.documentElement;

        return {
            top: (rect.top + win.pageYOffset) - docElem.clientTop,
            left: (rect.left + win.pageXOffset) - docElem.clientLeft,
            offsetLeft: ele.offsetLeft,
            offsetTop: ele.offsetTop,
            height: rect.height,
            width: rect.width,
        }
    }

    return rect;
  }
  );

function getRandomKey(param) {
  return StringService$WonderEditor.floatToString(Date.now() * Math.random());
}

function intEl(n) {
  return String(n);
}

function textEl(str) {
  return str;
}

export {
  getBody ,
  getAttribute ,
  locationReload ,
  apply ,
  deleteKeyInMap ,
  getDomClientRect ,
  getRandomKey ,
  intEl ,
  textEl ,
  
}
/* apply Not a pure module */
