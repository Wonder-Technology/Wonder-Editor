open DomHelperType;

[@bs.val] external document : document = "";

[@bs.val] [@bs.scope "document"]
external createElement : string => document = "createElement";

[@bs.val] [@bs.scope "document"]
external getElementById : string => Dom.element = "getElementById";

[@bs.val] [@bs.scope "document"]
external getElementsByClassName : string => array(Dom.element) =
  "getElementsByClassName";

[@bs.val] external alert : string => unit = "alert";

let getBody = [%raw () => "
  return document.body
"];

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

let deleteKeyInMap = [%raw
  {|
    function (key,map) {
      delete map[key];
      return map;
    }
  |}
];

let getDomClientRect = [%bs.raw
  {|
  function(ele){
    if (!ele.getClientRects().length) {
      return { top: 0, left: 0 };
    }

    let rect = ele.getBoundingClientRect();
    if (rect.width || rect.height) {
        let doc = ele.ownerDocument;
        let win = doc.defaultView;
        let docElem = doc.documentElement;

        return {
            top: (rect.top + win.pageYOffset) - docElem.clientTop,
            left: (rect.left + win.pageXOffset) - docElem.clientLeft,
            height: rect.height,
            width: rect.width,
        }
    }

    return rect;
  }
  |}
];

let getRandomKey = () : string =>
  StringService.floatToString(Js.Date.now() *. Js.Math.random());

let intEl = n => ReasonReact.string(string_of_int(n));

let textEl = str => ReasonReact.string(str);