[@bs.val] external requestAnimationFrame : (float => unit) => int = "";

[@bs.val] external cancelAnimationFrame : int => unit = "";

[@bs.send] external toFixed : (float, int) => string = "";

[@bs.val] external makeStringToInt : string => int = "Number";

[@bs.val] external makeStringToFloat : string => float = "Number";

[@bs.val] external makeNumberToString : string => string = "Number";

[@bs.val] external makeString : string => string = "String";

type domType;

[@bs.val] [@bs.scope "document"] external createElement : string => domType = "createElement";

[@bs.val] [@bs.scope "document"] external getElementById : string => Dom.element = "getElementById";

external convertDomToJsObj : domType => Js.t({..}) = "%identity";
let setTimeout = [%bs.raw {|
    function (func, time) {
      setTimeout(func, time)
    }
  |}];

let apply = [%bs.raw
  {|
    function(dataArray, func) {
      return func.apply(null, dataArray);
    }
  |}
];

/* TODO change to "let deleteKeyInDict = (key, dict) => [@bs]{  Js.Dict.unsafeDeleteKey(dict, key) |> ignore; dict };" */
/* TODO change to immutabl: copy dict */
let deleteKeyInDict = [%raw {|function (key,dict) {
  return dict;
  delete dict[key];
    }
  |}];

let stopPropagation = (e) : unit => e##stopPropagation() |> ignore;

let preventDefault = (e) : unit => e##preventDefault();

let getRandomKey = () : string => string_of_float(Js.Date.now() *. Js.Math.random());

let intEl = (n) => ReasonReact.stringToElement(string_of_int(n));

let textEl = (str) => ReasonReact.stringToElement(str);