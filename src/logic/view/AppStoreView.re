let storageParentKey = "userExtension";

let getStorageValueAndDispose = (key, disposeValueFunc) => {
  let value = AppStoreBuss.getStorageValue(key);
  disposeValueFunc(Js.Undefined.to_opt(value))
};

let setStorageValue = AppStoreBuss.setStorageValue;