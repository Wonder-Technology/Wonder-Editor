'use strict';

var ManageEventAPI$Wonderjs = require("wonder.js/lib/js/src/api/event/ManageEventAPI.js");
var Hotkeys = require("wonder-hotkey2/dist/hotkeys");
var StateLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/StateLogicService.js");
var ViewEngineService$WonderEditor = require("../../../../src/service/state/engine/ViewEngineService.js");
var ManageEventEngineService$WonderEditor = require("../../../../src/service/state/engine/event/ManageEventEngineService.js");

function _isHostMethod (object_,property){
                     var type = typeof object_[property];

                    return type === "function" ||
                        (type === "object" && !!object_[property]) ||
                        type === "unknown";
    };

function _extend (destination,source){
                var target = null;
                Object.defineProperty(destination, "target", {
                    configurable: true,
                    enumerable: true,
                    get: function() {
                        return target;
                    },
                    set: function(t) {
                        target = t;
                    }
                })

                for (let property in source) {
                    destination[property] = source[property];
                }
                return destination;
    };

function getDocument(param) {
  return document;
}

function getBody(param) {
  return document.body;
}

function getKeyboardEventBindedDom(param) {
  return document.body;
}

function triggerDomEvent (eventName,oTarget,event){
                    var evObj = null,
                    dom = null;

                if (_isHostMethod(document, "createEvent")) {
                    /* 判断事件类型
                     switch (type) {
                     case 'abort':
                     case 'blur':
                     case 'change':
                     case 'error':
                     case 'focus':
                     case 'load':
                     case 'reset':
                     case 'resize':
                     case 'scroll':
                     case 'select':
                     case 'submit':
                     case 'unload':
                     evObj = document.createEvent('HTMLEvents');
                     evObj.initEvent(type, false, true);
                     break;
                     case 'DOMActivate':
                     case 'DOMFocusIn':
                     case 'DOMFocusOut':
                     case 'keydown':
                     case 'keypress':
                     case 'keyup':
                     evObj = document.createEvent('UIEevents');
                     evObj.initUIEvent(type, false, true);     //出错：参数过少
                     break;
                     case 'click':
                     case 'mousedown':
                     case 'mousemove':
                     case 'mouseout':
                     case 'mouseover':
                     case 'mouseup':
                     evObj = document.createEvent('MouseEvents');
                     evObj.initMouseEvent(type, false, true);  //出错：参数过少
                     break;
                     case 'DOMAttrModified':
                     case 'DOMNodeInserted':
                     case 'DOMNodeRemoved':
                     case 'DOMCharacterDataModified':
                     case 'DOMNodeInsertedIntoDocument':
                     case 'DOMNodeRemovedFromDocument':
                     case 'DOMSubtreeModified':
                     evObj = document.createEvent('MutationEvents');
                     evObj.initMutationEvent(type, false, true);   //出错：参数过少
                     break;
                     default:
                     throw new Error("超出范围！");
                     break;

                     }
                     */

                    //此处使用通用事件
                    evObj = document.createEvent('Events');
                    evObj.initEvent(eventName, false, true);

                    if(!!event){
                        _extend(evObj, event);
                    }

                        dom = oTarget;
                        dom.dispatchEvent(evObj);
                }
                /* else if (isHostMethod(document, "createEventObject")) {
                        dom = oTarget;
                        dom.fireEvent('on' + eventName);
                } */
                else{
                    throw new Error("trigger dom event error");
                }
    };

var buildFakeDocumentSetToWindow = (
    function(param){
        function _getOrCreateEventQueue(type){
            if(window.eventQueueMap === undefined){
                window.eventQueueMap = {};
            }
            if(window.eventQueueMap[type] === undefined){
                window.eventQueueMap[type] = [];
            }
            return window.eventQueueMap[type];
        };

        document.addEventListener = (eventName, func, isCapture) => {
            var queue = _getOrCreateEventQueue(eventName);

            queue.push(func);

        };
        document.removeEventListener =  (eventName, func, isCapture) => {
            var queue = _getOrCreateEventQueue(eventName);

            var index = queue.indexOf(func);

            if(index === -1){
                return;
            }

            queue.splice(
                index, 1
            );
        };
        document.dispatchEvent = (event) => {
            var queue = _getOrCreateEventQueue(event.type);
            event.target = {
                tagName:"keydown"
            }


            queue.forEach((func) => {
                func(event)
            });
        };
    }
    );

function buildFakeCanvasWithSize (width,height,offsetData){
    var [ offsetLeft, offsetTop, offsetParent ] = offsetData;

        function _getOrCreateEventQueue(type){
            if(window.eventQueueMap === undefined){
                window.eventQueueMap = {};
            }
            if(window.eventQueueMap[type] === undefined){
                window.eventQueueMap[type] = [];
            }

            return window.eventQueueMap[type];
        }

    return {
        nodeType: 1,
        style: {
        "left": "",
        "top": "",
        "width": String(width) + "px",
        "height": String(height) + "px",
        "position": "static",
        },
        width: width,
        height: height,
        offsetLeft: offsetLeft,
        offsetTop: offsetTop,
        offsetParent: offsetParent,



        addEventListener: (eventName, func, isCapture) => {
    var queue = _getOrCreateEventQueue(eventName);

    queue.push(func);
            },

            removeEventListener: (eventName, func, isCapture) => {
    var queue = _getOrCreateEventQueue(eventName);

    var index = queue.indexOf(func);

    if(index === -1){
        return;
    }

    queue.splice(
        index, 1
    );
            },

            dispatchEvent: (event) => {
    var queue = _getOrCreateEventQueue(event.type);


    queue.forEach((func) => {
        func(event)
    });
            }

            }
        };

function _clearEventQueueMap (param){
    window.eventQueueMap = {};
    };

function restore(param) {
  _clearEventQueueMap();
  return StateLogicService$WonderEditor.getAndSetEngineState(ManageEventEngineService$WonderEditor.unsubscribeDomEventStream);
}

function restoreHotKeys(param) {
  _clearEventQueueMap(/* () */0);
  Hotkeys.setIsBind(false);
  Hotkeys.removeHandlers();
  return StateLogicService$WonderEditor.getAndSetEngineState(ManageEventEngineService$WonderEditor.unsubscribeDomEventStream);
}

var onKeyboardEvent = ManageEventAPI$Wonderjs.onKeyboardEvent;

function getCanvas(param) {
  return StateLogicService$WonderEditor.getEngineStateToGetData(ViewEngineService$WonderEditor.unsafeGetCanvas);
}

function buildCanvasTarget(param) {
  return {
          tagName: "CANVAS"
        };
}

function buildBodyTarget(param) {
  return {
          tagName: "BODY"
        };
}

function triggerFirstMouseDragOverEvent(mouseEvent) {
  triggerDomEvent("mousemove", document.body, mouseEvent);
  triggerDomEvent("mousemove", document.body, mouseEvent);
  return triggerDomEvent("mousemove", document.body, mouseEvent);
}

var onMouseEvent = ManageEventAPI$Wonderjs.onMouseEvent;

var onCustomGlobalEvent = ManageEventAPI$Wonderjs.onCustomGlobalEvent;

exports._isHostMethod = _isHostMethod;
exports._extend = _extend;
exports.getDocument = getDocument;
exports.getBody = getBody;
exports.getKeyboardEventBindedDom = getKeyboardEventBindedDom;
exports.triggerDomEvent = triggerDomEvent;
exports.buildFakeDocumentSetToWindow = buildFakeDocumentSetToWindow;
exports.buildFakeCanvasWithSize = buildFakeCanvasWithSize;
exports._clearEventQueueMap = _clearEventQueueMap;
exports.restore = restore;
exports.restoreHotKeys = restoreHotKeys;
exports.onMouseEvent = onMouseEvent;
exports.onKeyboardEvent = onKeyboardEvent;
exports.onCustomGlobalEvent = onCustomGlobalEvent;
exports.getCanvas = getCanvas;
exports.buildCanvasTarget = buildCanvasTarget;
exports.buildBodyTarget = buildBodyTarget;
exports.triggerFirstMouseDragOverEvent = triggerFirstMouseDragOverEvent;
/* buildFakeDocumentSetToWindow Not a pure module */
