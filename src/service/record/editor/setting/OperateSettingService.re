open SettingType;

let getHotKeys = ({hotKeys}) => hotKeys;

let unsafeGetIsDebug = ({debug}) => {
  let {isDebug} = debug |> OptionService.unsafeGet;

  isDebug;
};

let unsafeGetIsTestLocal = ({debug}) => {
  let {isTestLocal} = debug |> OptionService.unsafeGet;

  isTestLocal;
};

let unsafeGetMaxStackSize = ({redoUndo}) => {
  let {maxStackSize} = redoUndo |> OptionService.unsafeGet;

  maxStackSize;
};
