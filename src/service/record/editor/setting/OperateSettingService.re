open SettingType;

let setSetting = ({debug, redoUndo}) => {
  debug:
    switch (debug) {
    | None => None
    | Some(debug) => Some(debug)
    },
  redoUndo:
    switch (redoUndo) {
    | None => None
    | Some(redoUndo) => Some(redoUndo)
    },
};

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