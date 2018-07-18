let component = ReasonReact.statelessComponent("MainEditorBasicMaterial");

let render = ((store, dispatchFunc), materialComponent, slef) =>
  <article className="wonder-inspector-material">
    <MainEditorBasicMaterialColor store dispatchFunc materialComponent />
    <MainEditorBasicMaterialMap store dispatchFunc materialComponent />
  </article>;

let make =
    (~store: AppStore.appState, ~dispatchFunc, ~materialComponent, _children) => {
  ...component,
  render: self => render((store, dispatchFunc), materialComponent, self),
};