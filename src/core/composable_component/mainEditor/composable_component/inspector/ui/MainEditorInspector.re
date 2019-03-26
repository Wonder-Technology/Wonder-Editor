open WidgetType;

open TreeAssetType;

type retainedProps = {updateTypeArr: UpdateStore.updateComponentTypeArr};

module Method = {
  let showInspectorBySourceType =
      (
        (uiState, dispatchFunc),
        addableComponentConfig,
        (currentSelectSource, currentSceneTreeNode, currentNode),
      ) =>
    switch (currentSelectSource) {
    | None => ReasonReact.null
    | Some(SceneTree) =>
      <SceneTreeInspector
        uiState
        dispatchFunc
        addableComponentConfig
        currentSceneTreeNode
      />
    | Some(Asset) =>
      switch (currentNode) {
      | None => ReasonReact.null
      | Some(currentNode) =>
        <AssetTreeInspector
          key={DomHelper.getRandomKey()}
          uiState
          dispatchFunc
          currentNode
        />
      }
    };
};

let component =
  ReasonReact.statelessComponentWithRetainedProps("MainEditorInspector");

let render = ((uiState, dispatchFunc), addableComponentConfig, _self) => {
  let editorState = StateEditorService.getState();

  <article key="inspector" className="wonder-inspector-component">
    {
      Method.showInspectorBySourceType(
        (uiState, dispatchFunc),
        addableComponentConfig,
        (
          CurrentSelectSourceEditorService.getCurrentSelectSource(editorState),
          SceneTreeEditorService.getCurrentSceneTreeNode(editorState),
          OperateTreeAssetEditorService.getCurrentNode(editorState),
        ),
      )
    }
    <canvas id="asset-canvas" key="assetCanvas" />
  </article>;
};

let shouldUpdate =
    ({newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) =>
  newSelf.retainedProps.updateTypeArr
  |> StoreUtils.shouldComponentUpdate(UpdateStore.Inspector);

let make =
    (
      ~uiState: AppStore.appState,
      ~dispatchFunc,
      ~addableComponentConfig,
      _children,
    ) => {
  ...component,
  retainedProps: {
    updateTypeArr: StoreUtils.getUpdateComponentTypeArr(uiState),
  },
  shouldUpdate,
  render: self =>
    render((uiState, dispatchFunc), addableComponentConfig, self),
  didUpdate: self => {
    let assetCanvas = DomHelper.getElementById("asset-canvas");
    let editorState = StateEditorService.getState();

    Js.log("did update");

    switch (
      CurrentSelectSourceEditorService.getCurrentSelectSource(editorState)
    ) {
    | None
    | Some(SceneTree) => DomHelper.hideCanvas(assetCanvas)
    | Some(Asset) =>
      switch (OperateTreeAssetEditorService.getCurrentNode(editorState)) {
      | None => DomHelper.hideCanvas(assetCanvas)
      | Some(currentNode) =>
        switch (currentNode) {
        | TextureNode(nodeId, textureNodeData) =>
          DomHelper.hideCanvas(assetCanvas)
        | FolderNode(nodeId, folderNodeData, children) =>
          DomHelper.hideCanvas(assetCanvas)
        | MaterialNode(nodeId, materialNodeData) =>
          DomHelper.showCanvas(assetCanvas)
        | WDBNode(nodeId, wdbNodeData) => DomHelper.showCanvas(assetCanvas)
        }
      }
    };
  },
};