let getExtension = (key) =>
  LocalStorage.getLocalStorage(key) |> Js.Undefined.return |> Js.Undefined.to_opt;

let setExtension = (key, value) => LocalStorage.setLocalStorage(key, value);