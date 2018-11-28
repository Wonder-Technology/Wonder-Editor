module Message = {
  type messageType;

  [@bs.module "antd/lib/message/index"]
  external message : messageType = "default";

  external convertToJsObj : messageType => Js.t({..}) = "%identity";
};

module Switch = {
  [@bs.module "antd/lib/switch/index"]
  external reactClass : ReasonReact.reactClass = "default";
  let make =
      (
        ~checked: option(bool)=?,
        ~onChange: option(bool => unit)=?,
        children,
      ) =>
    ReasonReact.wrapJsForReason(
      ~reactClass,
      ~props={
        "checked": Js.Nullable.fromOption(checked),
        "onChange": Js.Nullable.fromOption(onChange),
      },
      children,
    );
};