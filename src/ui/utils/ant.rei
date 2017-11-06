module Button: {
     let make:
       (
         ~ghost: bool=?,
         ~htmlType: string=?,
         ~icon: string=?,
         ~loading: bool=?,
         ~shape: string=?,
         ~size: string=?,
         ~onClick: ReasonReact.Callback.t(ReactEventRe.Mouse.t)=?,
         ~_type: string=?,
         array(ReasonReact.reactElement)
       ) =>
       ReasonReact.component(
         ReasonReact.stateless,
         ReasonReact.noRetainedProps,
         ReasonReact.actionless
       );
   };

module InputNumber: {
     let make:
       (
         ~defaultValue: float=?,
         ~disabled: bool=?,
         ~max: float=?,
         ~min: float=?,
         ~precision: float=?,
         ~size: string=?,
         ~step: float=?,
         ~value: float=?,
         ~onBlur: ReasonReact.Callback.t(ReactEventRe.Focus.t)=?,
         ~onClick: ReasonReact.Callback.t(ReactEventRe.Mouse.t)=?,
         ~onContextMenu: ReasonReact.Callback.t(ReactEventRe.Mouse.t)=?,
         ~onDoubleClick: ReasonReact.Callback.t(ReactEventRe.Mouse.t)=?,
         ~onDrag: ReasonReact.Callback.t(ReactEventRe.Mouse.t)=?,
         ~onDragEnd: ReasonReact.Callback.t(ReactEventRe.Mouse.t)=?,
         ~onDragEnter: ReasonReact.Callback.t(ReactEventRe.Mouse.t)=?,
         ~onDragExit: ReasonReact.Callback.t(ReactEventRe.Mouse.t)=?,
         ~onDragLeave: ReasonReact.Callback.t(ReactEventRe.Mouse.t)=?,
         ~onDragOver: ReasonReact.Callback.t(ReactEventRe.Mouse.t)=?,
         ~onDragStart: ReasonReact.Callback.t(ReactEventRe.Mouse.t)=?,
         ~onDrop: ReasonReact.Callback.t(ReactEventRe.Mouse.t)=?,
         ~onFocus: ReasonReact.Callback.t(ReactEventRe.Focus.t)=?,
         ~onKeyDown: ReasonReact.Callback.t(ReactEventRe.Keyboard.t)=?,
         ~onKeyPress: ReasonReact.Callback.t(ReactEventRe.Keyboard.t)=?,
         ~onKeyUp: ReasonReact.Callback.t(ReactEventRe.Keyboard.t)=?,
         ~onMouseDown: ReasonReact.Callback.t(ReactEventRe.Mouse.t)=?,
         ~onMouseEnter: ReasonReact.Callback.t(ReactEventRe.Mouse.t)=?,
         ~onMouseLeave: ReasonReact.Callback.t(ReactEventRe.Mouse.t)=?,
         ~onMouseMove: ReasonReact.Callback.t(ReactEventRe.Mouse.t)=?,
         ~onMouseOut: ReasonReact.Callback.t(ReactEventRe.Mouse.t)=?,
         ~onMouseOver: ReasonReact.Callback.t(ReactEventRe.Mouse.t)=?,
         ~onMouseUp: ReasonReact.Callback.t(ReactEventRe.Mouse.t)=?,
         ~onTouchCancel: ReasonReact.Callback.t(ReactEventRe.Touch.t)=?,
         ~onTouchEnd: ReasonReact.Callback.t(ReactEventRe.Touch.t)=?,
         ~onTouchMove: ReasonReact.Callback.t(ReactEventRe.Touch.t)=?,
         ~onTouchStart: ReasonReact.Callback.t(ReactEventRe.Touch.t)=?,
         ~onChange: (float, ReactEventRe.Mouse.t) => unit=?,
         array(ReasonReact.reactElement)
       ) =>
       ReasonReact.component(
         ReasonReact.stateless,
         ReasonReact.noRetainedProps,
         ReasonReact.actionless
       );
   };
