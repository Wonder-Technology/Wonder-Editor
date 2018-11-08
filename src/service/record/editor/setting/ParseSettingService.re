open SettingType;

let convertToRecord = setting => {
  open WonderBsJson.Json;
  open Decode;

  let json = setting;

  {isDebug: json |> optional(field("is_debug", bool))};
};