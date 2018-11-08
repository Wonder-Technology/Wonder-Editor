open SettingType;

let setSetting = ({isDebug}) => {
  isDebug:
    switch (isDebug) {
    | None => Some(false)
    | Some(isDebug) => Some(isDebug)
    },
};

let unsafeGetIsDebug = ({isDebug}) => isDebug |> OptionService.unsafeGet;