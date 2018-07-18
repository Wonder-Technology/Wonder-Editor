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