[@bs.val] external requestAnimationFrame : (float => unit) => int = "";

[@bs.val] external cancelAnimationFrame : int => unit = "";

[@bs.send] external toFixed : (float, int) => string = "";

[@bs.val] external makeStringToInt : string => int = "Number";

[@bs.val] external makeStringToFloat : string => float = "Number";

[@bs.val] external makeNumberToString : string => string = "Number";

/* [@bs.val] external readAsDataURL : file => unit = "FileReader"; */
[@bs.val] external makeString : string => string = "String";

[@bs.send] external internal_getAttribute : (Js.t('a), string) => Js.null(string) = "getAttribute";

let setTimeout = [%bs.raw {|
    function (func, time) {
      setTimeout(func, time)
    }
  |}];

let apply = [%bs.raw
  {| function(dataArray, func) {
    return func.apply(null, dataArray);
  }
  |}
];

let stopPropagation = (e) : unit => e##stopPropagation() |> ignore;

let preventDefault = (e) : unit => e##preventDefault();

let getRandomKey = () : string => string_of_float(Js.Date.now() *. Js.Math.random());

let getAttribute = (node, name) => Js.Null.to_opt(internal_getAttribute(node, name));

let intEl = (n) => ReasonReact.stringToElement(string_of_int(n));

let textEl = (str) => ReasonReact.stringToElement(str);