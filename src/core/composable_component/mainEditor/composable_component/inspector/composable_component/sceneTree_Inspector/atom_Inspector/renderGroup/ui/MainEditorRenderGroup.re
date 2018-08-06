let component = ReasonReact.statelessComponent("MainEditorRenderGroup");

let render = ((store, dispatchFunc), _self) =>
  <article key="MainEditorRenderGroup" className="wonder-render-group">
    <div className="">
      <div className=""> (DomHelper.textEl("MeshRender : ")) </div>
      <MainEditorMeshRenderer store dispatchFunc />
    </div>
    <hr />
    <div className="">
      <div className=""> (DomHelper.textEl("Material : ")) </div>
      <MainEditorMaterial store dispatchFunc />
    </div>
  </article>;

let make = (~store, ~dispatchFunc, _children) => {
  ...component,
  render: self => render((store, dispatchFunc), self),
};