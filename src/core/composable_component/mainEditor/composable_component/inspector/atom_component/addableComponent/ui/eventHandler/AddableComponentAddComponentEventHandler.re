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
      |> StateLogicService.setEditEngineState :
      editEngineState |> StateLogicService.setEditEngineState;

    let (editorStateForComponent, runEngineState) =
      InspectorAddComponentUtils.addComponentByType(
        type_,
        currentSceneTreeNode,
        (editorState |. Some, StateLogicService.getRunEngineState()),
      );

    runEngineState |> StateLogicService.setRunEngineState;

    switch (editorStateForComponent) {
    | None => editorState |> StateEditorService.setState |> ignore
    | Some(editorState) =>
      editorState |> StateEditorService.setState |> ignore
    };

    _isLightComponent(type_) ?
      OperateLightMaterialLogicService.reInitAllMaterials() : ();

    StateLogicService.refreshEditAndRunEngineState();

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Inspector|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);