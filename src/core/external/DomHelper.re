open DomHelperType;

[@bs.val] external document : document = "";

[@bs.val] [@bs.scope "document"]
external createElement : string => document = "createElement";

[@bs.val] [@bs.scope "document"]
external getElementById : string => Dom.element = "getElementById";

[@bs.val] external alert : string => unit = "alert";

let getAttribute = [%raw (dom, prop) => "
  return dom.getAttribute(prop);
"];

let onresize = [%raw handleFunc => "
  window.onresize = handleFunc;
"];

let apply = [%bs.raw
  {|
    function(dataArray, func) {
      return func.apply(null, dataArray);
    }
  |}
];

let deleteKeyInMap = [%raw
  {|
    function (key,map) {
      delete map[key];
      return map;
    }
  |}
];

let stopPropagation = e : unit => e##stopPropagation();

let preventDefault = e : unit => e##preventDefault();

let getRandomKey = () : string =>
  string_of_float(Js.Date.now() *. Js.Math.random());

let intEl = n => ReasonReact.string(string_of_int(n));

let textEl = str => ReasonReact.string(str);