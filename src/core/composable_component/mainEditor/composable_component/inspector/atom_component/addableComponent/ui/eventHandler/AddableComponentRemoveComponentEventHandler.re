open DiffType;

open InspectorComponentType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = Wonderjs.GameObjectType.gameObject;
  type dataTuple = componentType;

  let _isLightComponent = type_ => type_ === Light;

  let handleSelfLogic = ((store, dispatchFunc), currentSceneTreeNode, type_) => {
    let editorState = StateEditorService.getState();

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

    WonderLog.Log.print(
      StateEditorService.getState()
      |> InspectorEditorService.getComponentTypeMap
      |> WonderCommonlib.SparseMapService.unsafeGet(currentSceneTreeNode),
    )
    |> ignore;

    let (editorStateForComponent, runEngineState) =
      InspectorRemoveComponentUtils.removeComponentByType(
        type_,
        currentSceneTreeNode,
        (editorState |. Some, StateLogicService.getRunEngineState()),
      );

    runEngineState |> StateLogicService.setRunEngineState;

    WonderLog.Log.print(
      editorStateForComponent
      |> OptionService.unsafeGet
      |> InspectorEditorService.getComponentTypeMap
      |> WonderCommonlib.SparseMapService.unsafeGet(currentSceneTreeNode),
    )
    |> ignore;

    switch (editorStateForComponent) {
    | None => editorState |> StateEditorService.setState |> ignore
    | Some(editorState) =>
      editorState |> StateEditorService.setState |> ignore
    };

    StateLogicService.refreshEditAndRunEngineState();

    _isLightComponent(type_) ?
      OperateLightMaterialLogicService.reInitAllMaterials() : ();

    StateLogicService.refreshEditAndRunEngineState();

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Inspector|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);