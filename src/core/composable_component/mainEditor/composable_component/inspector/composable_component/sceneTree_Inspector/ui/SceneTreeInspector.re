module Method = {
  let reNameGameObjectBlurEvent =
      ((store, dispatchFunc), gameObject, newName) =>
    GameObjectEngineService.unsafeGetGameObjectName(gameObject)
    |> StateLogicService.getEngineStateToGetData
    |> ValueService.isValueEqual(ValueType.String, newName) ?
      () :
      SceneTreeNodeRenameEventHandlder.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
        (store, dispatchFunc),
        gameObject,
        newName,
      );

  let _buildNameFunc = ((store, dispatchFunc), gameObject) =>
    <div key=(DomHelper.getRandomKey()) className="sceneTree-name">
      <StringInput
        label="Name"
        defaultValue=(
          GameObjectEngineService.unsafeGetGameObjectName(gameObject)
          |> StateLogicService.getEngineStateToGetData
        )
        onBlur=(reNameGameObjectBlurEvent((store, dispatchFunc), gameObject))
        canBeNull=false
      />
    </div>;

  let _buildGameObjectAllShowComponent =
      ((store, dispatchFunc), gameObject, componentTypeArr) =>
    componentTypeArr
    |> Js.Array.map((componentType: InspectorComponentType.componentType) =>
         InspectorGameObjectUtils.buildComponentUIComponent(
           (store, dispatchFunc),
           componentType,
           gameObject,
         )
       );

  let buildCurrentSceneTreeNodeComponent =
      ((store, dispatchFunc), addableComponentConfig, currentSceneTreeNode) =>
    switch (currentSceneTreeNode) {
    | None => [||]
    | Some(gameObject)
        when
          SceneEngineService.isSceneGameObject(gameObject)
          |> StateLogicService.getEngineStateToGetData => [||]

    | Some(gameObject) =>
      [|_buildNameFunc((store, dispatchFunc), gameObject)|]
      |> Js.Array.concat(
           StateEditorService.getState()
           |> InspectorEditorService.getComponentTypeMap
           |> WonderCommonlib.SparseMapService.unsafeGet(gameObject)
           |> _buildGameObjectAllShowComponent(
                (store, dispatchFunc),
                gameObject,
              ),
         )
      |> ArrayService.push(
           <AddableComponent
             key=(DomHelper.getRandomKey())
             reduxTuple=(store, dispatchFunc)
             currentSceneTreeNode=gameObject
             addableComponentList=addableComponentConfig
           />,
         )
    };
};

let component = ReasonReact.statelessComponent("SceneTreeInspector");

let render =
    (
      (store, dispatchFunc),
      addableComponentConfig,
      currentSceneTreeNode,
      _self,
    ) =>
  <article key="SceneTreeInspector" className="wonder-inspector-sceneTree">
    (
      ReasonReact.array(
        Method.buildCurrentSceneTreeNodeComponent(
          (store, dispatchFunc),
          addableComponentConfig,
          currentSceneTreeNode,
        ),
      )
    )
  </article>;

let make =
    (
      ~store: AppStore.appState,
      ~dispatchFunc,
      ~addableComponentConfig,
      ~currentSceneTreeNode,
      _children,
    ) => {
  ...component,
  render: self =>
    render(
      (store, dispatchFunc),
      addableComponentConfig,
      currentSceneTreeNode,
      self,
    ),
};