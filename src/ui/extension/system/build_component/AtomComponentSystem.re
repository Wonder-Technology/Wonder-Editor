open DomHelper;

let buildFloatInput = (label, defaultValue, onChange) =>
  <FloatInput ?label ?defaultValue ?onChange />;

let buildButton = (text, onClick) =>
  switch text {
  | None =>
    WonderCommonlib.LogUtils.warn({j|button component:the text is empty|j});
    ReasonReact.nullElement
  | Some(value) => <button> (textEl(value)) </button>
  };

let buildDiv = (text) =>
  switch text {
  | None =>
    WonderCommonlib.LogUtils.warn({j|div component:the text is empty|j});
    ReasonReact.nullElement
  | Some(value) => <div key=(getRandomKey())> (textEl(value)) </div>
  };