'use strict';


var stubGetElementByIdReturnFakeDom = (
    function(fakeDom){
        document.getElementById = (id) => {
          return fakeDom;
        };

        return fakeDom;
    }
);

var buildFakeDom = (
  function(param){
    return {
      eventDataMap: {},
      addEventListener: function(eventName, handleFunc) {
        var eventDataMap = this.eventDataMap;
        if(!!!eventDataMap[eventName]){
          eventDataMap[eventName] = [handleFunc];
          return;
        }

        eventDataMap[eventName].push(handleFunc);
      },
      removeEventListener: function(eventName){
      },
      getClientRects:function(){
        return []
      },
      getBoundingClientRect:function(){
        return {}
      },
      width: 100,
      height: 100,
      getContext: function() {
         return {}
      },
      toDataURL: function(){
         return "data:image/png;base64 for img-canvas"
      }
    }
  }
  );

var triggerEvent = (
    function (fakeDom, eventName, fakeEvent){
      fakeDom.eventDataMap[eventName].forEach((handleFunc) => {
        handleFunc(fakeEvent);
      })
    }
    );

exports.stubGetElementByIdReturnFakeDom = stubGetElementByIdReturnFakeDom;
exports.buildFakeDom = buildFakeDom;
exports.triggerEvent = triggerEvent;
/* stubGetElementByIdReturnFakeDom Not a pure module */
