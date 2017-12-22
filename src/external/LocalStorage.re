/* type window;

   [@bs.val] external window : Js.t({..}) = "";

   type localStorageType;

   external parseLocalStorageToJsObj : localStorageType => Js.t({..}) = "%identity";

   let getLocalStorage = () => parseLocalStorageToJsObj(window##localStorage); */
let setLocalStorage: (string, string) => unit = [%bs.raw
  {|
  function(key, val) {
    window.localStorage[key] = val;
  }
  |}
];

let getLocalStorage: string => string = [%bs.raw
  {|
  function(key) {
    return window.localStorage[key];
  }
  |}
];