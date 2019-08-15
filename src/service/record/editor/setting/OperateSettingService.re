open SettingType;

let getHotKeys = ({hotKeys}) => hotKeys;

let unsafeGetIsDebug = ({debug}) => {
  let {isDebug} = debug |> OptionService.unsafeGet;

  isDebug;
};

let unsafeGetMaxStackSize = ({redoUndo}) => {
  let {maxStackSize} = redoUndo |> OptionService.unsafeGet;

  maxStackSize;
};
