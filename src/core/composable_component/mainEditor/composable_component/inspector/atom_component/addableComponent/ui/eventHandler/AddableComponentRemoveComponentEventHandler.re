open DiffType;

open InspectorComponentType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = Wonderjs.GameObjectType.gameObject;
  type dataTuple = componentType;

  let _isCanbeRemoveCameraGroup = type_ =>
    type_ === CameraGroup ? HeaderUtils.doesSceneHasRemoveableCamera() : true;

  let _isRemoveLight = type_ => type_ === Light;

  let handleSelfLogic = ((store, dispatchFunc), currentSceneTreeNode, type_) =>
    _isCanbeRemoveCameraGroup(type_) ?
      {
        StateLogicService.getEditEngineState()
        |> InspectorRemoveComponentUtils.removeComponentByTypeForEditEngineState(
             type_,
             StateLogicService.getEditEngineComponent(
               DiffType.GameObject,
               currentSceneTreeNode,
             ),
           )
        |> StateLogicService.setEditEngineState;

        let (editorState, runEngineState) =
          (
            StateEditorService.getState(),
            StateLogicService.getRunEngineState(),
          )
          |> InspectorRemoveComponentUtils.removeComponentByTypeForRunEngineState(
               type_,
               currentSceneTreeNode,
             );

        runEngineState |> StateLogicService.setRunEngineState;

        editorState |> StateEditorService.setState |> ignore;

        _isRemoveLight(type_) ?
          {
            StateLogicService.getAndRefreshEditAndRunEngineState();

            OperateLightMaterialLogicService.reInitAllMaterials
            |> StateLogicService.getAndSetEditAndRunEngineState;
          } :
          ();

        StateLogicService.getAndRefreshEditAndRunEngineState();

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

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);