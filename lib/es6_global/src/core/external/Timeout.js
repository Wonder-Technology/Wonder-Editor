


var $$setTimeout = (
  function(func, time){
      setTimeout(func, time)
  }
);

var $$setInterval = (
  function(func, time){
     let intervalId = setInterval(func, time);

     return intervalId;
  }
);

var $$clearInterval = (
  function(intervalId){
    clearInterval(intervalId)
  }
);

export {
  $$setTimeout ,
  $$setInterval ,
  $$clearInterval ,
  
}
/* setTimeout Not a pure module */
