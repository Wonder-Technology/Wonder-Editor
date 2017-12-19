let storageParentKey = "userExtension";

let getExtensionAndHandle = (key, handleFunc) => {
  let value = AppExtensionBuss.getExtension(key);
  handleFunc(Js.Undefined.to_opt(value))
};

let setExtension = AppExtensionBuss.setExtension;