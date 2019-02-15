module Method = {
  let reNameGameObjectBlurEvent =
      ((uiState, dispatchFunc), gameObject, newName) =>
    GameObjectEngineService.unsafeGetGameObjectName(gameObject)
    |> StateLogicService.getEngineStateToGetData
    |> ValueService.isValueEqual(ValueType.String, newName) ?
      () :
      SceneTreeNodeRenameEventHandlder.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
        (uiState, dispatchFunc),
        gameObject,
        newName,
      );

  let _buildNameFunc = ((uiState, dispatchFunc), gameObject) =>
    <div key=(DomHelper.getRandomKey()) className="sceneTree-name">
      <StringInput
        label="Name"
        defaultValue=(
          GameObjectEngineService.unsafeGetGameObjectName(gameObject)
          |> StateLogicService.getEngineStateToGetData
        )
        onBlur=(
          reNameGameObjectBlurEvent((uiState, dispatchFunc), gameObject)
        )
        canBeNull=false
      />
    </div>;

  let _buildGameObjectAllShowComponent =
      ((uiState, dispatchFunc), gameObject, componentTypeArr) =>
    componentTypeArr
    |> Js.Array.map((componentType: InspectorComponentType.componentType) =>
         InspectorGameObjectUtils.buildComponentUIComponent(
           (uiState, dispatchFunc),
           componentType,
           gameObject,
         )
       );

  let buildCurrentSceneTreeNodeComponent =
      ((uiState, dispatchFunc), addableComponentConfig, currentSceneTreeNode) =>
    switch (currentSceneTreeNode) {
    | None => [||]
    | Some(gameObject) =>
      [|_buildNameFunc((uiState, dispatchFunc), gameObject)|]
      |> Js.Array.concat(
           StateEditorService.getState()
           |> InspectorEditorService.getComponentTypeMap
           |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(gameObject)
           |> _buildGameObjectAllShowComponent(
                (uiState, dispatchFunc),
                gameObject,
              ),
         )
      |> ArrayService.push(
           <AddableComponent
             key=(DomHelper.getRandomKey())
             reduxTuple=(uiState, dispatchFunc)
             currentSceneTreeNode=gameObject
             addableComponentList=addableComponentConfig
           />,
         )
    };
};

let component = ReasonReact.statelessComponent("SceneTreeInspector");

let render =
    (
      (uiState, dispatchFunc),
      addableComponentConfig,
      currentSceneTreeNode,
      _self,
    ) =>
  <article key="SceneTreeInspector" className="wonder-inspector-sceneTree">
    (
      ReasonReact.array(
        Method.buildCurrentSceneTreeNodeComponent(
          (uiState, dispatchFunc),
          addableComponentConfig,
          currentSceneTreeNode,
        ),
      )
    )
  </article>;

let make =
    (
      ~uiState: AppStore.appState,
      ~dispatchFunc,
      ~addableComponentConfig,
      ~currentSceneTreeNode,
      _children,
    ) => {
  ...component,
  render: self =>
    render(
      (uiState, dispatchFunc),
      addableComponentConfig,
      currentSceneTreeNode,
      self,
    ),
};