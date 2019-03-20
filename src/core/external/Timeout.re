let setTimeout = [%bs.raw
  {|
  function(func, time){
      setTimeout(func, time)
  }
|}
];

let setInterval = [%bs.raw
  {|
  function(func, time){
     let intervalId = setInterval(func, time);

     return intervalId;
  }
|}
];

let clearInterval: int => unit = [%bs.raw
  {|
  function(intervalId){
    clearInterval(intervalId)
  }
|}
];