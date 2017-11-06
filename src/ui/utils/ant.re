let optionMap = (fn, option) =>
  switch option {
  | Some(value) => Some(fn(value))
  | None => None
  };

module Button = {
  [@bs.module "antd/lib/button"] external reactClass : ReasonReact.reactClass = "default";
  let make =
      (
        ~ghost: option(bool)=?,
        ~htmlType: option(string)=?,
        ~icon: option(string)=?,
        ~loading: option(bool)=?,
        ~shape: option(string)=?,
        ~size: option(string)=?,
        ~onClick: option(ReasonReact.Callback.t(ReactEventRe.Mouse.t))=?,
        ~_type: option(string)=?,
        children
      ) =>
    ReasonReact.wrapJsForReason(
      ~reactClass,
      ~props={
        "ghost": Js.Nullable.from_opt(optionMap(Js.Boolean.to_js_boolean, ghost)),
        "htmlType": Js.Nullable.from_opt(htmlType),
        "icon": Js.Nullable.from_opt(icon),
        "loading": Js.Nullable.from_opt(optionMap(Js.Boolean.to_js_boolean, loading)),
        "shape": Js.Nullable.from_opt(shape),
        "size": Js.Nullable.from_opt(size),
        "onClick": Js.Nullable.from_opt(onClick),
        "type": Js.Nullable.from_opt(_type)
      },
      children
    );
};

module InputNumber = {
  [@bs.module "antd/lib/input-number"] external reactClass : ReasonReact.reactClass = "default";
  let make =
      (
        ~defaultValue: option(float)=?,
        ~disabled: option(bool)=?,
        ~max: option(float)=?,
        ~min: option(float)=?,
        ~precision: option(float)=?,
        ~size: option(string)=?,
        ~step: option(float)=?,
        ~value: option(float)=?,
        ~onBlur: option(ReasonReact.Callback.t(ReactEventRe.Focus.t))=?,
        ~onClick: option(ReasonReact.Callback.t(ReactEventRe.Mouse.t))=?,
        ~onContextMenu: option(ReasonReact.Callback.t(ReactEventRe.Mouse.t))=?,
        ~onDoubleClick: option(ReasonReact.Callback.t(ReactEventRe.Mouse.t))=?,
        ~onDrag: option(ReasonReact.Callback.t(ReactEventRe.Mouse.t))=?,
        ~onDragEnd: option(ReasonReact.Callback.t(ReactEventRe.Mouse.t))=?,
        ~onDragEnter: option(ReasonReact.Callback.t(ReactEventRe.Mouse.t))=?,
        ~onDragExit: option(ReasonReact.Callback.t(ReactEventRe.Mouse.t))=?,
        ~onDragLeave: option(ReasonReact.Callback.t(ReactEventRe.Mouse.t))=?,
        ~onDragOver: option(ReasonReact.Callback.t(ReactEventRe.Mouse.t))=?,
        ~onDragStart: option(ReasonReact.Callback.t(ReactEventRe.Mouse.t))=?,
        ~onDrop: option(ReasonReact.Callback.t(ReactEventRe.Mouse.t))=?,
        ~onFocus: option(ReasonReact.Callback.t(ReactEventRe.Focus.t))=?,
        ~onKeyDown: option(ReasonReact.Callback.t(ReactEventRe.Keyboard.t))=?,
        ~onKeyPress: option(ReasonReact.Callback.t(ReactEventRe.Keyboard.t))=?,
        ~onKeyUp: option(ReasonReact.Callback.t(ReactEventRe.Keyboard.t))=?,
        ~onMouseDown: option(ReasonReact.Callback.t(ReactEventRe.Mouse.t))=?,
        ~onMouseEnter: option(ReasonReact.Callback.t(ReactEventRe.Mouse.t))=?,
        ~onMouseLeave: option(ReasonReact.Callback.t(ReactEventRe.Mouse.t))=?,
        ~onMouseMove: option(ReasonReact.Callback.t(ReactEventRe.Mouse.t))=?,
        ~onMouseOut: option(ReasonReact.Callback.t(ReactEventRe.Mouse.t))=?,
        ~onMouseOver: option(ReasonReact.Callback.t(ReactEventRe.Mouse.t))=?,
        ~onMouseUp: option(ReasonReact.Callback.t(ReactEventRe.Mouse.t))=?,
        ~onTouchCancel: option(ReasonReact.Callback.t(ReactEventRe.Touch.t))=?,
        ~onTouchEnd: option(ReasonReact.Callback.t(ReactEventRe.Touch.t))=?,
        ~onTouchMove: option(ReasonReact.Callback.t(ReactEventRe.Touch.t))=?,
        ~onTouchStart: option(ReasonReact.Callback.t(ReactEventRe.Touch.t))=?,
        ~onChange: option(((float, ReactEventRe.Mouse.t) => unit))=?,
        children
      ) =>
    ReasonReact.wrapJsForReason(
      ~reactClass,
      ~props={
        "defaultValue": Js.Nullable.from_opt(defaultValue),
        "disabled": Js.Nullable.from_opt(optionMap(Js.Boolean.to_js_boolean, disabled)),
        "max": Js.Nullable.from_opt(max),
        "min": Js.Nullable.from_opt(min),
        "precision": Js.Nullable.from_opt(precision),
        "size": Js.Nullable.from_opt(size),
        "step": Js.Nullable.from_opt(step),
        "value": Js.Nullable.from_opt(value),
        "onBlur": Js.Nullable.from_opt(onBlur),
        "onClick": Js.Nullable.from_opt(onClick),
        "onContextMenu": Js.Nullable.from_opt(onContextMenu),
        "onDoubleClick": Js.Nullable.from_opt(onDoubleClick),
        "onDrag": Js.Nullable.from_opt(onDrag),
        "onDragEnd": Js.Nullable.from_opt(onDragEnd),
        "onDragEnter": Js.Nullable.from_opt(onDragEnter),
        "onDragExit": Js.Nullable.from_opt(onDragExit),
        "onDragLeave": Js.Nullable.from_opt(onDragLeave),
        "onDragOver": Js.Nullable.from_opt(onDragOver),
        "onDragStart": Js.Nullable.from_opt(onDragStart),
        "onDrop": Js.Nullable.from_opt(onDrop),
        "onFocus": Js.Nullable.from_opt(onFocus),
        "onKeyDown": Js.Nullable.from_opt(onKeyDown),
        "onKeyPress": Js.Nullable.from_opt(onKeyPress),
        "onKeyUp": Js.Nullable.from_opt(onKeyUp),
        "onMouseDown": Js.Nullable.from_opt(onMouseDown),
        "onMouseEnter": Js.Nullable.from_opt(onMouseEnter),
        "onMouseLeave": Js.Nullable.from_opt(onMouseLeave),
        "onMouseMove": Js.Nullable.from_opt(onMouseMove),
        "onMouseOut": Js.Nullable.from_opt(onMouseOut),
        "onMouseOver": Js.Nullable.from_opt(onMouseOver),
        "onMouseUp": Js.Nullable.from_opt(onMouseUp),
        "onTouchCancel": Js.Nullable.from_opt(onTouchCancel),
        "onTouchEnd": Js.Nullable.from_opt(onTouchEnd),
        "onTouchMove": Js.Nullable.from_opt(onTouchMove),
        "onTouchStart": Js.Nullable.from_opt(onTouchStart),
        "onChange": Js.Nullable.from_opt(onChange)
      },
      children
    );
};