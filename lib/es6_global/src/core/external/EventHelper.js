


function stopPropagation(e) {
  return e.stopPropagation();
}

function preventDefault(e) {
  return e.preventDefault();
}

function addEventListener (element,event,handleFunc){
   element.addEventListener(event, handleFunc, false)
  };

function onresize (handleFunc){
  window.onresize = handleFunc;
};

export {
  stopPropagation ,
  preventDefault ,
  addEventListener ,
  onresize ,
  
}
/* No side effect */
