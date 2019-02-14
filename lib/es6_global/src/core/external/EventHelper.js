


function stopPropagation(e) {
  return e.stopPropagation();
}

function preventDefault(e) {
  return e.preventDefault();
}

var addEventListener = function (element,event,handleFunc){
   element.addEventListener(event, handleFunc, false)
  };

var onresize = function (handleFunc){
  window.onresize = handleFunc;
};

export {
  stopPropagation ,
  preventDefault ,
  addEventListener ,
  onresize ,
  
}
/* No side effect */
