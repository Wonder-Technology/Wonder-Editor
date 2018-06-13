open EditorType;

type retainedProps = {
  currentTransformData: option((string, string, string)),
  currentSelectSource: option(sourceType),
  currentSceneTreeNode: option(Wonderjs.GameObjectType.gameObject),
  currentNodeId: option(int),
};

module Method = {
  let showInspectorBySourceType =
      (
        (store, dispatchFunc),
        allShowComponentConfig,
        (currentSelectSource, currentSceneTreeNode, currentNodeId),
      ) => {
    let editorState = StateEditorService.getState();
    switch (currentSelectSource) {
    | None => ReasonReact.nullElement
    | Some(SceneTree) =>
      <SceneTreeInspector
        store
        dispatchFunc
        allShowComponentConfig
        currentSceneTreeNode
      />
    | Some(AssetTree) =>
      switch (currentNodeId) {
      | None => ReasonReact.nullElement
      | Some(nodeId) =>
        <AssetTreeInspector
          key=(DomHelper.getRandomKey())
          store
          dispatchFunc
          nodeId
          nodeResult=(
            editorState
            |> AssetNodeMapEditorService.unsafeGetNodeMap
            |> WonderCommonlib.SparseMapService.unsafeGet(nodeId)
          )
        />
      }
    };
  };
};

let component =
  ReasonReact.statelessComponentWithRetainedProps("MainEditorInspector");

let render =
    (
      (store, dispatchFunc),
      allShowComponentConfig,
      self: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article key="inspector" className="wonder-inspector-component">
    (
      Method.showInspectorBySourceType(
        (store, dispatchFunc),
        allShowComponentConfig,
        (
          self.retainedProps.currentSelectSource,
          self.retainedProps.currentSceneTreeNode,
          self.retainedProps.currentNodeId,
        ),
      )
    )
  </article>;

let shouldUpdate =
    ({oldSelf, newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) =>
  oldSelf.retainedProps != newSelf.retainedProps;

let make =
    (
      ~store: AppStore.appState,
      ~dispatchFunc,
      ~allShowComponentConfig,
      _children,
    ) => {
  ...component,
  retainedProps: {
    let currentSceneTreeNode =
      SceneEditorService.getCurrentSceneTreeNode
      |> StateLogicService.getEditorState;
    {
      currentTransformData:
        switch (currentSceneTreeNode) {
        | None => None
        | Some(gameObject) =>
          TransformUtils.getCurrentTransformData(
            GameObjectComponentEngineService.getTransformComponent(gameObject)
            |> StateLogicService.getEngineStateToGetData,
          )
          |. Some
        },
      currentSelectSource:
        CurrentSelectSourceEditorService.getCurrentSelectSource
        |> StateLogicService.getEditorState,
      currentSceneTreeNode,
      currentNodeId:
        AssetCurrentNodeIdEditorService.getCurrentNodeId
        |> StateLogicService.getEditorState,
    };
  },
  shouldUpdate,
  render: self =>
    render((store, dispatchFunc), allShowComponentConfig, self),
};