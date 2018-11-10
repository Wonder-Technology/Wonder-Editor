let component = ReasonReact.statelessComponent("MainEditorLeftComponents");

let render = ((store, dispatchFunc), _self) =>
  <article
    key="MainEditorLeftComponents"
    className="inline-component wonder-left-components">
    <MainEditorLeftHeader store dispatchFunc />
    <MainEditorSceneTree store dispatchFunc />
  </article>;

let make = (~store, ~dispatchFunc, _children) => {
  ...component,
  render: self => render((store, dispatchFunc), self),
};