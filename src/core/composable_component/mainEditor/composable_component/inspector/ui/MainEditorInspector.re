open WidgetType;

type retainedProps = {updateTypeArr: UpdateStore.updateComponentTypeArr};

module Method = {
  let showInspectorBySourceType =
      (
        (store, dispatchFunc),
        addableComponentConfig,
        (currentSelectSource, currentSceneTreeNode, currentNode),
      ) =>
    switch (currentSelectSource) {
    | None => ReasonReact.null
    | Some(SceneTree) =>
      <SceneTreeInspector
        store
        dispatchFunc
        addableComponentConfig
        currentSceneTreeNode
      />
    | Some(Asset) =>
      switch (currentNode) {
      | None => ReasonReact.null
      | Some(currentNode) =>
        <AssetTreeInspector
          key=(DomHelper.getRandomKey())
          store
          dispatchFunc
          currentNode
        />
      }
    };
};

let component =
  ReasonReact.statelessComponentWithRetainedProps("MainEditorInspector");

let render = ((store, dispatchFunc), addableComponentConfig, _self) => {
  let editorState = StateEditorService.getState();
  <article key="inspector" className="wonder-inspector-component">
    (
      Method.showInspectorBySourceType(
        (store, dispatchFunc),
        addableComponentConfig,
        (
          CurrentSelectSourceEditorService.getCurrentSelectSource(editorState),
          SceneEditorService.getCurrentSceneTreeNode(editorState),
          OperateTreeAssetEditorService.getCurrentNode(editorState),
        ),
      )
    )
  </article>;
};

let shouldUpdate =
    ({newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) =>
  newSelf.retainedProps.updateTypeArr
  |> StoreUtils.shouldComponentUpdate(UpdateStore.Inspector);

let make =
    (
      ~store: AppStore.appState,
      ~dispatchFunc,
      ~addableComponentConfig,
      _children,
    ) => {
  ...component,
  retainedProps: {
    updateTypeArr: StoreUtils.getUpdateComponentTypeArr(store),
  },
  shouldUpdate,
  render: self =>
    render((store, dispatchFunc), addableComponentConfig, self),
};