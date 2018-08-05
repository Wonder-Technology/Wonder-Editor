open DiffType;

open InspectorComponentType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = Wonderjs.GameObjectType.gameObject;
  type dataTuple = componentType;

  let _isLightComponent = type_ => type_ === Light;

  let _isCanbeRemoveCameraGroup = type_ =>
    type_ === CameraGroup ? HeaderUtils.doesSceneHasRemoveableCamera() : true;

  let handleSelfLogic = ((store, dispatchFunc), currentSceneTreeNode, type_) => {
    let editorState = StateEditorService.getState();

    _isCanbeRemoveCameraGroup(type_) ?
      {
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

        let (editorStateForComponent, runEngineState) =
          InspectorRemoveComponentUtils.removeComponentByType(
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