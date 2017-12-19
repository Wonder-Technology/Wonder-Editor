let getExtension = (key) => {
  let value = AppExtensionOper.getValue(key);
  Js.Undefined.return(value)
};

let setExtension = AppExtensionOper.setValue;