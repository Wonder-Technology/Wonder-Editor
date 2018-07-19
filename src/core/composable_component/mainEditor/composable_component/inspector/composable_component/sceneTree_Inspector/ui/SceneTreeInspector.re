open DiffType;

module Method = {
  let _buildComponentBox =
      (
        (type_, component),
        (store, dispatchFunc),
        isClosable,
        buildComponentFunc,
      ) =>
    <ComponentBox
      key=(DomHelper.getRandomKey())
      header=type_
      isClosable
      gameObjectComponent=(
        buildComponentFunc((store, dispatchFunc), component)
      )
    />;
  let reNameGameObjectBlurEvent = SceneTreeNodeRenameEventHandlder.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let _buildNameFunc = ((store, dispatchFunc), gameObject) =>
    <div key=(DomHelper.getRandomKey())>
      <StringInput
        defaultValue=(
          GameObjectEngineService.unsafeGetGameObjectName(gameObject)
          |> StateLogicService.getEngineStateToGetData
        )
        onBlur=(reNameGameObjectBlurEvent((store, dispatchFunc), gameObject))
        canBeNull=false
      />
    </div>;

  let _buildTransformFunc = ((store, dispatchFunc), component) =>
    <MainEditorTransform
      key=(DomHelper.getRandomKey())
      store
      dispatchFunc
      transformComponent=component
    />;

  let _buildBasicMaterialFunc = ((store, dispatchFunc), component) =>
    <MainEditorBasicMaterial
      key=(DomHelper.getRandomKey())
      store
      dispatchFunc
      materialComponent=component
    />;

  let _buildSouceInstanceFunc = ((store, dispatchFunc), component) =>
    <div key=(DomHelper.getRandomKey())>
      (DomHelper.textEl("simulate source instance"))
    </div>;

  let _buildBasicCameraViewFunc = ((store, dispatchFunc), component) =>
    <div key=(DomHelper.getRandomKey())>
      (DomHelper.textEl("simulate basic camera view"))
    </div>;
  let _buildPerspectiveCameraProjection = ((store, dispatchFunc), component) =>
    <div key=(DomHelper.getRandomKey())>
      (DomHelper.textEl("simulate perspective camera view"))
    </div>;

  let _buildComponentUIComponent =
      ((type_, component), (store, dispatchFunc)) =>
    switch (type_) {
    | "transform" =>
      _buildTransformFunc
      |> _buildComponentBox(
           (type_, component),
           (store, dispatchFunc),
           false,
         )

    | "material" =>
      _buildBasicMaterialFunc
      |> _buildComponentBox(
           (type_, component),
           (store, dispatchFunc),
           false,
         )

    | "sourceInstance" =>
      _buildSouceInstanceFunc
      |> _buildComponentBox((type_, component), (store, dispatchFunc), true)

    | "basicCameraView" =>
      _buildBasicCameraViewFunc
      |> _buildComponentBox((type_, component), (store, dispatchFunc), true)

    | "perspectiveCameraProjection" =>
      _buildPerspectiveCameraProjection
      |> _buildComponentBox((type_, component), (store, dispatchFunc), true)

    | _ =>
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="_buildComponentUIComponent",
          ~description={j|the component: $type_ not exist|j},
          ~reason="",
          ~solution={j||j},
          ~params={j|type:$type_, component:$component|j},
        ),
      )
    };
  let _buildGameObjectAllShowComponent =
      ((store, dispatchFunc), componentList) =>
    componentList
    |> Js.List.foldLeft(
         (. componentArray, (type_, component)) =>
           componentArray
           |> ArrayService.push(
                _buildComponentUIComponent(
                  (type_, component),
                  (store, dispatchFunc),
                ),
              ),
         [||],
       );

  let buildCurrentSceneTreeNodeComponent =
      ((store, dispatchFunc), allShowComponentConfig, currentSceneTreeNode) =>
    switch (currentSceneTreeNode) {
    | None => [||]
    | Some(gameObject) =>
      let (addedComponentList, addableComponentList) =
        InspectorGameObjectUtils.buildCurrentSceneTreeNodeShowComponentList(
          gameObject,
          allShowComponentConfig,
        )
        |> StateLogicService.getEngineStateToGetData;

      _buildGameObjectAllShowComponent(
        (store, dispatchFunc),
        addedComponentList,
      )
      |> ArrayService.push(
           <AddableComponent
             key=(DomHelper.getRandomKey())
             reduxTuple=(store, dispatchFunc)
             currentSceneTreeNode=gameObject
             addableComponentList
           />,
         )
      |> ArrayService.unshift(
           _buildComponentBox(
             ("Name", gameObject),
             (store, dispatchFunc),
             false,
             _buildNameFunc,
           ),
         );
    };
};

let component = ReasonReact.statelessComponent("SceneTreeInspector");

let render =
    (
      (store, dispatchFunc),
      allShowComponentConfig,
      currentSceneTreeNode,
      _self,
    ) => {

  <article key="SceneTreeInspector" className="wonder-inspector-sceneTree">
    (
      ReasonReact.arrayToElement(
        Method.buildCurrentSceneTreeNodeComponent(
          (store, dispatchFunc),
          allShowComponentConfig,
          currentSceneTreeNode,
        ),
      )
    )
  </article>;
};

let make =
    (
      ~store: AppStore.appState,
      ~dispatchFunc,
      ~allShowComponentConfig,
      ~currentSceneTreeNode,
      _children,
    ) => {
  ...component,
  render: self =>
    render(
      (store, dispatchFunc),
      allShowComponentConfig,
      currentSceneTreeNode,
      self,
    ),
};