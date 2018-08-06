open DiffType;

open InspectorComponentType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = Wonderjs.GameObjectType.gameObject;
  type dataTuple = componentType;

  let _isLightComponent = type_ => type_ === Light;

  let _isCameraComponent = type_ => type_ === CameraGroup;

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

    _isCameraComponent(type_) ?
      editEngineState
      |> CameraEngineService.getEditEngineStateEditCamera
      |. GameObjectComponentEngineService.getBasicCameraViewComponent(
           editEngineState,
         )
      |. BasicCameraViewEngineService.activeBasicCameraView(editEngineState)
      /* |> GameObjectEngineService.initGameObject(currentSceneTreeNode) */
      |> StateLogicService.setEditEngineState :
      editEngineState
      /* |> GameObjectEngineService.initGameObject(currentSceneTreeNode) */
      |> StateLogicService.setEditEngineState;

    let (editorStateForComponent, runEngineState) =
      InspectorAddComponentUtils.addComponentByType(
        type_,
        currentSceneTreeNode,
        (editorState |. Some, StateLogicService.getRunEngineState()),
      );

    runEngineState
    /* |> GameObjectEngineService.initGameObject(currentSceneTreeNode) */
    |> StateLogicService.setRunEngineState;

    switch (editorStateForComponent) {
    | None => editorState |> StateEditorService.setState |> ignore
    | Some(editorState) =>
      editorState |> StateEditorService.setState |> ignore
    };

    _isLightComponent(type_) ?
      OperateLightMaterialLogicService.reInitAllMaterials() : ();

    /* TODO add test */
    GameObjectEngineService.initGameObject
    /* |> StateLogicService.getAndSetEditAndRunEngineState ; */
    |> StateLogicService.getAndSetEngineStateWithDiff([|
         {arguments: [|currentSceneTreeNode|], type_: GameObject},
       |]);

    StateLogicService.refreshEditAndRunEngineState();

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Inspector|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);