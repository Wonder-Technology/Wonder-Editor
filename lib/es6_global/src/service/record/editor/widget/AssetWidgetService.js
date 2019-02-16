


function getWidget() {
  return /* Asset */1;
}

function isWidget(startWidget) {
  if (startWidget !== undefined) {
    return startWidget === /* Asset */1;
  } else {
    return false;
  }
}

export {
  getWidget ,
  isWidget ,
  
}
/* No side effect */
