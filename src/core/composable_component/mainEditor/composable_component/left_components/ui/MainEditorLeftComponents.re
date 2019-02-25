let component = ReasonReact.statelessComponent("MainEditorLeftComponents");

let render = ((uiState, dispatchFunc), _self) =>
  <article
    key="MainEditorLeftComponents"
    className="inline-component wonder-left-components">
    <MainEditorLeftHeader uiState dispatchFunc />
    <MainEditorSceneTree uiState dispatchFunc />
  </article>;

let make = (~uiState, ~dispatchFunc, _children) => {
  ...component,
  render: self => render((uiState, dispatchFunc), self),
};