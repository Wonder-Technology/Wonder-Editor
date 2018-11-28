let component = ReasonReact.statelessComponent("MainEditorRenderGroup");

let render = ((store, dispatchFunc), currentSceneTreeNode, _self) =>
  <article key="MainEditorRenderGroup" className="wonder-render-group">
    <div className="inspector-component">
      <div className="component-title">
        (DomHelper.textEl("MeshRender"))
      </div>
      <hr />
      <div className="component-content">
        <MainEditorMeshRenderer store dispatchFunc />
      </div>
    </div>
    <div className="inspector-component">
      <div className="component-title"> (DomHelper.textEl("Material")) </div>
      <hr />
      <div className="component-content">
        <MainEditorMaterial store dispatchFunc currentSceneTreeNode />
      </div>
    </div>
  </article>;

let make = (~store, ~dispatchFunc, ~currentSceneTreeNode, _children) => {
  ...component,
  render: self => render((store, dispatchFunc), currentSceneTreeNode, self),
};