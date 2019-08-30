module Method = {
  let findAllBasicSourceTypeTextureNodes = editorState =>
    TextureNodeAssetEditorService.findAllBasicSourceTypeTextureNodes(
      editorState,
    );
};

let component = ReasonReact.statelessComponent("MainEditorMaterialMap");

let render =
    (
      (materialComponent, label, title, isShowTextureGroup),
      (getMapFunc, onDropFunc, removeTextureFunc),
    ) =>
  <SelectTextureNode
    label
    title={
      switch (title) {
      | None => ""
      | Some(title) => title
      }
    }
    currentTextureComponent={
      getMapFunc(materialComponent)
      |> StateLogicService.getEngineStateToGetData
    }
    removeTextureFunc={() => removeTextureFunc(materialComponent)}
    findAllTextureNodesFunc=Method.findAllBasicSourceTypeTextureNodes
    onDropFunc
    isShowTextureGroup
  />;

let make =
    (
      ~uiState: AppStore.appState,
      ~dispatchFunc,
      ~materialComponent,
      ~label,
      ~getMapFunc,
      ~onDropFunc,
      ~removeTextureFunc,
      ~isShowTextureGroup,
      ~title: option(string)=?,
      _children,
    ) => {
  ...component,
  render: _ =>
    render(
      (materialComponent, label, title, isShowTextureGroup),
      (getMapFunc, onDropFunc, removeTextureFunc),
    ),
};