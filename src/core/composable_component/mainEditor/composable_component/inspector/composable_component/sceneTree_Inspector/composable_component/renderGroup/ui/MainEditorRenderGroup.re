let component = ReasonReact.statelessComponent("MainEditorRenderGroup");

let render = ((uiState, dispatchFunc), currentSceneTreeNode, _self) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <article key="MainEditorRenderGroup" className="wonder-render-group">
    <div className="inspector-component">
      <div
        className="component-title"
        title={
          LanguageUtils.getInspectorLanguageDataByType(
            "mesh-render-describe",
            languageType,
          )
        }>
        {DomHelper.textEl("Mesh Render")}
      </div>
      <hr />
      <div className="component-content">
        <MainEditorMeshRenderer uiState dispatchFunc />
      </div>
    </div>
    <div className="inspector-component">
      <div
        className="component-title"
        title={
          LanguageUtils.getInspectorLanguageDataByType(
            "material-describe",
            languageType,
          )
        }>
        {DomHelper.textEl("Material")}
      </div>
      <hr />
      <div className="component-content">
        <MainEditorMaterial uiState dispatchFunc currentSceneTreeNode />
      </div>
    </div>
  </article>;
};

let make = (~uiState, ~dispatchFunc, ~currentSceneTreeNode, _children) => {
  ...component,
  render: self =>
    render((uiState, dispatchFunc), currentSceneTreeNode, self),
};