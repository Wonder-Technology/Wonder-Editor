

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_json from "../../../../../node_modules/bs-platform/lib/es6/js_json.js";
import * as Js_primitive from "../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";

function triggerComponentEvent(component, triggerEventFunc) {
  var json = component.toJSON();
  var match = Js_json.decodeObject(json);
  if (match !== undefined) {
    return Curry._1(triggerEventFunc, Js_primitive.valFromOption(match).children);
  } else {
    return /* () */0;
  }
}

function buildFormEvent(value) {
  return {
          target: {
            value: value,
            checked: value
          }
        };
}

function buildFileEvent($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, _) {
  var imgName = $staropt$star !== undefined ? $staropt$star : "loadImg.png";
  var imgSrc = $staropt$star$1 !== undefined ? $staropt$star$1 : "newImgBase64";
  var jsonName = $staropt$star$2 !== undefined ? $staropt$star$2 : "loadJson.json";
  var jsonResult = $staropt$star$3 !== undefined ? $staropt$star$3 : "loadJson string result";
  return {
          target: {
            files: {
              "0": {
                name: imgName,
                type: "image/png",
                file: imgSrc
              },
              "1": {
                name: jsonName,
                type: "application/json",
                file: jsonResult
              }
            }
          },
          preventDefault: (function () {
              return /* () */0;
            })
        };
}

var dragedUid = /* record */[/* contents */-1];

function buildDragEvent() {
  return {
          stopPropagation: (function () {
              return /* () */0;
            }),
          preventDefault: (function () {
              return /* () */0;
            }),
          dataTransfer: {
            effectAllowed: "move",
            setData: (function (_, value) {
                dragedUid[0] = value;
                return /* () */0;
              }),
            setDragImage: (function (_, _$1, _$2) {
                return /* () */0;
              }),
            getData: (function () {
                return dragedUid[0];
              })
          }
        };
}

function _getProps(dom) {
  return dom.props;
}

function triggerClickEvent(dom) {
  return dom.props.onClick();
}

function triggerClickFromEvent(dom, $$event) {
  return dom.props.onClick($$event);
}

function triggerChangeEvent(dom, $$event) {
  return dom.props.onChange($$event);
}

function triggerBlurEvent(dom, $$event) {
  return dom.props.onBlur($$event);
}

function triggerDragStartEvent(dom, $$event) {
  return dom.props.onDragStart($$event);
}

function triggerDragEndEvent(dom, $$event) {
  return dom.props.onDragEnd($$event);
}

function triggerDragEnterEvent(dom, $$event) {
  return dom.props.onDragEnter($$event);
}

function triggerDragLeaveEvent(dom, $$event) {
  return dom.props.onDragLeave($$event);
}

function triggerDragOverEvent(dom, $$event) {
  return dom.props.onDragOver($$event);
}

function triggerDropEvent(dom, $$event) {
  return dom.props.onDrop($$event);
}

export {
  triggerComponentEvent ,
  buildFormEvent ,
  buildFileEvent ,
  dragedUid ,
  buildDragEvent ,
  _getProps ,
  triggerClickEvent ,
  triggerClickFromEvent ,
  triggerChangeEvent ,
  triggerBlurEvent ,
  triggerDragStartEvent ,
  triggerDragEndEvent ,
  triggerDragEnterEvent ,
  triggerDragLeaveEvent ,
  triggerDragOverEvent ,
  triggerDropEvent ,
  
}
/* No side effect */
