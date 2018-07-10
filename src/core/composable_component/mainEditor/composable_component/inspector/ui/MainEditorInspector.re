open EditorType;
open CurrentNodeDataType;

Css.importCss("./css/mainEditorInspector.css");

/* todo should add currentColorData field */
type retainedProps = {
  currentTransformData: option((string, string, string)),
  currentTextureMapData: option(int),
  currentSelectSource: option(sourceType),
  currentSceneTreeNode: option(Wonderjs.GameObjectType.gameObject),
  currentSceneTreeNodeName: option(string),
  currentNodeData: option(currentNodeDataType),
};

module Method = {
  let showInspectorBySourceType =
      (
        (store, dispatchFunc),
        allShowComponentConfig,
        (currentSelectSource, currentSceneTreeNode, currentNodeData),
      ) =>
    switch (currentSelectSource) {
    | None => ReasonReact.nullElement
    | Some(SceneTree) =>
      <SceneTreeInspector
        store
        dispatchFunc
        allShowComponentConfig
        currentSceneTreeNode
      />
    | Some(Asset) =>
      switch (currentNodeData) {
      | None => ReasonReact.nullElement
      | Some({currentNodeId, nodeType}) =>
        <AssetTreeInspector
          key=(DomHelper.getRandomKey())
          store
          dispatchFunc
          currentNodeId
          nodeType
        />
      }
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
          self.retainedProps.currentNodeData,
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
    let assetState = StateAssetService.getState();
    let engineStateToGetData = StateLogicService.getRunEngineState();

    let currentSceneTreeNode =
      SceneEditorService.getCurrentSceneTreeNode(editorState);
    {
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
      currentSceneTreeNodeName:
        switch (currentSceneTreeNode) {
        | None => None
        | Some(gameObject) =>
          GameObjectEngineService.unsafeGetGameObjectName(gameObject)
          |> StateLogicService.getEngineStateToGetData
          |. Some
        },
      currentNodeData:
        CurrentNodeDataAssetService.getCurrentNodeData(assetState),
    };
  },
  shouldUpdate,
  render: self =>
    render((store, dispatchFunc), allShowComponentConfig, self),
};