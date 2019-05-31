

import * as StringService$WonderEditor from "../../service/atom/StringService.js";

function getBody (param){
  return document.body
};

function appendChild (parent,child){
  parent.appendChild(child);
};

function removeChild (parent,child){
  parent.removeChild(child);
};

function innerHtml (dom,html){
  dom.innerHTML = html;
};

function getAttribute (dom,prop){
  return dom.getAttribute(prop);
};

function setAttribute (dom,prop,value){
  dom.setAttribute(prop,value);
};

function locationReload (param){
  window.location.reload(true);
};

var apply = (
    function(dataArray, func) {
      return func.apply(null, dataArray);
    }
  );

var setDomDisplay = (
    function(domEle, isShow) {
      isShow ?
        domEle.style.display = "block" : domEle.style.display = "none"
    }
  );

function isDomVisible (domEle){
     return domEle.style.display == "block"
  };

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
  appendChild ,
  removeChild ,
  innerHtml ,
  getAttribute ,
  setAttribute ,
  locationReload ,
  apply ,
  setDomDisplay ,
  isDomVisible ,
  deleteKeyInMap ,
  getDomClientRect ,
  getRandomKey ,
  intEl ,
  textEl ,
  
}
/* apply Not a pure module */
