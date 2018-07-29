open DiffType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = Wonderjs.GameObjectType.gameObject;
  type dataTuple = string;

  let _isLightComponent = type_ => type_ === "Light";

  let handleSelfLogic = ((store, dispatchFunc), currentSceneTreeNode, type_) => {
    let editorState = StateEditorService.getState();

    let (_editorState, editEngineState) =
      InspectorComponentUtils.addComponentByType(
        type_,
        StateLogicService.getEditEngineComponent(
          DiffType.GameObject,
          currentSceneTreeNode,
        ),
        (None, StateLogicService.getEditEngineState()),
      );

    editEngineState |> StateLogicService.setEditEngineState;

    let (editorStateForComponent, runEngineState) =
      InspectorComponentUtils.addComponentByType(
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

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Inspector|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);