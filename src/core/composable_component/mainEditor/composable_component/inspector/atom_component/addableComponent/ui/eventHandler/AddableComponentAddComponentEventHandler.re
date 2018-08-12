open DiffType;

open InspectorComponentType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = Wonderjs.GameObjectType.gameObject;
  type dataTuple = componentType;

  let handleSelfLogic = ((store, dispatchFunc), currentSceneTreeNode, type_) => {
    StateLogicService.getEditEngineState()
    |> InspectorAddComponentUtils.addComponentByTypeForEditEngineState(
         type_,
         StateLogicService.getEditEngineComponent(
           DiffType.GameObject,
           currentSceneTreeNode,
         ),
       )
    |> StateLogicService.setEditEngineState;

    let (editorState, runEngineState) =
      (StateEditorService.getState(), StateLogicService.getRunEngineState())
      |> InspectorAddComponentUtils.addComponentByTypeForRunEngineState(
           type_,
           currentSceneTreeNode,
         );

    runEngineState |> StateLogicService.setRunEngineState;

    editorState |> StateEditorService.setState |> ignore;

    GameObjectEngineService.initGameObject
    |> StateLogicService.getAndSetEngineStateWithDiff([|
         {arguments: [|currentSceneTreeNode|], type_: GameObject},
       |]);

    StateLogicService.getAndRefreshEditAndRunEngineState();

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Inspector|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);