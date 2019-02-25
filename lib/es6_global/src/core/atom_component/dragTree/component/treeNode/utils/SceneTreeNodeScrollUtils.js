

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as DomHelper$WonderEditor from "../../../../../external/DomHelper.js";
import * as SceneTreeNodeScrollDataUtils$WonderEditor from "./SceneTreeNodeScrollDataUtils.js";

function _isXAxisNeedScrollLeft(sceneTreeNodeDomOffsetLeft, sceneTreeContainerScrollLeft) {
  return sceneTreeNodeDomOffsetLeft - sceneTreeContainerScrollLeft <= SceneTreeNodeScrollDataUtils$WonderEditor.getXAxisScrollLeftBoundary(/* () */0);
}

function _isXAxisNeedScrollRight(sceneTreeNodeDomOffsetLeft, sceneTreeContainerScrollLeft, sceneTreeContainerOffsetWidth) {
  return sceneTreeNodeDomOffsetLeft >= sceneTreeContainerScrollLeft + sceneTreeContainerOffsetWidth - SceneTreeNodeScrollDataUtils$WonderEditor.getXAxisScrollRightBoundary(/* () */0);
}

function _calcXAxisScrollValue(_, sceneTreeNodeDomOffsetLeft, param) {
  var sceneTreeContainerOffsetWidth = param[1];
  var sceneTreeContainerScrollLeft = param[0];
  var match = _isXAxisNeedScrollLeft(sceneTreeNodeDomOffsetLeft, sceneTreeContainerScrollLeft);
  if (match) {
    return sceneTreeNodeDomOffsetLeft - sceneTreeContainerOffsetWidth / 2;
  } else {
    var match$1 = _isXAxisNeedScrollRight(sceneTreeNodeDomOffsetLeft, sceneTreeContainerScrollLeft, sceneTreeContainerOffsetWidth);
    if (match$1) {
      return sceneTreeNodeDomOffsetLeft - sceneTreeContainerOffsetWidth / 2;
    } else {
      return undefined;
    }
  }
}

function _isYAxisNeedScrollTop(sceneTreeNodeDomOffsetTop, sceneTreeContainerScrollTop) {
  return sceneTreeNodeDomOffsetTop - sceneTreeContainerScrollTop <= SceneTreeNodeScrollDataUtils$WonderEditor.getYAxisScrollTopBoundary(/* () */0);
}

function _isYAxisNeedScrollBottom(sceneTreeNodeDomOffsetTop, sceneTreeContainerScrollTop, sceneTreeContainerOffsetHeight) {
  return sceneTreeNodeDomOffsetTop >= sceneTreeContainerScrollTop + sceneTreeContainerOffsetHeight - SceneTreeNodeScrollDataUtils$WonderEditor.getYAxisScrollBottomBoundary(/* () */0);
}

function _calcYAxisScrollValue(_, sceneTreeNodeDomOffsetTop, param) {
  var sceneTreeContainerOffsetHeight = param[1];
  var sceneTreeContainerScrollTop = param[0];
  var match = _isYAxisNeedScrollTop(sceneTreeNodeDomOffsetTop, sceneTreeContainerScrollTop);
  if (match) {
    return sceneTreeNodeDomOffsetTop - sceneTreeContainerOffsetHeight / 2;
  } else {
    var match$1 = _isYAxisNeedScrollBottom(sceneTreeNodeDomOffsetTop, sceneTreeContainerScrollTop, sceneTreeContainerOffsetHeight);
    if (match$1) {
      return sceneTreeNodeDomOffsetTop - sceneTreeContainerOffsetHeight / 2;
    } else {
      return undefined;
    }
  }
}

function scrollCurrentSceneTreeNode(sceneTreeContainerJsObj, sceneTreeNodeDomClientRect) {
  var match = _calcXAxisScrollValue(sceneTreeContainerJsObj, sceneTreeNodeDomClientRect.offsetLeft, /* tuple */[
        sceneTreeContainerJsObj.scrollLeft,
        sceneTreeContainerJsObj.offsetWidth
      ]);
  if (match !== undefined) {
    sceneTreeContainerJsObj.scrollLeft = match;
  }
  var match$1 = _calcYAxisScrollValue(sceneTreeContainerJsObj, sceneTreeNodeDomClientRect.offsetTop, /* tuple */[
        sceneTreeContainerJsObj.scrollTop,
        sceneTreeContainerJsObj.offsetHeight
      ]);
  if (match$1 !== undefined) {
    sceneTreeContainerJsObj.scrollTop = match$1;
    return /* () */0;
  } else {
    return /* () */0;
  }
}

function handleSelectedSceneTreeNodeScroll(isSelected, gameObject) {
  if (isSelected) {
    var sceneTreeContainerJsObj = document.getElementById("wonder-sceneTree-component");
    var sceneTreeNodeDomClientRect = Curry._1(DomHelper$WonderEditor.getDomClientRect, document.getElementById("sceneTreeNode-" + (String(gameObject) + "")));
    return scrollCurrentSceneTreeNode(sceneTreeContainerJsObj, sceneTreeNodeDomClientRect);
  } else {
    return /* () */0;
  }
}

export {
  _isXAxisNeedScrollLeft ,
  _isXAxisNeedScrollRight ,
  _calcXAxisScrollValue ,
  _isYAxisNeedScrollTop ,
  _isYAxisNeedScrollBottom ,
  _calcYAxisScrollValue ,
  scrollCurrentSceneTreeNode ,
  handleSelectedSceneTreeNodeScroll ,
  
}
/* DomHelper-WonderEditor Not a pure module */
