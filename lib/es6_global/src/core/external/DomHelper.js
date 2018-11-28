

import * as Pervasives from "../../../../../node_modules/bs-platform/lib/es6/pervasives.js";

var getBody = function (){
  return document.body
};

var addEventListener = function (element,event,handleFunc){
   element.addEventListener(event, handleFunc, false)
  };

var getAttribute = function (dom,prop){
  return dom.getAttribute(prop);
};

var onresize = function (handleFunc){
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

function getRandomKey() {
  return Pervasives.string_of_float(Date.now() * Math.random());
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
