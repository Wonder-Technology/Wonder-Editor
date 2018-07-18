module Sketch = {
  [@bs.module "react-color/lib/components/sketch/Sketch"]
  external reactClass : ReasonReact.reactClass = "default";
  let make =
      (
        ~color: option(string)=?,
        ~onChange: option(('value, ReactEventRe.Mouse.t) => unit)=?,
        children,
      ) =>
    ReasonReact.wrapJsForReason(
      ~reactClass,
      ~props={
        "color": Js.Nullable.fromOption(color),
        "onChange": Js.Nullable.fromOption(onChange),
      },
      children,
    );
};