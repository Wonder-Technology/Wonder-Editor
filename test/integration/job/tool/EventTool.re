let _isHostMethod = [%raw
  (object_, property) => {|
                     var type = typeof object_[property];

                    return type === "function" ||
                        (type === "object" && !!object_[property]) ||
                        type === "unknown";
    |}
];

let _extend = [%raw
  (destination, source) => {|
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
    |}
];

let getDocument = () =>
  Wonderjs.DomExtend.document |> EventType.documentToEventTarget;

let getBody = () =>
  Wonderjs.DomExtend.document##body |> EventType.bodyToEventTarget;

let getKeyboardEventBindedDom = () => getBody();

/*

 let getPointEventBindedDom = engineState => ViewTool.unsafeGetCanvas(engineState);

 */

let triggerDomEvent = [%raw
  (eventName, oTarget, event) => {|
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
    |}
];

let buildFakeDocumentSetToWindow = [%raw
  {|
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
    |}
];
let buildFakeCanvasWithSize = [%raw
  (. width, height, offsetData) => {|
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
        |}
];

let _clearEventQueueMap = [%raw
  param => {|
    window.eventQueueMap = {};
    |}
];

let restore = () => {
  _clearEventQueueMap(.);

  ManageEventEngineService.unsubscribeDomEventStream
  |> StateLogicService.getAndSetEngineState;
};

let restoreHotKeys = () => {
  _clearEventQueueMap();

  HotKeysJs.setIsBind(false);
  HotKeysJs.removeHandlers();

  ManageEventEngineService.unsubscribeDomEventStream
  |> StateLogicService.getAndSetEngineState;
};

let onMouseEvent = Wonderjs.ManageEventAPI.onMouseEvent;

let onKeyboardEvent = (eventName, priority, handleFunc, state) =>
  Wonderjs.ManageEventAPI.onKeyboardEvent(
    eventName |> EventType.editorDomEventNameToEngineDomEventName,
    priority,
    handleFunc,
    state,
  );

let onCustomGlobalEvent = Wonderjs.ManageEventAPI.onCustomGlobalEvent;

let getCanvas = () =>
  ViewEngineService.unsafeGetCanvas
  |> StateLogicService.getEngineStateToGetData;

let buildCanvasTarget = () => {"tagName": "CANVAS"};

let buildBodyTarget = () => {"tagName": "BODY"};

let triggerFirstMouseDragOverEvent = mouseEvent => {
  triggerDomEvent("mousemove", getBody(), mouseEvent);
  triggerDomEvent("mousemove", getBody(), mouseEvent);
};