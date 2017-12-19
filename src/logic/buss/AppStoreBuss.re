let getStorageValue = (key) => {
  let value = AppStoreOper.getStorageValue(key);
  Js.Undefined.return(value)
};

let setStorageValue = AppStoreOper.setStorageValue;