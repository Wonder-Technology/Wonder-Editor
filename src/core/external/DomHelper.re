let getAttribute = [%raw (dom, prop) => "
  return dom.getAttribute(prop);
"];

let apply = [%bs.raw
  {|
    function(dataArray, func) {
      return func.apply(null, dataArray);
    }
  |}
];

let deleteKeyInDict = [%raw
  {|
    function (key,dict) {
      delete dict[key];
      return dict;
    }
  |}
];

let stopPropagation = e : unit => e##stopPropagation() |> ignore;

let preventDefault = e : unit => e##preventDefault();

let getRandomKey = () : string =>
  string_of_float(Js.Date.now() *. Js.Math.random());

let intEl = n => ReasonReact.stringToElement(string_of_int(n));

let textEl = str => ReasonReact.stringToElement(str);