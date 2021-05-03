


function buildSceneTreeContainerJsObj($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, _) {
  var scrollLeft = $staropt$star !== undefined ? $staropt$star : 11;
  var scrollTop = $staropt$star$1 !== undefined ? $staropt$star$1 : 12;
  var offsetWidth = $staropt$star$2 !== undefined ? $staropt$star$2 : 12;
  var offsetHeight = $staropt$star$3 !== undefined ? $staropt$star$3 : 12;
  return {
          scrollLeft: scrollLeft,
          scrollTop: scrollTop,
          offsetWidth: offsetWidth,
          offsetHeight: offsetHeight
        };
}

function buildSceneTreeNodeDomClientRect($staropt$star, $staropt$star$1, _) {
  var offsetLeft = $staropt$star !== undefined ? $staropt$star : 11;
  var offsetTop = $staropt$star$1 !== undefined ? $staropt$star$1 : 12;
  return {
          offsetLeft: offsetLeft,
          offsetTop: offsetTop
        };
}

export {
  buildSceneTreeContainerJsObj ,
  buildSceneTreeNodeDomClientRect ,
  
}
/* No side effect */
