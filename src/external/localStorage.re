/* type window;

   [@bs.val] external window : Js.t({..}) = "";

   type localStorageType;

   external parseLocalStorageToJsObj : localStorageType => Js.t({..}) = "%identity";

   let getLocalStorage = () => parseLocalStorageToJsObj(window##localStorage); */
let setLocalStorage = [%bs.raw
  {|
  function(key, val) {
    return window.localStorage[key] = val;
  }
  |}
];

let getLocalStorage = [%bs.raw {|
  function(key) {
    return window.localStorage[key];
  }
  |}];