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

let isShowMessage = ({debug}) => {
  let {showMessage} = debug |> OptionService.unsafeGet;

  showMessage;
};

let setIsShowMessage = (isShowMessage, {debug} as record) => {
  ...record,
  debug:
    Some({
      ...record.debug |> OptionService.unsafeGet,
      showMessage: isShowMessage,
    }),
};