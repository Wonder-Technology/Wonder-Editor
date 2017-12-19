open DomHelper;

let buildFloatInput = (label, defaultValue, onChange) =>
  <FloatInput ?label ?defaultValue ?onChange />;

let buildButton = (text, onClick) =>
  switch text {
  | None => ExcepetionHandleSystem.throwMessage({j|button:the text is empty|j})
  | Some(value) => <button> (textEl(value)) </button>
  };

let buildDiv = (text) =>
  switch text {
  | None => ExcepetionHandleSystem.throwMessage({j|div:the text is empty|j})
  | Some(value) => <div key=(getRandomKey())> (textEl(value)) </div>
  };