


var stubGetElementByIdReturnFakeDom = (
    function(fakeDom){
        document.getElementById = (id) => {
          return fakeDom;
        };

        return fakeDom;
    }
);

var buildFakeDom = (
  function(){
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

export {
  stubGetElementByIdReturnFakeDom ,
  buildFakeDom ,
  triggerEvent ,
  
}
/* stubGetElementByIdReturnFakeDom Not a pure module */
