[@bs.val] external requestAnimationFrame : (float => unit) => int = "";

[@bs.send] external toFixed : (float, int) => string = "";

[@bs.val] external makeNumber : string => string = "Number";

[@bs.val] external makeString : string => string = "String";

[@bs.send] external internal_getAttribute : (Js.t('a), string) => Js.null(string) = "getAttribute";

let apply = [%bs.raw
  {| function(dataArray, func) {
    return func.apply(null, dataArray);
  }
  |}
];

let getRandomKey = () => string_of_float(Js.Date.now() *. Js.Math.random());

let getAttribute = (node, name) => Js.Null.to_opt(internal_getAttribute(node, name));

let intEl = (n) => ReasonReact.stringToElement(string_of_int(n));

let textEl = (str) => ReasonReact.stringToElement(str);