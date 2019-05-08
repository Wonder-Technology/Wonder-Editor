let component = ReasonReact.statelessComponent("MainEditorScript");

let render = ((uiState, dispatchFunc), script, self) =>
  <article key="MainEditorScript" className="wonder-inspector-script">
    <MainEditorScriptEventFunction uiState dispatchFunc script />
    <MainEditorScriptAttribute uiState dispatchFunc script />
  </article>;

let make = (~uiState, ~dispatchFunc, ~script, _children) => {
  ...component,
  render: self => render((uiState, dispatchFunc), script, self),
};