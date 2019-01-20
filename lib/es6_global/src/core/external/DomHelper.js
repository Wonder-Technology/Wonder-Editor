

import * as StringService$WonderEditor from "../../service/atom/StringService.js";

var getBody = function (){
  return document.body
};

var getAttribute = function (dom,prop){
  return dom.getAttribute(prop);
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
            height: rect.height,
            width: rect.width,
        }
    }

    return rect;
  }
  );

function getRandomKey() {
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
  apply ,
  deleteKeyInMap ,
  getDomClientRect ,
  getRandomKey ,
  intEl ,
  textEl ,
  
}
/* apply Not a pure module */
