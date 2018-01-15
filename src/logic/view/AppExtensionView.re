let getExtension = (key) => Js.Undefined.to_opt(AppExtensionBuss.getExtension(key));

let setExtension = AppExtensionBuss.setExtension;