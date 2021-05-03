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

  let _buildNameFunc = ((uiState, dispatchFunc), gameObject, languageType) =>
    <div key={DomHelper.getRandomKey()} className="sceneTree-name">
      <StringInput
        label="Name"
        title={
          LanguageUtils.getInspectorLanguageDataByType(
            "name-describe",
            languageType,
          )
        }
        defaultValue={
          GameObjectEngineService.unsafeGetGameObjectName(gameObject)
          |> StateLogicService.getEngineStateToGetData
        }
        onBlur={
          reNameGameObjectBlurEvent((uiState, dispatchFunc), gameObject)
        }
        canBeNull=true
      />
    </div>;

  let _buildGameObjectAllShowComponent =
      ((uiState, dispatchFunc), gameObject, languageType, componentTypeArr) =>
    componentTypeArr
    |> Js.Array.map((componentType: InspectorComponentType.componentType) =>
         InspectorGameObjectUtils.buildComponentUIComponent(
           (uiState, dispatchFunc),
           componentType,
           gameObject,
           languageType,
         )
       );

  let buildCurrentSceneTreeNodeComponent =
      (
        (uiState, dispatchFunc),
        addableComponentConfig,
        currentSceneTreeNode,
        languageType,
      ) =>
    switch (currentSceneTreeNode) {
    | None => [||]
    | Some(gameObject) =>
      [|_buildNameFunc((uiState, dispatchFunc), gameObject, languageType)|]
      |> Js.Array.concat(
           StateEditorService.getState()
           |> InspectorEditorService.getComponentTypeMap
           |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(gameObject)
           |> _buildGameObjectAllShowComponent(
                (uiState, dispatchFunc),
                gameObject,
                languageType,
              ),
         )
      |> ArrayService.push(
           <AddableComponent
             key={DomHelper.getRandomKey()}
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
    ) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <article key="SceneTreeInspector" className="wonder-inspector-sceneTree">
    {
      ReasonReact.array(
        Method.buildCurrentSceneTreeNodeComponent(
          (uiState, dispatchFunc),
          addableComponentConfig,
          currentSceneTreeNode,
          languageType,
        ),
      )
    }
  </article>;
};

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