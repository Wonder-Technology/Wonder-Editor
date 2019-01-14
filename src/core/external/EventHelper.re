let stopPropagation = e : unit => e##stopPropagation();

let preventDefault = e : unit => e##preventDefault();

let addEventListener = [%raw
  (element, event, handleFunc) => {|
   element.addEventListener(event, handleFunc, false)
  |}
];

let onresize = [%raw handleFunc => "
  window.onresize = handleFunc;
"];