

import * as StringService$WonderEditor from "../../service/atom/StringService.js";

function getBody (){
  return document.body
};

function addEventListener (element,event,handleFunc){
   element.addEventListener(event, handleFunc, false)
  };

function getAttribute (dom,prop){
  return dom.getAttribute(prop);
};

function onresize (handleFunc){
  window.onresize = handleFunc;
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

function stopPropagation(e) {
  return e.stopPropagation();
}

function preventDefault(e) {
  return e.preventDefault();
}

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
  addEventListener ,
  getAttribute ,
  onresize ,
  apply ,
  deleteKeyInMap ,
  stopPropagation ,
  preventDefault ,
  getRandomKey ,
  intEl ,
  textEl ,
  
}
/* apply Not a pure module */
