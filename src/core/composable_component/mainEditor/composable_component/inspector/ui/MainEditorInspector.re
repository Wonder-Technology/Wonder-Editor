open EditorType;

Css.importCss("./css/mainEditorInspector.css");

/* TODO should add currentColorData field */
type retainedProps = {
  currentTransformData: option((string, string, string)),
  currentTextureMapData: option(int),
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
    let editorState = StateEditorService.getState();
    let engineStateToGetData = StateLogicService.getRunEngineState();

    let currentSceneTreeNode =
      SceneEditorService.getCurrentSceneTreeNode(editorState);
    {
      /* TODO check gameObject is not Camera */
      currentTransformData:
        switch (currentSceneTreeNode) {
        | None => None
        | Some(gameObject) =>
          engineStateToGetData |> CameraEngineService.isCamera(gameObject) ?
            None :
            TransformUtils.getCurrentTransformData(
              GameObjectComponentEngineService.getTransformComponent(
                gameObject,
                engineStateToGetData,
              ),
            )
            |. Some
        },
      currentTextureMapData:
        switch (currentSceneTreeNode) {
        | None => None
        | Some(gameObject) =>
          engineStateToGetData |> CameraEngineService.isCamera(gameObject) ?
            None :
            engineStateToGetData
            |> GameObjectComponentEngineService.getBasicMaterialComponent(
                 gameObject,
               )
            |. BasicMaterialEngineService.getMap(engineStateToGetData)
        },
      currentSelectSource:
        CurrentSelectSourceEditorService.getCurrentSelectSource(editorState),
      currentSceneTreeNode,
      currentNodeId:
        AssetCurrentNodeIdEditorService.getCurrentNodeId(editorState),
    };
  },
  shouldUpdate,
  render: self =>
    render((store, dispatchFunc), allShowComponentConfig, self),
};