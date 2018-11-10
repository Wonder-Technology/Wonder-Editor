open SettingType;

let setSetting = ({debug}) => {
  debug:
    switch (debug) {
    | None => None
    | Some(debug) => Some(debug)
    },
};

let unsafeGetIsDebug = ({debug}) => {
  let {isDebug} = debug |> OptionService.unsafeGet;

  isDebug;
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