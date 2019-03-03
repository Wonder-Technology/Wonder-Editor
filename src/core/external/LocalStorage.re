let _setLocalStorage: (string, string) => unit = [%raw
  {|
    function(key, val) {
      window.localStorage[key] = val;
    }
  |}
];

let _getLocalStorage: string => string = [%raw
  {|
    function(key) {
      return window.localStorage[key];
    }
  |}
];

let getValue = key =>
  _getLocalStorage(key) |> Js.Undefined.return |> Js.Undefined.to_opt;

let setValue = (key, value) => _setLocalStorage(key, value);