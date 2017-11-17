open DomHelper;

let buildNumberInput = (label, defaultValue, onChange) =>
  <NumberInput ?label ?defaultValue ?onChange />;

let buildMainEditor = (state, dispatch) => <MainEditor state dispatch />;

let buildButton = (text, onClick) => <button ?onClick> (textEl(text)) </button>;

let buildErrText = () => <div> (textEl("this is error")) </div>;