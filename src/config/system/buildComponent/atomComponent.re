open DomHelper;

let buildNumberInput = (label, defaultValue, onChange) =>
  <FloatInput ?label ?defaultValue ?onChange />;

let buildButton = (text, onClick) =>{
  switch text {
  | None => ExcepetionHandleSystem.throwMessage({j|button:the text is empty|j})
  | Some(value) =>
    <Ant.Button ?onClick size="small" key=(getRandomKey()) _type="primary">
      (textEl(value))
    </Ant.Button>
  }
  };

let buildDiv = (text) =>
  switch text {
  | None => ExcepetionHandleSystem.throwMessage({j|div:the text is empty|j})
  | Some(value) => <div key=(getRandomKey()) _type="primary"> (textEl(value)) </div>
  };