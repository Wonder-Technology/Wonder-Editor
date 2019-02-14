let component = ReasonReact.statelessComponent("MainEditorRenderGroup");

let render = ((uiState, dispatchFunc), currentSceneTreeNode, _self) =>
  <article key="MainEditorRenderGroup" className="wonder-render-group">
    <div className="inspector-component">
      <div className="component-title">
        (DomHelper.textEl("MeshRender"))
      </div>
      <hr />
      <div className="component-content">
        <MainEditorMeshRenderer uiState dispatchFunc />
      </div>
    </div>
    <div className="inspector-component">
      <div className="component-title"> (DomHelper.textEl("Material")) </div>
      <hr />
      <div className="component-content">
        <MainEditorMaterial uiState dispatchFunc currentSceneTreeNode />
      </div>
    </div>
  </article>;

let make = (~uiState, ~dispatchFunc, ~currentSceneTreeNode, _children) => {
  ...component,
  render: self => render((uiState, dispatchFunc), currentSceneTreeNode, self),
};