open DiffType;

open InspectorComponentType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = Wonderjs.GameObjectType.gameObject;
  type dataTuple = componentType;

  let _isLightComponent = type_ => type_ === Light;

  let _isCanbeRemoveCameraGroup = type_ =>
    type_ === CameraGroup ? HeaderUtils.doesSceneHasRemoveableCamera() : true;

  let _isRemoveCameraGroup = type_ => type_ === CameraGroup;
  let _isRemoveRunArcballCameraController = type_ =>
    SceneEditorService.getIsRun
    |> StateLogicService.getEditorState
    && type_ === ArcballCameraController;

  let handleSelfLogic = ((store, dispatchFunc), currentSceneTreeNode, type_) => {
    let editorState = StateEditorService.getState();

    _isCanbeRemoveCameraGroup(type_) ?
      {
        /* TODO refactor as AddableComponentAddComponentEventHandler */
        let (_editorState, editEngineState) =
          InspectorRemoveComponentUtils.removeComponentByType(
            type_,
            StateLogicService.getEditEngineComponent(
              DiffType.GameObject,
              currentSceneTreeNode,
            ),
            (None, StateLogicService.getEditEngineState()),
          );

        editEngineState |> StateLogicService.setEditEngineState;

        let runEngineState = StateLogicService.getRunEngineState();

        let runEngineState =
          _isRemoveCameraGroup(type_) ?
            runEngineState
            |> CameraEngineService.hasUnActiveCameraGroupAndSetCurrentCamera(
                 currentSceneTreeNode,
               ) :
            _isRemoveRunArcballCameraController(type_) ?
              runEngineState
              |> ArcballCameraEngineService.unbindArcballCameraControllerEventIfHasComponent(
                   currentSceneTreeNode,
                 ) :
              runEngineState;

        let (editorStateForComponent, runEngineState) =
          InspectorRemoveComponentUtils.removeComponentByType(
            type_,
            currentSceneTreeNode,
            (editorState |. Some, runEngineState),
          );

        runEngineState |> StateLogicService.setRunEngineState;

        switch (editorStateForComponent) {
        | None => editorState |> StateEditorService.setState |> ignore
        | Some(editorState) =>
          editorState |> StateEditorService.setState |> ignore
        };

        StateLogicService.refreshEditAndRunEngineState();

        _isLightComponent(type_) ?
          OperateLightMaterialLogicService.reInitAllMaterials() : ();

        StateLogicService.refreshEditAndRunEngineState();

        dispatchFunc(
          AppStore.UpdateAction(Update([|UpdateStore.Inspector|])),
        )
        |> ignore;
      } :
      Antd.Message.message
      |> Antd.Message.convertToJsObj
      |> (messageObj => messageObj##warn("can't remove last camera !", 4))
      |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);