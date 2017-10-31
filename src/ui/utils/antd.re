/* let optionMap = (fn, option) =>
     switch option {
     | Some(value) => Some(fn(value))
     | None => None
     };

   module Button = {
     [@bs.module "antd/lib/button"] external reactClass : ReasonReact.reactClass = "Button";
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
   }; */
