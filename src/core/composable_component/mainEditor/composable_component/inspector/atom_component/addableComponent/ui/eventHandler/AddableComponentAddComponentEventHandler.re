open DiffType;

open InspectorComponentType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = Wonderjs.GameObjectType.gameObject;
  type dataTuple = componentType;

  let _isLightComponent = type_ => type_ === Light;

  let _isCameraGroup = type_ => type_ === CameraGroup;

  let _handleRunAddCameraGroup = (type_, currentSceneTreeNode, runEngineState) =>
    _isCameraGroup(type_) ?
      {
        let runEngineState =
          runEngineState
          |> BasicCameraViewEngineService.activeBasicCameraView(
               GameObjectComponentEngineService.getBasicCameraViewComponent(
                 currentSceneTreeNode,
                 runEngineState,
               ),
             );

        SceneEditorService.getIsRun |> StateLogicService.getEditorState ?
          ArcballCameraEngineService.bindArcballCameraControllerEventIfHasComponent(
            currentSceneTreeNode,
            runEngineState,
          ) :
          runEngineState;
      } :
      runEngineState;

  let _bindArcballCameraEventIfHasActiveCameraGroup =
      (currentSceneTreeNode, runEngineState) =>
    runEngineState |> CameraEngineService.hasCameraGroup(currentSceneTreeNode) ?
      BasicCameraViewEngineService.isActiveBasicCameraView(
        GameObjectComponentEngineService.getBasicCameraViewComponent(
          currentSceneTreeNode,
          runEngineState,
        ),
        runEngineState,
      ) ?
        ArcballCameraEngineService.bindArcballCameraControllerEventIfHasComponent(
          currentSceneTreeNode,
          runEngineState,
        ) :
        runEngineState :
      runEngineState;

  let _handleRunAddArcballCameraController =
      (type_, currentSceneTreeNode, runEngineState) =>
    SceneEditorService.getIsRun
    |> StateLogicService.getEditorState
    && type_ === ArcballCameraController ?
      _bindArcballCameraEventIfHasActiveCameraGroup(
        currentSceneTreeNode,
        runEngineState,
      ) :
      runEngineState;

  let handleSelfLogic = ((store, dispatchFunc), currentSceneTreeNode, type_) => {
    let editorState = StateEditorService.getState();

    let (_editorState, editEngineState) =
      InspectorAddComponentUtils.addComponentByType(
        type_,
        StateLogicService.getEditEngineComponent(
          DiffType.GameObject,
          currentSceneTreeNode,
        ),
        (None, StateLogicService.getEditEngineState()),
      );

    editEngineState |> StateLogicService.setEditEngineState;

    let (editorStateForComponent, runEngineState) =
      InspectorAddComponentUtils.addComponentByType(
        type_,
        currentSceneTreeNode,
        (editorState |. Some, StateLogicService.getRunEngineState()),
      );

      /* TODO move to addComponentByTypeForEditEngineState, xxx */
    runEngineState
    |> _handleRunAddArcballCameraController(type_, currentSceneTreeNode)
    |> _handleRunAddCameraGroup(type_, currentSceneTreeNode)
    |> StateLogicService.setRunEngineState;




    switch (editorStateForComponent) {
    | None => editorState |> StateEditorService.setState |> ignore
    | Some(editorState) =>
      editorState |> StateEditorService.setState |> ignore
    };

      /* TODO move to addComponentByTypeForEditEngineState, xxx */
    _isLightComponent(type_) ?
      OperateLightMaterialLogicService.reInitAllMaterials() : ();

    GameObjectEngineService.initGameObject
    |> StateLogicService.getAndSetEngineStateWithDiff([|
         {arguments: [|currentSceneTreeNode|], type_: GameObject},
       |]);






    StateLogicService.refreshEditAndRunEngineState();

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Inspector|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);