open Sinon;

let stubGetElementByIdReturnFakeDom = [%bs.raw
  {|
    function(fakeDom){
        document.getElementById = (id) => {
          return fakeDom;
        };

        return fakeDom;
    }
|}
];

let buildFakeDom = [%bs.raw
  {|
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
      appendChild :function(){}, 
      setAttirbute :function(){}, 
      toDataURL: function(){
         return "data:image/png;base64 for img-canvas"
      }
    }
  }
  |}
];

let triggerEvent = [%bs.raw
  {|
    function (fakeDom, eventName, fakeEvent){
      fakeDom.eventDataMap[eventName].forEach((handleFunc) => {
        handleFunc(fakeEvent);
      })
    }
    |}
];